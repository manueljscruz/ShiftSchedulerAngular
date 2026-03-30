import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ACCEPT_INVITATION_URL, ADD_ENTITY_URL, ADD_NEW_ENTITY_MEMBER_URL, CONVERT_BOT_TO_USER_URL, DECLINE_INVITATION_URL, DELETE_ENTITY_MEMBER_URL, DELETE_ENTITY_URL, GET_ENTITIES_BY_WORKER_URL, GET_ENTITY_DASHBOARD_VM_URL, GET_ENTITY_MEMBERS_PAGINATION, GET_ENTITY_MEMBERS_VM, GET_ENTITY_PROFILE_VM, GET_ENTITY_SKILLS, GET_IMPORT_CANDIDATES_URL, GET_PENDING_INVITATIONS_URL, GET_UMBRELLA_ENTITIES_URL, IMPORT_CONFIG_URL, TRANSFER_COPY_MEMBERS_URL, UPDATE_ENTITY_MEMBER_URL, UPDATE_ENTITY_URL, UPDATE_MEMBER_PERMISSION_URL } from '../../../shared/constants/APIPathsConstants';
import { ImportCandidatesDTO } from '../../../shared/models/DTOs/Incoming/ImportCandidatesDTO';
import { ImportConfigDTO } from '../../../shared/models/DTOs/Outgoing/ImportConfigDTO';
import { TransferMembersDTO } from '../../../shared/models/DTOs/Outgoing/TransferMembersDTO';
import { EntityProfileViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/EntityProfileViewModelRequestDTO';
import { FormEntityDTO } from '../../../shared/models/DTOs/Outgoing/FormEntityDTO';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { LanguageServiceService } from '../language-service.service';
import { AddNewMemberDTO } from '../../../shared/models/DTOs/Outgoing/AddNewMemberDTO';
import { EditMemberDTO } from '../../../shared/models/DTOs/Outgoing/EditMemberDTO';
import { DeleteMemberDTO } from '../../../shared/models/DTOs/Outgoing/DeleteMemberDTO';
import { HTTP_METHOD_DELETE, HTTP_STATUS_NO_CONTENT} from '../../../shared/constants/HttpConstants';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { SingleIdentifierDTO } from '../../../shared/models/DTOs/Outgoing/SingleIdentifierDTO';
import { DeleteEntityDTO } from '../../../shared/models/DTOs/Outgoing/DeleteEntityDTO';
import { PagedModelRequest } from '../../../shared/models/DTOs/Outgoing/PagedModelRequest';
import { ConvertBotToUserDTO } from '../../../shared/models/DTOs/Outgoing/ConvertBotToUserDTO';
import { MemberPagedModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/MemberPagedModelRequestDTO';
import { UpdateMemberPermissionDTO } from '../../../shared/models/DTOs/Outgoing/UpdateMemberPermissionDTO';
import { AcceptDeclineInvitationDTO } from '../../../shared/models/DTOs/Outgoing/AcceptDeclineInvitationDTO';

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
    async getEntityMembersViewModel(memberListModelRequest: MemberPagedModelRequestDTO) : Promise<any> {

        let response = new BaseResponseModel(false, "", null);

        try {
            const response = await this.http.post(GET_ENTITY_MEMBERS_VM, memberListModelRequest, {
                withCredentials: true
            }).toPromise();
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

    async getEntityMembers(memberListModelRequestDTO: MemberPagedModelRequestDTO) : Promise<any> {
        let response = new BaseResponseModel(false, "", null);

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
        try {
            let url = GET_ENTITY_SKILLS;

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
    async deleteEntity(entityId: string, workerId: string) : Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);
        let deleteEntityObject = new DeleteEntityDTO(entityId, workerId);
        try {
            let apiResponse = await this.http.delete(DELETE_ENTITY_URL, {
                body: deleteEntityObject,
            }).toPromise();
            response = apiResponse as BaseResponseModel;
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
                observe: 'response'
            }).toPromise();

            if (httpResponse?.status === HTTP_STATUS_NO_CONTENT) {
                response.success = true;
                response.message = "Entity member successfully deleted.";
                return response;
            }

            response = httpResponse?.body as BaseResponseModel || new BaseResponseModel(false, "Unexpected response.", null);
        } catch (error: any) {
            const status = error?.status;
            if (status === 404) {
                response.message = error?.error ?? 'Member not found.';
            } else {
                response.message = error?.error ?? error?.message ?? 'An unexpected error occurred.';
            }
        }

        return response;
    }
    
    //#endregion

    //#region Get Entity Dashboard View Model

    async getEntityDashboardViewModel(baseViewModelRequest: BaseViewModelRequestDTO) : Promise<any>{
        try {
            const response = await this.http.post(GET_ENTITY_DASHBOARD_VM_URL, baseViewModelRequest).toPromise();
            return response;
            // Process the received data
        } catch (error : any) {
            console.error('Error fetching data:', error.message);
            // Handle the error appropriately (e.g., display an error message)
        }
    }

    //#endregion

    //#region Update Member Permission

    async updateMemberPermission(dto: UpdateMemberPermissionDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, '', null);
        try {
            response = await this.http.put(UPDATE_MEMBER_PERMISSION_URL, dto).toPromise() as BaseResponseModel;
        } catch (error: any) {
            console.error('Error updating member permission:', error.message);
            response.message = error.message;
        }
        return response;
    }

    //#endregion

    //#region Get Pending Invitations

    async getPendingInvitations(workerId: string): Promise<any> {
        let response = new BaseResponseModel(false, '', null);
        try {
            response = await this.http.get(GET_PENDING_INVITATIONS_URL.replace('{workerId}', workerId)).toPromise() as BaseResponseModel;
        } catch (error: any) {
            console.error('Error fetching pending invitations:', error.message);
            response.message = error.message;
        }
        return response;
    }

    //#endregion

    //#region Accept Invitation

    async acceptInvitation(dto: AcceptDeclineInvitationDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, '', null);
        try {
            response = await this.http.post(ACCEPT_INVITATION_URL, dto).toPromise() as BaseResponseModel;
        } catch (error: any) {
            console.error('Error accepting invitation:', error.message);
            response.message = error.message;
        }
        return response;
    }

    //#endregion

    //#region Decline Invitation

    async declineInvitation(dto: AcceptDeclineInvitationDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, '', null);
        try {
            response = await this.http.post(DECLINE_INVITATION_URL, dto).toPromise() as BaseResponseModel;
        } catch (error: any) {
            console.error('Error declining invitation:', error.message);
            response.message = error.message;
        }
        return response;
    }

    //#endregion

    //#region Convert Bot To User

    /**
     * Converts a bot member to a regular user.
     * @param convertBotToUserDTO - The data for converting bot to user.
     * @returns A promise that resolves to the response from the server.
     */
    async convertBotToUser(convertBotToUserDTO: ConvertBotToUserDTO): Promise<any> {
        let response = new BaseResponseModel(false, "", null);
        try {
            response = await this.http.post(CONVERT_BOT_TO_USER_URL, convertBotToUserDTO).toPromise() as BaseResponseModel;
        } catch (error: any) {
            console.error('Error converting bot to user:', error.message);
            response.message = error.message;
        }

        return response;
    }

    //#endregion

    //#region Transfer / Copy Members

    async getUmbrellaEntities(entityId: string): Promise<any[]> {
        try {
            const url = GET_UMBRELLA_ENTITIES_URL.replace('{entityId}', entityId);
            return await this.http.get<any[]>(url).toPromise() as any[];
        } catch (error: any) {
            console.error('Error fetching umbrella entities:', error.message);
            return [];
        }
    }

    async transferCopyMembers(dto: TransferMembersDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, '', null);
        try {
            response = await this.http.post(TRANSFER_COPY_MEMBERS_URL, dto).toPromise() as BaseResponseModel;
        } catch (error: any) {
            console.error('Error transferring/copying members:', error.message);
            response.message = error.message;
        }
        return response;
    }

    async getImportCandidates(entityId: string): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, '', null);
        try {
            const url = GET_IMPORT_CANDIDATES_URL.replace('{entityId}', entityId);
            response = await this.http.get(url).toPromise() as BaseResponseModel;
        } catch (error: any) {
            console.error('Error fetching import candidates:', error.message);
            response.message = error.message;
        }
        return response;
    }

    async importConfigFromParent(dto: ImportConfigDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, '', null);
        try {
            response = await this.http.post(IMPORT_CONFIG_URL, dto).toPromise() as BaseResponseModel;
        } catch (error: any) {
            console.error('Error importing config from parent:', error.message);
            response.message = error.message;
        }
        return response;
    }

    //#endregion

}