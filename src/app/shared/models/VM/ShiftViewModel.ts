import { ShiftBreakTemplateDTO } from "../DTOs/Incoming/ShiftBreakTemplateDTO";
import { ShiftBreakTypeLocalizedDTO } from "../DTOs/Incoming/ShiftBreakTypeLocalizedDTO";
import { ShiftDTO } from "../DTOs/Incoming/ShiftDTO";
import { ShiftTemplateDTO } from "../DTOs/Incoming/ShiftTemplateDTO";

export class ShiftViewModel{
    shifts: ShiftDTO[];
    shiftBreakTypeLocalizeds: ShiftBreakTypeLocalizedDTO[];
    allowEdit: boolean;
    shiftBreakTemplates: ShiftBreakTemplateDTO[];
    shiftTemplates: ShiftTemplateDTO[];

    constructor(shifts: ShiftDTO[], shiftBreakTypeLocalizeds: ShiftBreakTypeLocalizedDTO[], allowEdit: boolean = false, shiftBreakTemplates: ShiftBreakTemplateDTO[] = [], shiftTemplates: ShiftTemplateDTO[] = []){
        this.shifts = shifts;
        this.shiftBreakTypeLocalizeds = shiftBreakTypeLocalizeds;
        this.allowEdit = allowEdit;
        this.shiftBreakTemplates = shiftBreakTemplates;
        this.shiftTemplates = shiftTemplates;
    }
}