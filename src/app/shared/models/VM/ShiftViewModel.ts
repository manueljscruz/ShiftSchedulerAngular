import { ShiftBreakTemplateDTO } from "../DTOs/Incoming/ShiftBreakTemplateDTO";
import { ShiftBreakTypeLocalizedDTO } from "../DTOs/Incoming/ShiftBreakTypeLocalizedDTO";
import { ShiftDTO } from "../DTOs/Incoming/ShiftDTO";
import { ShiftTemplateDTO } from "../DTOs/Incoming/ShiftTemplateDTO";

export class ShiftViewModel{
    Shifts: ShiftDTO[];
    ShiftBreakTypeLocalizeds: ShiftBreakTypeLocalizedDTO[];
    AllowEdit: boolean;
    ShiftBreakTemplates: ShiftBreakTemplateDTO[];
    ShiftTemplates: ShiftTemplateDTO[];

    constructor(shifts: ShiftDTO[], shiftBreakTypeLocalizeds: ShiftBreakTypeLocalizedDTO[], allowEdit: boolean = false, shiftBreakTemplates: ShiftBreakTemplateDTO[] = [], shiftTemplates: ShiftTemplateDTO[] = []){
        this.Shifts = shifts;
        this.ShiftBreakTypeLocalizeds = shiftBreakTypeLocalizeds;
        this.AllowEdit = allowEdit;
        this.ShiftBreakTemplates = shiftBreakTemplates;
        this.ShiftTemplates = shiftTemplates;
    }
}