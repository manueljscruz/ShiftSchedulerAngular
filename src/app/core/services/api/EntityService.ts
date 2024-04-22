import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_ENTITY_URL, GET_ENTITIES_BY_WORKER_URL, GET_ENTITY_MEMBERS_VM, GET_ENTITY_PROFILE_VM, UPDATE_ENTITY_URL } from '../../../shared/constants/APIPathsConstants';
import { EntityProfileViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/EntityProfileViewModelRequestDTO';
import { Entity } from '../../../shared/models/database/entity';
import { FormEntityDTO } from '../../../shared/models/DTOs/Outgoing/FormEntityDTO';

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

    async getEntityProfileViewModel(profileVMRequestDTO : EntityProfileViewModelRequestDTO) : Promise<any> {
        try {
            const response = await this.http.post(GET_ENTITY_PROFILE_VM, profileVMRequestDTO).toPromise();
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

    async updateEntity(entityToUpdate: FormEntityDTO) : Promise<any> {
        try {
            const response = await this.http.put(UPDATE_ENTITY_URL, entityToUpdate).toPromise();
            return response;
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }
}