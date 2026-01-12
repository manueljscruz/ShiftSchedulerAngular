import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDTO } from '../../../shared/models/DTOs/Outgoing/LoginDTO';
import { LOGIN_URL, LOGOUT_URL, REFRESH_TOKEN_URL } from '../../../shared/constants/APIPathsConstants';
import { LoginResponseDTO } from '../../../shared/models/DTOs/Incoming/LoginResponseDTO';
import { UserDTO } from '../../../shared/models/DTOs/Incoming/UserDTO';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
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

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        // Initialize from localStorage if available (for page refreshes)
        this.initializeFromStorage();
    }

    private initializeFromStorage(): void {
        // Only access localStorage in browser environment (not during SSR)
        if (isPlatformBrowser(this.platformId)) {
            const storedUser = localStorage.getItem('loggedUser');
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
        }
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
}