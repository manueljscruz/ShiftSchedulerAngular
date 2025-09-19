import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LanguageServiceService } from "../language-service.service";
import { BaseViewModelRequestDTO } from "../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO";
import { ScheduleViewModelRequestDTO } from "../../../shared/models/DTOs/Outgoing/ScheduleViewModelRequestDTO";
import { EntityScheduleViewModel } from "../../../shared/models/VM/EntityScheduleViewModel";
import { ADD_SCHEDULE_ENTRY_URL, APPLY_ROTATION_CYCLE_URL, ASSIGN_ENTRY_URL, DELETE_SCHEDULE_ENTRIES_URL, DELETE_WORKER_SCHEDULE_ENTRIES_URL, GENERATE_ENTITY_SCHEDULE, GET_ENTITY_SCHEDULE_VIEW_MODEL_URL, GET_ENTITY_SCHEDULES_URL, SAVE_SCHEDULE_ENTRY_URL } from "../../../shared/constants/APIPathsConstants";
import { ScheduleEntryDTO } from "../../../shared/models/DTOs/Incoming/ScheduleEntryDTO";
import { CreateEntityScheduleDTO } from "../../../shared/models/DTOs/Outgoing/CreateEntityScheduleDTO";
import { BaseResponseModel } from "../../../shared/models/baseResponseModel";
import { AssignEntryDTO } from "../../../shared/models/DTOs/Outgoing/AssignEntryDTO";
import { ApplyRotationCycleDTO } from "../../../shared/models/DTOs/Outgoing/ApplyRotationCycleDTO";
import { app } from "../../../../../server";
import { firstValueFrom } from "rxjs";
import { DeleteIntervalWorkerScheduleEntriesDTO } from "../../../shared/models/DTOs/Outgoing/DeleteIntervalWorkerScheduleEntriesDTO";
import { AddScheduleEntryDTO } from "../../../shared/models/DTOs/Outgoing/AddScheduleEntryDTO";



@Injectable({
    providedIn: 'root'
})

export class ScheduleService {
    
    
    constructor(private http: HttpClient,
        private languageService: LanguageServiceService) 
        { }

    //#region Get Schedule View Model

    /// <summary>
    /// Returns the schedule view model for the entity
    /// </summary>
    /// <param name="entityScheduleViewModelRequestDTO">The request DTO containing the entity ID and other parameters</param>
    /// <returns>A promise that resolves to the EntityScheduleViewModel</returns>
    async getScheduleViewModel(entityScheduleViewModelRequestDTO : ScheduleViewModelRequestDTO) : Promise<EntityScheduleViewModel> {
        let scheduleViewModel : EntityScheduleViewModel = new EntityScheduleViewModel([], false, [], [], []);
    
        entityScheduleViewModelRequestDTO.languageCode = this.languageService.returnLocalization();

        try{
            scheduleViewModel = await this.http.post<EntityScheduleViewModel>(GET_ENTITY_SCHEDULE_VIEW_MODEL_URL, entityScheduleViewModelRequestDTO).toPromise() as EntityScheduleViewModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }
    
        return scheduleViewModel;
    }

    //#endregion

    //#region Create Schedule

    async createSchedule(createEntityScheduleDTO : CreateEntityScheduleDTO) : Promise<BaseResponseModel> {
        let schedules : any;
    
        createEntityScheduleDTO.languageCode = this.languageService.returnLocalization();

        try{
            schedules = await firstValueFrom( this.http.post<ScheduleEntryDTO[]>(GENERATE_ENTITY_SCHEDULE, createEntityScheduleDTO));
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }
    
        return schedules;
    }

    //#endregion

    //#region Assign Entry

    async assignEntry(assignEntryDTO: AssignEntryDTO): Promise<BaseResponseModel> {
        let response: any;

        assignEntryDTO.languageCode = this.languageService.returnLocalization();
        
        try{
            response = await this.http.post<ScheduleEntryDTO>(ASSIGN_ENTRY_URL, assignEntryDTO).toPromise() as ScheduleEntryDTO;;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;

    }

    //#endregion

    //#region Add Schedule Entry

    async addScheduleEntry(addScheduleEntryDTO : AddScheduleEntryDTO) : Promise<BaseResponseModel> {
        let response: any;

        addScheduleEntryDTO.languageCode = this.languageService.returnLocalization();

        try{
            response = await this.http.post<BaseResponseModel>(ADD_SCHEDULE_ENTRY_URL, addScheduleEntryDTO).toPromise() as BaseResponseModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }
        
        return response;
    }

    //#endregion

    //#region Get Schedules

    async getSchedules(schedulesRequest : ScheduleViewModelRequestDTO) : Promise<ScheduleEntryDTO[]> {
        let schedules: ScheduleEntryDTO[] = [];

        schedulesRequest.languageCode = this.languageService.returnLocalization();

        try{
            schedules = await this.http.post<ScheduleEntryDTO[]>(GET_ENTITY_SCHEDULES_URL, schedulesRequest).toPromise() as ScheduleEntryDTO[];
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }

        return schedules;
    }

    //#endregion

    //#region Save Schedules

    async saveSchedules(schedules: ScheduleEntryDTO[]) : Promise<BaseResponseModel> {
        let response: any;

        try{
            response = await this.http.put<BaseResponseModel>(SAVE_SCHEDULE_ENTRY_URL, schedules).toPromise() as BaseResponseModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    //#endregion

    //#region Apply Rotation Cylce

    async ApplyRotationCycle(rotationCycleRequestDTO : ApplyRotationCycleDTO) : Promise<BaseResponseModel> {
        let response: any;

        rotationCycleRequestDTO.languageCode = this.languageService.returnLocalization();

        try{
            response = await this.http.post<BaseResponseModel>(APPLY_ROTATION_CYCLE_URL, rotationCycleRequestDTO).toPromise() as BaseResponseModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    //#endregion

    //#region Delete Worker Entries

    async deleteWorkerEntries(deleteIntervalRequest: DeleteIntervalWorkerScheduleEntriesDTO) : Promise<BaseResponseModel> {
        let response: any;

        deleteIntervalRequest.languageCode = this.languageService.returnLocalization();

        try{
            response = await this.http.delete<BaseResponseModel>(DELETE_WORKER_SCHEDULE_ENTRIES_URL,
                {
                    body: deleteIntervalRequest
                }
            ).toPromise() as BaseResponseModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    //#endregion

    //#region Delete Worker Entries

    async deleteScheduleEntries(deleteIntervalRequest: DeleteIntervalWorkerScheduleEntriesDTO) : Promise<BaseResponseModel> {
        let response: any;

        deleteIntervalRequest.languageCode = this.languageService.returnLocalization();

        try{
            response = await this.http.delete<BaseResponseModel>(DELETE_SCHEDULE_ENTRIES_URL,
                {
                    body: deleteIntervalRequest
                }
            ).toPromise() as BaseResponseModel;
        }
        catch(error: any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    //#endregion
}