import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageServiceService } from '../language-service.service';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { EntityWorkerAbsenceViewModel } from '../../../shared/models/VM/EntityWorkerAbsenceViewModel';
import { ADD_ENTITY_ABSENCE_URL, DELETE_ENTITY_ABSENCE_URL, ENTITY_ABSENCE_APPROVAL_DECISION_URL, GET_ENTITY_ABSENCES_PAGINATION, GET_ENTITY_ABSENCES_VIEW_MODEL_URL, UPDATE_ENTITY_ABSENCE_URL } from '../../../shared/constants/APIPathsConstants';
import { AddEntityWorkerAbsenceDTO } from '../../../shared/models/DTOs/Outgoing/AddEntityWorkerAbsenceDTO';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { EntityWorkerAbsenceDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerAbsenceDTO';
import { AbsenceApprovalDecisionDTO } from '../../../shared/models/DTOs/Outgoing/AbsenceApprovalDecisionDTO';
import { SingleIdentifierDTO } from '../../../shared/models/DTOs/Outgoing/SingleIdentifierDTO';
import { PagedModelRequest } from '../../../shared/models/DTOs/Outgoing/PagedModelRequest';
import { PagedList } from '../../../shared/models/DTOs/Incoming/PagedList';

@Injectable({
    providedIn: 'root'
})
export class AbsenceService {
    

    constructor(private http: HttpClient,
        private languageService: LanguageServiceService) 
        { }

    /// <summary>
    /// Get absences view model
    /// </summary>
    async getAbsenceViewModel(entityAbsenceViewModelRequestDTO : BaseViewModelRequestDTO) : Promise<EntityWorkerAbsenceViewModel> {
        let absenceViewModel : EntityWorkerAbsenceViewModel = new EntityWorkerAbsenceViewModel(false, PagedList.Empty(), []);

        entityAbsenceViewModelRequestDTO.languageCode = this.languageService.returnLocalization();
        try{
            absenceViewModel = await this.http.post<EntityWorkerAbsenceViewModel>(GET_ENTITY_ABSENCES_VIEW_MODEL_URL, entityAbsenceViewModelRequestDTO).toPromise() as EntityWorkerAbsenceViewModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }

        return absenceViewModel;
    }

    //#region Get Absences Page

    async getAbsencesPage(absencePageRequest: PagedModelRequest) : Promise<PagedList<EntityWorkerAbsenceDTO>> {
      let absencePagedData : PagedList<EntityWorkerAbsenceDTO> = new PagedList<EntityWorkerAbsenceDTO>([], 0, 0, 0);

      absencePageRequest.languageCode = this.languageService.returnLocalization();

      try{
        absencePagedData = await this.http.post<PagedList<EntityWorkerAbsenceDTO>>(GET_ENTITY_ABSENCES_PAGINATION, absencePageRequest).toPromise() as PagedList<EntityWorkerAbsenceDTO>;
      }
      catch(error: any){
        console.error('Error fetching data:', error.message);
      }

      return absencePagedData;
    }

    //#endregion

    /// <summary>
    /// Adds an absence instance
    /// </summary>
    async addAbsence(addEntityWorkerAbsenceDTO : AddEntityWorkerAbsenceDTO) : Promise<BaseResponseModel> {
        let response : BaseResponseModel = new BaseResponseModel(false, '', null);

        try{
            addEntityWorkerAbsenceDTO.languageCode = this.languageService.returnLocalization();
            response = await this.http.post<BaseResponseModel>(ADD_ENTITY_ABSENCE_URL, addEntityWorkerAbsenceDTO).toPromise() as BaseResponseModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    /// <summary>
    /// Updates an absence instance
    /// </summary>
    async updateAbsence(entityWorkerAbsenceDTO : EntityWorkerAbsenceDTO) : Promise<BaseResponseModel> {
        let response : BaseResponseModel = new BaseResponseModel(false, '', null);

        try{
            response = await this.http.put<BaseResponseModel>(UPDATE_ENTITY_ABSENCE_URL, entityWorkerAbsenceDTO).toPromise() as BaseResponseModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    /// <summary>
    /// Deletes an absence instance
    /// </summary>
    async deleteAbsence(absenceId : SingleIdentifierDTO) : Promise<BaseResponseModel> {
        let response : BaseResponseModel = new BaseResponseModel(false, '', null);

        try{
            response = await this.http.post<BaseResponseModel>(DELETE_ENTITY_ABSENCE_URL, absenceId).toPromise() || {} as BaseResponseModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    /// <summary>
    /// Approves or denies an absence
    /// </summary>
    async absenceApprovalDecision(absenceDecision : AbsenceApprovalDecisionDTO) : Promise<BaseResponseModel> {
        let response : BaseResponseModel = new BaseResponseModel(false, '', null);
        absenceDecision.languageCode = this.languageService.returnLocalization();
        try{
            response = await this.http.put<BaseResponseModel>(ENTITY_ABSENCE_APPROVAL_DECISION_URL, absenceDecision).toPromise() as BaseResponseModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }
}