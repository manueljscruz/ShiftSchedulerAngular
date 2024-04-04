import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../../shared/models/DTOs/LoginDTO';
import { NewWorkerDTO } from '../../shared/models/DTOs/NewWorkerDTO';
import { LOGIN_URL, REGISTER_URL } from '../../shared/constants/APIPathsConstants';

@Injectable({
    providedIn: 'root'
})
export class LoginRegisterService {
    LOGIN_URL = LOGIN_URL;
    REGISTER_URL = REGISTER_URL;

    constructor(private http: HttpClient) {}

    /// <summary>
    /// Logs in the user
    /// </summary>
    async login(loginDTO: LoginDTO) : Promise<any> {
        try {
            const response = await this.http.post(LOGIN_URL, loginDTO).toPromise();
            return response;
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }

    /// <summary>
    /// Registers a new worker
    /// </summary>
    async register(newWorkerDTO: NewWorkerDTO) : Promise<any> {
        try {
            const response = await this.http.post(REGISTER_URL, newWorkerDTO).toPromise();
            return response;
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }
}