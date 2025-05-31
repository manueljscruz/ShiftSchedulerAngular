import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageServiceService } from '../language-service.service';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { EntityRuleViewModel } from '../../../shared/models/VM/EntityRuleViewModel';
import { ADD_RULE_SPEC_URL, ADD_RULE_URL, DELETE_RULE_SPECS_URL, DELETE_RULE_SPEC_URL, DELETE_RULE_URL, GET_ENTITY_RULES_VIEW_MODEL_URL, UPDATE_RULE_SPEC_URL, UPDATE_RULE_URL } from '../../../shared/constants/APIPathsConstants';
import { AddEntityRuleSpecificationDTO } from '../../../shared/models/DTOs/Outgoing/AddEntityRuleSpecificationDTO';
import { EntityRuleSpecificationDTO } from '../../../shared/models/DTOs/Incoming/EntityRuleSpecificationDTO';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { AddEntityRuleDTO } from '../../../shared/models/DTOs/Outgoing/AddEntityRuleDTO';
import { EntityRuleDTO } from '../../../shared/models/DTOs/Incoming/EntityRuleDTO';
import { DeleteEntityObjectDTO } from '../../../shared/models/DTOs/Outgoing/DeleteEntityObjectDTO';
import { SingleIdentifierDTO } from '../../../shared/models/DTOs/Outgoing/SingleIdentifierDTO';
import { DeleteEntityRuleSpecDTO } from '../../../shared/models/DTOs/Outgoing/DeleteEntityRuleSpecDTO';

@Injectable({
    providedIn: 'root'
})

export class RuleService {
    
    constructor(private http: HttpClient,
        private languageService: LanguageServiceService) 
        { }

    /// <summary>
    /// Get the view model for the entity rules
    /// </summary>
    async getRuleViewModel(entityRuleViewModelRequestDTO : BaseViewModelRequestDTO) : Promise<EntityRuleViewModel> {
        let ruleVM : EntityRuleViewModel = new EntityRuleViewModel([], false, [], []);

        entityRuleViewModelRequestDTO.languageCode = this.languageService.returnLocalization();
        try{
            ruleVM = await this.http.post<EntityRuleViewModel>(GET_ENTITY_RULES_VIEW_MODEL_URL, entityRuleViewModelRequestDTO).toPromise() as EntityRuleViewModel; // <RuleVMApiResponse>
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        return ruleVM;
    }

    /// <summary>
    /// Add a rule to the entity
    /// </summary>
    async addRule(addEntityRuleDTO : AddEntityRuleDTO) : Promise<BaseResponseModel> {
        let response : BaseResponseModel = new BaseResponseModel(false, '', null);

        try{
            addEntityRuleDTO.entityRuleSpecifications.forEach((specification : AddEntityRuleSpecificationDTO) => {
                specification.languageCode = this.languageService.returnLocalization();
            });
            response = await this.http.post<BaseResponseModel>(ADD_RULE_URL, addEntityRuleDTO).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        return response;
    }

    /// <summary>
    /// Add a rule specification to the entity rule
    /// </summary>
    async addRuleSpecification(addEntityRuleSpecificationDTO: AddEntityRuleSpecificationDTO) : Promise<BaseResponseModel> {
        let response : BaseResponseModel = new BaseResponseModel(false, '', null);

        try{
            addEntityRuleSpecificationDTO.languageCode = this.languageService.returnLocalization();
            response = await this.http.post<BaseResponseModel>(ADD_RULE_SPEC_URL, addEntityRuleSpecificationDTO).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        
        return response;
    }

     /// <summary>
    /// Update an entity rule
    /// </summary>
    async updateEntityRule(entityRuleDTO: EntityRuleDTO) : Promise<BaseResponseModel> {
        let response : BaseResponseModel = new BaseResponseModel(false, '', null);

        try{
            entityRuleDTO.entityRuleSpecificationDTOs.forEach((specification : EntityRuleSpecificationDTO) => {
                specification.languageCode = this.languageService.returnLocalization();
            });
            response = await this.http.put<BaseResponseModel>(UPDATE_RULE_URL, entityRuleDTO).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        return response;
    }

    /// <summary>
    /// Update a rule specification
    /// </summary>
    async updateRuleSpecification(entityRuleSpecificationDTO: EntityRuleSpecificationDTO) : Promise<BaseResponseModel> {
        let response : BaseResponseModel = new BaseResponseModel(false, '', null);

        try{
            entityRuleSpecificationDTO.languageCode = this.languageService.returnLocalization();
            response = await this.http.put<BaseResponseModel>(UPDATE_RULE_SPEC_URL, entityRuleSpecificationDTO).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        
        return response;
    }

    /// <summary>
    /// Delete a rule from the entity
    /// </summary>
    async deleteRule(entityId: string, entityRuleId: string) : Promise<BaseResponseModel> {
        let response : BaseResponseModel = new BaseResponseModel(false, '', null);

        let deleteObject : DeleteEntityObjectDTO = new DeleteEntityObjectDTO(entityId, entityRuleId);
        try{
            response = await this.http.delete<BaseResponseModel>(DELETE_RULE_URL, 
                {
                    body: deleteObject
                }
            ).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        return response;
    }

    /// <summary>
    /// Delete a rule specification from the entity rule
    /// </summary>
    async deleteRuleSpecification(entityId: string, entityRuleId: string, specId: string) : Promise<BaseResponseModel> {
        let response : BaseResponseModel = new BaseResponseModel(false, '', null);

        let deleteRuleSpecDTO : DeleteEntityRuleSpecDTO = new DeleteEntityRuleSpecDTO(entityId, entityRuleId, parseInt(specId));

        try{
            response = await this.http.delete<BaseResponseModel>(DELETE_RULE_SPEC_URL, 
                {
                    body: deleteRuleSpecDTO
                }
            ).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        return response;
    }

    /// <summary>
    /// Delete all rule specifications from the entity rule
    /// </summary>
    async deleteRuleSpecifications(entityRuleId: string) : Promise<BaseResponseModel>{
        let response : BaseResponseModel = new BaseResponseModel(false, '', null);

        let singleIdentifier : SingleIdentifierDTO = new SingleIdentifierDTO(entityRuleId);
        try{
            response = await this.http.delete<BaseResponseModel>(DELETE_RULE_SPECS_URL, 
                {
                    body: singleIdentifier
                }).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        return response;
    }
   
}