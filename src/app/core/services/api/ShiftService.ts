import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageServiceService } from '../language-service.service';
import { GET_ENTITY_SHIFT_VIEW_MODEL_URL, ADD_SHIFT_URL, ADD_SHIFT_BREAK_URL, UPDATE_SHIFT_BREAK_URL, DELETE_SHIFT_URL, DELETE_SHIFT_BREAK_URL, UPDATE_SHIFT_URL } from '../../../shared/constants/APIPathsConstants';
import { ShiftViewModel } from '../../../shared/models/VM/ShiftViewModel';
import { EntityShiftViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/EntityShiftViewModelRequestDTO';
import { ShiftBreakTypeLocalizedDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakTypeLocalizedDTO';
import { ShiftDTO } from '../../../shared/models/DTOs/Incoming/ShiftDTO';
import { ShiftBreakTemplateDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakTemplateDTO';
import { AddShiftBreakResponse, ShiftVMApiResponse } from '../../../shared/models/interfaces/ShiftApiResponses';
import { ShiftTemplateDTO } from '../../../shared/models/DTOs/Incoming/ShiftTemplateDTO';
import { AddShiftBreakDTO } from '../../../shared/models/DTOs/Outgoing/AddShiftBreakDTO';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { ShiftBreakDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakDTO';
import { AddShiftDTO } from '../../../shared/models/DTOs/Outgoing/AddShiftDTO';

@Injectable({
    providedIn: 'root'
})

export class ShiftService {
    

    constructor(private http: HttpClient,
        private languageService: LanguageServiceService) 
        { }

    /// <summary>
    /// Get the shift view model for the entity:
    /// - Shifts of the Entity
    /// - ShiftBreakTypeLocalizeds
    /// - AllowEdit
    /// - ShiftBreakTemplates
    /// - ShiftTemplates
    /// </summary>
    async getShiftViewModel(entityShiftViewModelRequestDTO : EntityShiftViewModelRequestDTO) : Promise<ShiftViewModel> {
        let shiftVM : ShiftViewModel = new ShiftViewModel([], [], false, []);

        entityShiftViewModelRequestDTO.languageCode = this.languageService.returnLocalization();
        try{
            shiftVM = await this.http.post<ShiftViewModel>(GET_ENTITY_SHIFT_VIEW_MODEL_URL, entityShiftViewModelRequestDTO).toPromise() as ShiftViewModel; // <ShiftVMApiResponse>
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        return shiftVM;
    }

    /// <summary>
    /// Add a new entity shift
    /// </summary>
    async addShift(shiftDTO: AddShiftDTO) : Promise<BaseResponseModel> {

        let response = new BaseResponseModel(false, "", null);

        try{
            let shiftBreaksJson = this.shiftBreakArrayToJson(shiftDTO.ShiftBreakDTOs);

            let addShiftJSON = JSON.parse(JSON.stringify(shiftDTO));
            addShiftJSON.ShiftStartHour = this.auxConvertDateToTimeSpan(shiftDTO.ShiftStartHour);
            addShiftJSON.ShiftDuration = this.auxConvertDateToTimeSpan(shiftDTO.ShiftDuration);
            // addShiftJSON.ShiftBreakDTOs = shiftBreaksJson;
           
            response = await this.http.post<BaseResponseModel>(ADD_SHIFT_URL, addShiftJSON).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;

    }

    /// <summary>
    /// Add a new shift break
    /// </summary>
    async addShiftBreak(newShiftBreakDTO: AddShiftBreakDTO) : Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        try{
            let shiftBreakJson = JSON.parse(JSON.stringify(newShiftBreakDTO));
            shiftBreakJson.ShiftBreakStartTime = this.auxConvertDateToTimeSpan(newShiftBreakDTO.ShiftBreakStartTime);
            shiftBreakJson.ShiftBreakDuration = this.auxConvertDateToTimeSpan(newShiftBreakDTO.ShiftBreakDuration);

            response = await this.http.post<BaseResponseModel>(ADD_SHIFT_BREAK_URL, shiftBreakJson).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    async updateShift(SelectedShift: ShiftDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        try{
            response = await this.http.put<BaseResponseModel>(UPDATE_SHIFT_URL, SelectedShift).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    /// <summary>
    /// Update a shift break
    /// </summary>
    async updateShiftBreak(SelectedShiftBreak: ShiftBreakDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        try{
            response = await this.http.put<BaseResponseModel>(UPDATE_SHIFT_BREAK_URL, SelectedShiftBreak).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    /// <summary>
    /// Delete a shift
    /// </summary>
    async deleteShift(entityId: string, shiftId: string): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        try{
            response = await this.http.delete<BaseResponseModel>(DELETE_SHIFT_URL.replace('{entityId}', entityId).replace('{shiftId}', shiftId)).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    /// <summary>
    /// Delete a shift break
    /// </summary>
    async deleteShiftBreak(shiftBreakId: string) : Promise<BaseResponseModel>{
        let response = new BaseResponseModel(false, "", null);

        try{
            response = await this.http.delete<BaseResponseModel>(DELETE_SHIFT_BREAK_URL.replace('{shiftBreakId}', shiftBreakId)).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }
    /*
    convertDatesToTimeSpanStrings(obj: any): any {
        if (obj === null || obj === undefined) {
            return obj;
        }
        
        if (obj instanceof Date) {
            return this.auxConvertDateToTimeSpan(obj);
        }
    
        if (Array.isArray(obj)) {
            return obj.map(item => this.convertDatesToTimeSpanStrings(item));
        }
    
        if (typeof obj === 'object') {
            const newObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = this.convertDatesToTimeSpanStrings(obj[key]);
                }
            }
            return newObj;
        }
    
        return obj;
    }
    */

    convertDatesToTimeSpanStrings(obj: any): any {
        const newObj = { ...obj };
        for (const key in newObj) {
            if (newObj[key] instanceof Date) {
                newObj[key] = this.auxConvertDateToTimeSpan(newObj[key]);
            } else if (Array.isArray(newObj[key])) {
                newObj[key] = newObj[key].map((item: any) => this.convertDatesToTimeSpanStrings(item));
            } else if (typeof newObj[key] === 'object' && newObj[key] !== null) {
                newObj[key] = this.convertDatesToTimeSpanStrings(newObj[key]);
            }
        }
        return newObj;
    }
    

    shiftBreakArrayToJson(shiftBreaks: AddShiftBreakDTO[]): any {
        let shiftBreaksJson : string = "[";

        shiftBreaks.forEach(element => {
            let elementJson = JSON.parse(JSON.stringify(element));
            elementJson.ShiftBreakStartTime = this.auxConvertDateToTimeSpan(element.ShiftBreakStartTime);
            elementJson.ShiftBreakDuration = this.auxConvertDateToTimeSpan(element.ShiftBreakDuration);
            shiftBreaksJson += JSON.stringify(elementJson) + ",";
        });

        shiftBreaksJson = shiftBreaksJson.slice(0, -1);

        shiftBreaksJson += "]";

        return shiftBreaksJson;
    }

    

    auxConvertDateToTimeSpan(date: Date): string {
        let dateSplit = date.toString().split(":");
        if(dateSplit.length == 2)
            return dateSplit[0] + ":" + dateSplit[1] + ":" + "00";
        else
            return dateSplit[0] + ":" + dateSplit[1] + ":" + dateSplit[2];
    }

}