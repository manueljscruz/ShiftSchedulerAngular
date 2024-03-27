import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../../shared/models/DTOs/LoginDTO';
import { NewWorkerDTO } from '../../shared/models/DTOs/NewWorkerDTO';

@Injectable({
    providedIn: 'root'
})
export class LoginRegisterService {
    baseUrl = 'https://localhost:7203/api/worker';
    loginURL = '/login';
    registerURL = '/add';

    constructor(private http: HttpClient) {}

    /// <summary>
    /// Logs in the user
    /// </summary>
    async login(loginDTO: LoginDTO) : Promise<any> {
        try {
            let url = this.baseUrl + this.loginURL;

            const response = await this.http.post(url, loginDTO).toPromise();
            console.log('Data received:', response);
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
            let url = this.baseUrl + this.registerURL;

            const response = await this.http.post(url, newWorkerDTO).toPromise();
            console.log('Data received:', response);
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }
}