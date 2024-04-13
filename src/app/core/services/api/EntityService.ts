import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_ENTITY_URL, GET_ENTITIES_BY_WORKER_URL, GET_ENTITY_MEMBERS_VM } from '../../../shared/constants/APIPathsConstants';

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

    async getEntitiesByWorkerId(workerId: string) : Promise<any> {
        try {
            const response = await this.http.get(GET_ENTITIES_BY_WORKER_URL.replace("{workerId}", workerId)).toPromise();
            return response;
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }

    async getEntityMembersViewModel(entityId: string) : Promise<any> {
        let userLanguage = navigator.language;
        if(userLanguage.indexOf('-') > 0)
        {
            userLanguage = userLanguage.split('-')[0];
        }

        try {
            let url = GET_ENTITY_MEMBERS_VM.replace('{entityId}', entityId).replace('{lcode}', userLanguage);
            const response = await this.http.get(url).toPromise();
            return response;
        }
        catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }
}