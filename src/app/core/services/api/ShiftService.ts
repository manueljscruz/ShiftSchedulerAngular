import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageServiceService } from '../language-service.service';
import { GET_ENTITY_SHIFT_VIEW_MODEL_URL, ADD_SHIFT_URL, ADD_SHIFT_BREAK_URL, UPDATE_SHIFT_BREAK_URL, DELETE_SHIFT_URL, DELETE_SHIFT_BREAK_URL, UPDATE_SHIFT_URL, GET_ENTITY_SHIFTS, ADD_SHIFT_ROTATION_URL, UPDATE_SHIFT_ROTATION_URL, DELETE_SHIFT_ROTATION_URL, UPDATE_SHIFT_ROTATION_ORDER_URL, UPDATE_SHIFT_TEMPLATE_POP_COUNT_URL, UPDATE_SHIFT_BREAK_TEMPLATE_POP_COUNT_URL } from '../../../shared/constants/APIPathsConstants';
import { ShiftViewModel } from '../../../shared/models/VM/ShiftViewModel';
import { ShiftDTO } from '../../../shared/models/DTOs/Incoming/ShiftDTO';
import { AddShiftBreakDTO } from '../../../shared/models/DTOs/Outgoing/AddShiftBreakDTO';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { ShiftBreakDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakDTO';
import { AddShiftDTO } from '../../../shared/models/DTOs/Outgoing/AddShiftDTO';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { SingleIdentifierDTO } from '../../../shared/models/DTOs/Outgoing/SingleIdentifierDTO';
import { AddShiftRotationDTO } from '../../../shared/models/DTOs/Outgoing/AddShiftRotationDTO';
import { UpdateShiftRotationDTO } from '../../../shared/models/DTOs/Outgoing/UpdateShiftRotationDTO';
import { EntityShiftRotationDTO } from '../../../shared/models/DTOs/Incoming/EntityShiftRotationDTO';
import { DeleteEntityObjectDTO } from '../../../shared/models/DTOs/Outgoing/DeleteEntityObjectDTO';

@Injectable({
    providedIn: 'root'
})

export class ShiftService {
    

    constructor(private http: HttpClient,
        private languageService: LanguageServiceService) 
        { }


    //#region Get Shift View Model

    /// <summary>
    /// Get the shift view model for the entity:
    /// - Shifts of the Entity
    /// - ShiftBreakTypeLocalizeds
    /// - AllowEdit
    /// - ShiftBreakTemplates
    /// - ShiftTemplates
    /// </summary>
    async getShiftViewModel(entityShiftViewModelRequestDTO : BaseViewModelRequestDTO) : Promise<ShiftViewModel> {
        let shiftVM : ShiftViewModel = new ShiftViewModel([], [], [], false, []);

        try{
            shiftVM = await this.http.post<ShiftViewModel>(GET_ENTITY_SHIFT_VIEW_MODEL_URL, entityShiftViewModelRequestDTO).toPromise() as ShiftViewModel; // <ShiftVMApiResponse>
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        return shiftVM;
    }

    //#endregion

    //#region Get Entity Shifts

    async getEntityShifts(identifier: SingleIdentifierDTO): Promise<ShiftDTO[]> {
        let shifts: ShiftDTO[] = [];

        try {
            shifts = await this.http.post<ShiftDTO[]>(GET_ENTITY_SHIFTS, identifier).toPromise() || []
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        return shifts;
    }

    //#endregion

    //#region Add Shift

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

    //#endregion

    //#region Add Shift Break

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

    //#endregion

    //#region Update Shift

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

    //#endregion

    //#region Update Shift Template Pop Count

    async updateShiftTemplatePopCount(shiftTemplateId: number): Promise<BaseResponseModel> {

        let response = new BaseResponseModel(false, "", null);

        try{
            let url = UPDATE_SHIFT_TEMPLATE_POP_COUNT_URL.replace("{shiftTemplateId}", shiftTemplateId.toString());
            response = await this.http.put<BaseResponseModel>(url, {}).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    //#endregion

    //#region Update Shift Break Template Pop Count

    async updateShiftBreakTemplatePopCount(shiftBreakTemplateId: number): Promise<BaseResponseModel> {

        let response = new BaseResponseModel(false, "", null);

        try{
            let url = UPDATE_SHIFT_BREAK_TEMPLATE_POP_COUNT_URL.replace("{shiftBreakTemplateId}", shiftBreakTemplateId.toString());
            response = await this.http.put<BaseResponseModel>(url, {}).toPromise() as BaseResponseModel;
        }   

        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    //#endregion

    //#region Update Shift Break

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

    //#endregion

    //#region Delete Shift

    /// <summary>
    /// Delete a shift
    /// </summary>
    async deleteShift(entityId: string, shiftId: string): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        let deleteShift : DeleteEntityObjectDTO = new DeleteEntityObjectDTO(entityId, shiftId);
        try{
            response = await this.http.delete<BaseResponseModel>(DELETE_SHIFT_URL,{
                body: deleteShift
            }).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    //#endregion

    //#region Delete Shift Break

    /// <summary>
    /// Delete a shift break
    /// </summary>
    async deleteShiftBreak(shiftBreakId: string) : Promise<BaseResponseModel>{
        let response = new BaseResponseModel(false, "", null);

        let deleteShiftBreakId : SingleIdentifierDTO = new SingleIdentifierDTO(shiftBreakId);
        try{
            response = await this.http.delete<BaseResponseModel>(DELETE_SHIFT_BREAK_URL, {
                body: deleteShiftBreakId
            }).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    //#endregion

    //#region Convert Dates to Time Span Strings

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
    
    //#endregion

    //#region Shift Break Array to JSON

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

    //#endregion

    //#region Aux Convert Date to Time Span

    auxConvertDateToTimeSpan(date: Date): string {
        let dateSplit = date.toString().split(":");
        if(dateSplit.length == 2)
            return dateSplit[0] + ":" + dateSplit[1] + ":" + "00";
        else
            return dateSplit[0] + ":" + dateSplit[1] + ":" + dateSplit[2];
    }

    //#endregion

    //#region Add Shift Rotation

    
    async addShiftRotation(newRotation: AddShiftRotationDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        try{
            let rotationJSON = JSON.parse(JSON.stringify(newRotation));
            response = await this.http.post<BaseResponseModel>(ADD_SHIFT_ROTATION_URL, rotationJSON).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    //#endregion

    //#region Update Shift Rotation Order

    async updateShiftRotationOrder(rotation: UpdateShiftRotationDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        try{
            let httpResponse = await this.http.put<BaseResponseModel>(UPDATE_SHIFT_ROTATION_ORDER_URL, rotation, {observe: 'response'}).toPromise();
        
            // Check for update success
            if(httpResponse?.status === 204){
                response = new BaseResponseModel(true, "Success", null);
            }
            else 
                response = new BaseResponseModel(false, "Error", null);
            
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    //#endregion

    //#region Update Shift Rotation

    async updateShiftRotation(shiftRotationDTO: EntityShiftRotationDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        try{
            response = await this.http.put<BaseResponseModel>(UPDATE_SHIFT_ROTATION_URL, shiftRotationDTO).toPromise() as BaseResponseModel;
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;
    }

    //#endregion

    //#region Delete Shift Rotation

    async deleteShiftRotation(shiftRotation : EntityShiftRotationDTO): Promise<BaseResponseModel> {
        let response = new BaseResponseModel(false, "", null);

        try{
            let httpResponse = await this.http.delete<BaseResponseModel>(DELETE_SHIFT_ROTATION_URL, {
                body: shiftRotation,
                observe: 'response',
                responseType: 'json'
            }).toPromise();
        
            // Check for update success
            if(httpResponse?.status === 204){
                response = new BaseResponseModel(true, "Success", null);
            }
            else 
                response = new BaseResponseModel(false, "Error", null);
        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }

        return response;

    }

    //#endregion

}