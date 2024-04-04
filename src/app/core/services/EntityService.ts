import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_ENTITY_URL } from '../../shared/constants/APIPathsConstants';

@Injectable({
    providedIn: 'root'
})

export class EntityService {

    constructor(private http: HttpClient) {}

    async addEntity(newEntityDTO: any) : Promise<any> {
        try {
            const response = await this.http.post(ADD_ENTITY_URL, newEntityDTO).toPromise();
            return response;
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }
}