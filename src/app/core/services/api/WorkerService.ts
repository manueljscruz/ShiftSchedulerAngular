import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../../../shared/models/DTOs/Outgoing/LoginDTO';
import { NewUserDTO } from '../../../shared/models/DTOs/Outgoing/NewWorkerDTO';
import { LOGIN_URL, REGISTER_URL, UPDATE_USER_URL } from '../../../shared/constants/APIPathsConstants';
import { UserDTO } from '../../../shared/models/DTOs/Incoming/UserDTO';

@Injectable({
    providedIn: 'root'
})
export class WorkerService {
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
    async register(newWorkerDTO: NewUserDTO) : Promise<any> {
        try {
            const response = await this.http.post(REGISTER_URL, newWorkerDTO).toPromise();
            return response;
        } catch (error : any) {
            console.error('Registration error:', error);
            // Re-throw the error so the calling component can handle it
            throw error;
        }
    }

    /// <summary>
    /// Updates a worker instance
    /// </summary>
    async updateWorker(workerDTO: UserDTO) : Promise<any> {
        try {
            const response = await this.http.put(UPDATE_USER_URL, workerDTO).toPromise();
            return response;
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }

    confirmEmail(currentWorkerId: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}