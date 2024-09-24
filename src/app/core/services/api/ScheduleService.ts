import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LanguageServiceService } from "../language-service.service";
import { BaseViewModelRequestDTO } from "../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO";
import { ScheduleViewModelRequestDTO } from "../../../shared/models/DTOs/Outgoing/ScheduleViewModelRequestDTO";
import { EntityScheduleViewModel } from "../../../shared/models/VM/EntityScheduleViewModel";
import { GET_ENTITY_SCHEDULE_VIEW_MODEL_URL, GET_ENTITY_SCHEDULES } from "../../../shared/constants/APIPathsConstants";
import { ScheduleEntryDTO } from "../../../shared/models/DTOs/Incoming/ScheduleEntryDTO";



@Injectable({
    providedIn: 'root'
})

export class ScheduleService {
    
    constructor(private http: HttpClient,
        private languageService: LanguageServiceService) 
        { }


    async getScheduleViewModel(entityScheduleViewModelRequestDTO : ScheduleViewModelRequestDTO) : Promise<EntityScheduleViewModel> {
        let scheduleViewModel : EntityScheduleViewModel = new EntityScheduleViewModel([], false, [], []);
    
        entityScheduleViewModelRequestDTO.languageCode = this.languageService.returnLocalization();

        try{
            scheduleViewModel = await this.http.post<EntityScheduleViewModel>(GET_ENTITY_SCHEDULE_VIEW_MODEL_URL, entityScheduleViewModelRequestDTO).toPromise() as EntityScheduleViewModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }
    
        return scheduleViewModel;
    }

    /// <summary>
    /// Returns a list of schedules for the entity
    /// </summary>
    async getSchedules(entityScheduleViewModelRequestDTO : ScheduleViewModelRequestDTO) : Promise<ScheduleEntryDTO[]> {
        let schedules : ScheduleEntryDTO[] = [];
    
        entityScheduleViewModelRequestDTO.languageCode = this.languageService.returnLocalization();

        try{
            schedules = await this.http.post<ScheduleEntryDTO[]>(GET_ENTITY_SCHEDULES, entityScheduleViewModelRequestDTO).toPromise() as ScheduleEntryDTO[];
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }
    
        return schedules;

    }
}