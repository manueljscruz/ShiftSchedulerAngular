import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, filter, first } from 'rxjs';
import { LoginDTO } from '../../../shared/models/DTOs/Outgoing/LoginDTO';
import { LOGIN_URL, LOGOUT_URL, REFRESH_TOKEN_URL, FORGOT_PASSWORD_URL, RESET_PASSWORD_URL } from '../../../shared/constants/APIPathsConstants';
import { LoginResponseDTO } from '../../../shared/models/DTOs/Incoming/LoginResponseDTO';
import { UserDTO } from '../../../shared/models/DTOs/Incoming/UserDTO';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { ForgotPasswordRequestDTO } from '../../../shared/models/DTOs/Outgoing/ForgotPasswordRequestDTO';
import { ResetPasswordRequestDTO } from '../../../shared/models/DTOs/Outgoing/ResetPasswordRequestDTO';
import { response } from 'express';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // Track authentication state
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    
    // Track current user
    private currentUserSubject = new BehaviorSubject<UserDTO | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    // Track initialization state
    private initializationPromise: Promise<void> | null = null;
    private isInitializedSubject = new BehaviorSubject<boolean>(false);
    public isInitialized$ = this.isInitializedSubject.asObservable();

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        // Start async initialization but don't block constructor
        this.initializationPromise = this.initializeFromStorage();
    }

    private async initializeFromStorage(): Promise<void> {
        // Only access localStorage in browser environment (not during SSR)
        if (isPlatformBrowser(this.platformId)) {
            try {
                // Wrap localStorage in Promise to handle async I/O on mobile
                const storedUser = await new Promise<string | null>((resolve) => {
                    setTimeout(() => {
                        resolve(localStorage.getItem('loggedUser'));
                    }, 0);
                });

                if (storedUser) {
                    try {
                        const user = JSON.parse(storedUser);
                        this.currentUserSubject.next(user);
                        this.isAuthenticatedSubject.next(true);
                    } catch (error) {
                        console.error('Error parsing stored user data', error);
                        localStorage.removeItem('loggedUser');
                    }
                }
            } catch (error) {
                console.error('Error reading from localStorage', error);
            } finally {
                // Mark initialization as complete
                this.isInitializedSubject.next(true);
            }
        } else {
            // SSR environment - mark as initialized immediately
            this.isInitializedSubject.next(true);
        }
    }

    /**
     * Waits for authentication initialization to complete.
     * Use in guards or components before checking auth state.
     */
    public async waitForInitialization(): Promise<void> {
        if (this.initializationPromise) {
            await this.initializationPromise;
        }
    }

    /**
     * Returns observable that emits once initialization is complete.
     * Use with RxJS operators in component subscriptions.
     */
    public waitForInitialization$(): Observable<boolean> {
        return this.isInitialized$.pipe(
            filter(initialized => initialized === true),
            first()
        );
    }

    login(loginDTO: LoginDTO) : Observable<LoginResponseDTO> {

        return this.http.post<LoginResponseDTO>(
            LOGIN_URL,
            loginDTO,
            { withCredentials: true }
        ).pipe(
            tap(response => {
                this.isAuthenticatedSubject.next(true);
                this.currentUserSubject.next(response.user);
                this.isInitializedSubject.next(true); // Mark initialized on login
                // Persist to localStorage for page refreshes (browser only)
                if (isPlatformBrowser(this.platformId)) {
                    localStorage.setItem('loggedUser', JSON.stringify(response.user));
                }
            })
        );
    }

    logout() : Observable<BaseResponseModel>{
        return this.http.post<BaseResponseModel>(LOGOUT_URL, {}, { withCredentials: true })
            .pipe(
                tap(response => {
                    this.isAuthenticatedSubject.next(false);
                    this.currentUserSubject.next(null);
                    // Remove from localStorage (browser only)
                    if (isPlatformBrowser(this.platformId)) {
                        localStorage.removeItem('loggedUser');
                    }

                    return response;
                })
            );
    }

    getCurrentUser(): UserDTO | null {
        return this.currentUserSubject.value;
    }

    updateCurrentUser(user: UserDTO): void {
        this.currentUserSubject.next(user);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('loggedUser', JSON.stringify(user));
        }
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    refreshToken() : Observable<any> {
        return this.http.post(REFRESH_TOKEN_URL, {}, { withCredentials: true})
        .pipe(
            tap(() => {

            })
        );
    }

    /**
     * Clear authentication state immediately without making API call.
     * Used by interceptor to prevent race conditions during logout.
     */
    clearAuthState(): void {
        this.isAuthenticatedSubject.next(false);
        this.currentUserSubject.next(null);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('loggedUser');
        }
    }

    /**
     * Send forgot password email
     */
    forgotPassword(email: string): Observable<BaseResponseModel> {
        const requestDTO = new ForgotPasswordRequestDTO(email);
        return this.http.post<BaseResponseModel>(FORGOT_PASSWORD_URL, requestDTO);
    }

    /**
     * Reset password with token
     */
    resetPassword(email: string, token: string, newPassword: string, confirmPassword: string): Observable<BaseResponseModel> {
        const requestDTO = new ResetPasswordRequestDTO(email, token, newPassword, confirmPassword);
        return this.http.post<BaseResponseModel>(RESET_PASSWORD_URL, requestDTO);
    }
}