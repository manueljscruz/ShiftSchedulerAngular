import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageServiceService } from '../language-service.service';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { EntityRuleViewModel } from '../../../shared/models/VM/EntityRuleViewModel';
import { GET_ENTITY_RULES_VIEW_MODEL_URL } from '../../../shared/constants/APIPathsConstants';

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
}