import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_ENTITY_URL, ADD_NEW_ENTITY_MEMBER_URL, DELETE_ENTITY_URL, GET_ENTITIES_BY_WORKER_URL, GET_ENTITY_MEMBERS_VM, GET_ENTITY_PROFILE_VM, GET_ENTITY_SKILLS, UPDATE_ENTITY_URL } from '../../../shared/constants/APIPathsConstants';
import { EntityProfileViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/EntityProfileViewModelRequestDTO';
import { Entity } from '../../../shared/models/database/entity';
import { FormEntityDTO } from '../../../shared/models/DTOs/Outgoing/FormEntityDTO';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { response } from 'express';
import { LanguageServiceService } from '../language-service.service';
import { AddNewMemberDTO } from '../../../shared/models/DTOs/Outgoing/AddNewMemberDTO';

@Injectable({
    providedIn: 'root'
})

/**
 * Service for managing entities.
 */
export class EntityService {
    constructor(private http: HttpClient,
        private languageService: LanguageServiceService
    ) {}

    /**
     * Adds a new entity.
     * @param newEntityDTO - The data of the new entity.
     * @returns A promise that resolves to the response from the server.
     */
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

    /**
     * Retrieves entities by worker ID.
     * @param workerId - The ID of the worker.
     * @returns A promise that resolves to the response from the server.
     */
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

    /**
     * Retrieves the view model for an entity profile.
     * @param profileVMRequestDTO - The request data for the view model.
     * @returns A promise that resolves to the response from the server.
     */
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

    /**
     * Retrieves the view model for entity members.
     * @param entityId - The ID of the entity.
     * @returns A promise that resolves to the response from the server.
     */
    async getEntityMembersViewModel(entityId: string) : Promise<any> {
        let userLanguage = this.languageService.returnLocalization();
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

    async getEntitySkills(entityId: string) : Promise<any> {
        let userLanguage = this.languageService.returnLocalization();
        try {
            let url = GET_ENTITY_SKILLS.replace('{entityId}', entityId).replace('{lcode}', userLanguage);
            const response = await this.http.get(url).toPromise();
            return response;
        }
        catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }

    /**
     * Updates an entity.
     * @param entityToUpdate - The data of the entity to update.
     * @returns A promise that resolves to the response from the server.
     */
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

    /**
     * Deletes an entity.
     * @param entityId - The ID of the entity to delete.
     * @returns A promise that resolves to the response from the server.
     */
    async deleteEntity(entityId: string) : Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);
        try {
            let apiResponse = await this.http.delete(DELETE_ENTITY_URL.replace("{id}", entityId)).toPromise();
            response = apiResponse as BaseResponseModel;
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            response.message = error.message;
        }

        return response
    }

    /**
     * Adds a new bot member to an entity or sends an invite to a new member.
     * @param newMemberDTO - The data of the new member.
     * @returns A promise that resolves to the response from the server.
     */
    async addNewEntityMember(newMemberDTO: AddNewMemberDTO) : Promise<any> {
        let response = new BaseResponseModel(false, "", null);
        try {
             response = await this.http.post(ADD_NEW_ENTITY_MEMBER_URL, newMemberDTO).toPromise() as BaseResponseModel;
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            response.message = error.message;
        }

        return response;
    }
}