import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageServiceService } from '../language-service.service';
import { GET_ENTITY_SHIFT_VIEW_MODEL_URL } from '../../../shared/constants/APIPathsConstants';
import { ShiftViewModel } from '../../../shared/models/VM/ShiftViewModel';
import { EntityShiftViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/EntityShiftViewModelRequestDTO';
import { ShiftBreakTypeLocalizedDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakTypeLocalizedDTO';
import { ShiftDTO } from '../../../shared/models/DTOs/Incoming/ShiftDTO';
import { ShiftBreakTemplateDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakTemplateDTO';
import { ShiftVMApiResponse } from '../../../shared/models/interfaces/ShiftApiResponses';
import { ShiftTemplateDTO } from '../../../shared/models/DTOs/Incoming/ShiftTemplateDTO';

@Injectable({
    providedIn: 'root'
})

export class ShiftService {

    constructor(private http: HttpClient,
        private languageService: LanguageServiceService) 
        { }

    async getShiftViewModel(entityShiftViewModelRequestDTO : EntityShiftViewModelRequestDTO) : Promise<ShiftViewModel> {
        let shiftVM : ShiftViewModel = new ShiftViewModel([], [], false, []);

        entityShiftViewModelRequestDTO.languageCode = this.languageService.returnLocalization();
        try{
            var response = await this.http.post<ShiftVMApiResponse>(GET_ENTITY_SHIFT_VIEW_MODEL_URL, entityShiftViewModelRequestDTO).toPromise() as ShiftVMApiResponse;

            // Extract and map the response data
            const shifts = response?.Shifts.$values.map((shift: ShiftDTO) => new ShiftDTO(
                shift.ShiftId,
                shift.EntityId,
                shift.ShiftName,
                shift.ShiftAlias,
                shift.ShiftDescription,
                shift.ShiftStartHour,
                shift.ShiftDuration,
                shift.ShiftBreaks
            ));

            const shiftBreakTypeLocalizeds = response?.ShiftBreakTypeLocalizeds.$values.map((item: any) => new ShiftBreakTypeLocalizedDTO(
                item.ShiftBreakTypeId, 
                item.ShiftBreakTypeLocalizedName
            ));

            const allowEdit = response?.AllowEdit;

            const shiftBreakTemplates: ShiftBreakTemplateDTO[] = response?.ShiftBreakTemplates.$values.map((item: any) => new ShiftBreakTemplateDTO(
                item.ShiftBreakTemplateId,
                item.ShiftId,
                item.ShiftBreakTypeId,
                item.ShiftBreakTemplateName,
                item.ShiftBreakTypeDisplayValue,
                item.ShiftBreakDuration,
                item.ShiftBreakStartHour,
                item.IncludedInShift,
                item.IsTimeFlexible,
                item.IsPopular
            ));
            
            const shiftTemplates : ShiftTemplateDTO[] = response?.ShiftTemplates.$values.map((item: any) => new ShiftTemplateDTO(
                item.ShiftTemplateId,
                item.ShiftTemplateName,
                item.ShiftTemplateAlias,
                item.ShiftStartHour,
                item.ShiftDuration,
                item.IsPopular,
                item.ShiftBreakTemplates
            ));

            // Create an instance of ShiftViewModel
            shiftVM = new ShiftViewModel(shifts, shiftBreakTypeLocalizeds, allowEdit, shiftBreakTemplates, shiftTemplates);

        }
        catch(error : any){
            console.error('Error fetching data:', error.message);
        }
        return shiftVM;
    }

}