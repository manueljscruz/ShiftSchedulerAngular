import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_ENTITY_URL, ADD_NEW_ENTITY_MEMBER_URL, DELETE_ENTITY_MEMBER_URL, DELETE_ENTITY_URL, GET_ENTITIES_BY_WORKER_URL, GET_ENTITY_MEMBERS_PAGINATION, GET_ENTITY_MEMBERS_VM, GET_ENTITY_PROFILE_VM, GET_ENTITY_SKILLS, UPDATE_ENTITY_MEMBER_URL, UPDATE_ENTITY_URL } from '../../../shared/constants/APIPathsConstants';
import { EntityProfileViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/EntityProfileViewModelRequestDTO';
import { Entity } from '../../../shared/models/database/entity';
import { FormEntityDTO } from '../../../shared/models/DTOs/Outgoing/FormEntityDTO';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { response } from 'express';
import { LanguageServiceService } from '../language-service.service';
import { AddNewMemberDTO } from '../../../shared/models/DTOs/Outgoing/AddNewMemberDTO';
import { EditMemberDTO } from '../../../shared/models/DTOs/Outgoing/EditMemberDTO';
import { DeleteMemberDTO } from '../../../shared/models/DTOs/Outgoing/DeleteMemberDTO';
import { HTTP_METHOD_DELETE, HTTP_METHOD_GET, HTTP_STATUS_NO_CONTENT, HTTP_STATUS_OK } from '../../../shared/constants/HttpConstants';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { DeleteEntityObjectDTO } from '../../../shared/models/DTOs/Outgoing/DeleteEntityObjectDTO';
import { SingleIdentifierDTO } from '../../../shared/models/DTOs/Outgoing/SingleIdentifierDTO';
import { MemberListModelRequest } from '../../../shared/models/DTOs/Outgoing/MemberListModelRequest';

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

    //#region Constants

    HTTP_METHOD_DELETE = HTTP_METHOD_DELETE;
    HTTP_STATUS_NO_CONTENT = HTTP_STATUS_NO_CONTENT;

    
    //#endregion

    //#region Add Entity

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

    //#endregion

    //#region Get Entities By Worker ID

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

    //#endregion

    //#region Get Entity Profile View Model

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

    //#endregion

    //#region Get Entity Members View Model

    /**
     * Retrieves the view model for entity members.
     * @param entityId - The ID of the entity.
     * @returns A promise that resolves to the response from the server.
     */
    async getEntityMembersViewModel(memberListModelRequestDTO: MemberListModelRequest) : Promise<any> {
        
        let response = new BaseResponseModel(false, "", null);
        memberListModelRequestDTO.languageCode = this.languageService.returnLocalization();

        try {
            const response = await this.http.post(GET_ENTITY_MEMBERS_VM, memberListModelRequestDTO).toPromise();
            return response;
        }
        catch (error : any) {
            console.error('Error fetching data:', error.message);
            response.message = error.message;
        }

        return response;
    }

    //#endregion

    //#region Get Entity Members

    async getEntityMembers(memberListModelRequestDTO: MemberListModelRequest) : Promise<any> {
        let response = new BaseResponseModel(false, "", null);
        memberListModelRequestDTO.languageCode = this.languageService.returnLocalization();

        try {
            const response = await this.http.post(GET_ENTITY_MEMBERS_PAGINATION, memberListModelRequestDTO).toPromise();
            return response;
        }
        catch (error : any) {
            console.error('Error fetching data:', error.message);
            response.message = error.message;
        }

        return response;
    }

    //#endregion

    //#region Get Entity Skills

    async getEntitySkills(baseViewModelRequest: BaseViewModelRequestDTO) : Promise<any> {
        let userLanguage = this.languageService.returnLocalization();
        try {
            let url = GET_ENTITY_SKILLS;
            baseViewModelRequest.languageCode = userLanguage;
            const response = await this.http.post(url,baseViewModelRequest).toPromise();
            return response;
        }
        catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }

    //#endregion

    //#region Update Entity

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

    //#endregion

    //#region Delete Entity

    /**
     * Deletes an entity.
     * @param entityId - The ID of the entity to delete.
     * @returns A promise that resolves to the response from the server.
     */
    async deleteEntity(entityId: string) : Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        let deleteEntityObject : SingleIdentifierDTO = new SingleIdentifierDTO(entityId);
        try {
            let apiResponse = await this.http.delete(DELETE_ENTITY_URL, {
                body: deleteEntityObject,
            }).toPromise();
            response = apiResponse as BaseResponseModel;
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            response.message = error.message;
        }

        return response
    }

    //#endregion

    //#region Add Entity Member

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

    //#endregion

    //#region Update Entity Member

    async updateEntityMember(editWorkerDTO: EditMemberDTO) {
        let response = new BaseResponseModel(false, "", null);
        try {
            response = await this.http.put(UPDATE_ENTITY_MEMBER_URL, editWorkerDTO).toPromise() as BaseResponseModel;
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            response.message = error.message;
        }

        return response;
    }

    //#endregion

    //#region Delete Entity Member

    async deleteEntityWorker(workerData: DeleteMemberDTO) {
        let response = new BaseResponseModel(false, "", null);
        try {
            const httpResponse = await this.http.request<BaseResponseModel>(HTTP_METHOD_DELETE, DELETE_ENTITY_MEMBER_URL, {
                body: workerData,
                observe: 'response'  // Ensure we get the full HttpResponse
            }).toPromise();
    
            if (httpResponse?.status === HTTP_STATUS_NO_CONTENT) {
                response.success = true;
                response.message = "Entity member succesfully deleted.";
                return response;
            }
    
            response = httpResponse?.body as BaseResponseModel || new BaseResponseModel(true, "No content returned", null);
        } catch (error: any) {
            console.error('Error fetching data:', error.message);
            response.message = error.message;
        }
    
        return response;
    }
    
    //#endregion
}