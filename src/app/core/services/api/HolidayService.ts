import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageServiceService } from '../language-service.service';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { EntityHolidaysViewModel } from '../../../shared/models/VM/EntityHolidaysViewModel';
import {
    ADD_ENTITY_HOLIDAY_URL,
    DELETE_ENTITY_HOLIDAY_URL,
    GET_ENTITY_HOLIDAYS_PAGINATION,
    GET_ENTITY_HOLIDAYS_VIEW_MODEL_URL,
    UPDATE_ENTITY_HOLIDAY_URL
} from '../../../shared/constants/APIPathsConstants';
import { AddEntityHolidayDTO } from '../../../shared/models/DTOs/Outgoing/AddEntityHolidayDTO';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { EntityHolidayDTO } from '../../../shared/models/DTOs/Incoming/EntityHolidayDTO';
import { SingleIdentifierDTO } from '../../../shared/models/DTOs/Outgoing/SingleIdentifierDTO';
import { PagedModelRequest } from '../../../shared/models/DTOs/Outgoing/PagedModelRequest';
import { PagedList } from '../../../shared/models/DTOs/Incoming/PagedList';
import { DeleteEntityObjectDTO } from '../../../shared/models/DTOs/Outgoing/DeleteEntityObjectDTO';

@Injectable({
    providedIn: 'root'
})
export class HolidayService {

    constructor(
        private http: HttpClient,
        private languageService: LanguageServiceService
    ) { }

    /// <summary>
    /// Get entity holidays view model
    /// </summary>
    async getHolidayViewModel(requestDTO: PagedModelRequest): Promise<EntityHolidaysViewModel> {
        let holidayViewModel: EntityHolidaysViewModel = new EntityHolidaysViewModel();

        try {
            holidayViewModel = await this.http.post<EntityHolidaysViewModel>(
                GET_ENTITY_HOLIDAYS_VIEW_MODEL_URL,
                requestDTO
            ).toPromise() as EntityHolidaysViewModel;
        }
        catch (error: any) {
            console.error('Error fetching holiday view model:', error.message);
        }

        return holidayViewModel;
    }

    /// <summary>
    /// Get holidays page with pagination
    /// </summary>
    async getHolidaysPage(pageRequest: PagedModelRequest): Promise<PagedList<EntityHolidayDTO>> {
        let holidayPagedData: PagedList<EntityHolidayDTO> = new PagedList<EntityHolidayDTO>([], 0, 0, 0);

        try {
            holidayPagedData = await this.http.post<PagedList<EntityHolidayDTO>>(
                GET_ENTITY_HOLIDAYS_PAGINATION,
                pageRequest
            ).toPromise() as PagedList<EntityHolidayDTO>;
        }
        catch (error: any) {
            console.error('Error fetching holidays page:', error.message);
        }

        return holidayPagedData;
    }

    /// <summary>
    /// Adds a new holiday instance
    /// </summary>
    async addHoliday(addEntityHolidayDTO: AddEntityHolidayDTO): Promise<BaseResponseModel> {
        let response: BaseResponseModel = new BaseResponseModel(false, '', null);

        try {
            response = await this.http.post<BaseResponseModel>(
                ADD_ENTITY_HOLIDAY_URL,
                addEntityHolidayDTO
            ).toPromise() as BaseResponseModel;
        }
        catch (error: any) {
            console.error('Error adding holiday:', error.message);
        }

        return response;
    }

    /// <summary>
    /// Updates an existing holiday instance
    /// </summary>
    async updateHoliday(entityHolidayDTO: EntityHolidayDTO): Promise<BaseResponseModel> {
        let response: BaseResponseModel = new BaseResponseModel(false, '', null);

        try {
            response = await this.http.put<BaseResponseModel>(
                UPDATE_ENTITY_HOLIDAY_URL,
                entityHolidayDTO
            ).toPromise() as BaseResponseModel;
        }
        catch (error: any) {
            console.error('Error updating holiday:', error.message);
        }

        return response;
    }

    /// <summary>
    /// Deletes a holiday instance
    /// </summary>
    async deleteHoliday(deleteObject: DeleteEntityObjectDTO): Promise<BaseResponseModel> {
        let response: BaseResponseModel = new BaseResponseModel(false, '', null);

        try {
            response = await this.http.delete<BaseResponseModel>(
                DELETE_ENTITY_HOLIDAY_URL,{
                    body: deleteObject
                }
            ).toPromise() || {} as BaseResponseModel;
        }
        catch (error: any) {
            console.error('Error deleting holiday:', error.message);
        }

        return response;
    }
}
