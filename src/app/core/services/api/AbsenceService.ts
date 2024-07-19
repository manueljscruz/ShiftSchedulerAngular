import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageServiceService } from '../language-service.service';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { EntityWorkerAbsenceViewModel } from '../../../shared/models/VM/EntityWorkerAbsenceViewModel';
import { GET_ENTITY_ABSENCES_VIEW_MODEL_URL } from '../../../shared/constants/APIPathsConstants';

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
        let absenceViewModel : EntityWorkerAbsenceViewModel = new EntityWorkerAbsenceViewModel(false, [], []);

        entityAbsenceViewModelRequestDTO.languageCode = this.languageService.returnLocalization();
        try{
            absenceViewModel = await this.http.post<EntityWorkerAbsenceViewModel>(GET_ENTITY_ABSENCES_VIEW_MODEL_URL, entityAbsenceViewModelRequestDTO).toPromise() as EntityWorkerAbsenceViewModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }

        return absenceViewModel;
    }
}