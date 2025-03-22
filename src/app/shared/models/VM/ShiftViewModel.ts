import { EntityShiftRotationDTO } from "../DTOs/Incoming/EntityShiftRotationDTO";
import { ShiftBreakTemplateDTO } from "../DTOs/Incoming/ShiftBreakTemplateDTO";
import { ShiftBreakTypeLocalizedDTO } from "../DTOs/Incoming/ShiftBreakTypeLocalizedDTO";
import { ShiftDTO } from "../DTOs/Incoming/ShiftDTO";
import { ShiftTemplateDTO } from "../DTOs/Incoming/ShiftTemplateDTO";

export class ShiftViewModel{
    shifts: ShiftDTO[];
    shiftBreakTypeLocalizeds: ShiftBreakTypeLocalizedDTO[];
    shiftRotations: EntityShiftRotationDTO[];
    allowEdit: boolean;
    shiftBreakTemplates: ShiftBreakTemplateDTO[];
    shiftTemplates: ShiftTemplateDTO[];

    constructor(shifts: ShiftDTO[], shiftBreakTypeLocalizeds: ShiftBreakTypeLocalizedDTO[], shiftRotations: EntityShiftRotationDTO[], allowEdit: boolean = false, shiftBreakTemplates: ShiftBreakTemplateDTO[] = [], shiftTemplates: ShiftTemplateDTO[] = []){
        this.shifts = shifts;
        this.shiftBreakTypeLocalizeds = shiftBreakTypeLocalizeds;
        this.shiftRotations = shiftRotations;
        this.allowEdit = allowEdit;
        this.shiftBreakTemplates = shiftBreakTemplates;
        this.shiftTemplates = shiftTemplates;
    }
}