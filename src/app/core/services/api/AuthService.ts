import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDTO } from '../../../shared/models/DTOs/Outgoing/LoginDTO';
import { LOGIN_URL, LOGOUT_URL } from '../../../shared/constants/APIPathsConstants';
import { LoginResponseDTO } from '../../../shared/models/DTOs/Incoming/LoginResponseDTO';
import { UserDTO } from '../../../shared/models/DTOs/Incoming/UserDTO';

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

    constructor(private http: HttpClient) {
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
            })
        );
    }

    logout(){
        return this.http.post(LOGOUT_URL, {}, { withCredentials: true })
            .pipe(
                tap(() => {
                    this.isAuthenticatedSubject.next(false);
                    this.currentUserSubject.next(null);
                })
            );
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }
}