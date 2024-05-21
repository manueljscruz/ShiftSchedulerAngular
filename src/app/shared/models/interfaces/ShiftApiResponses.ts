import { ShiftBreakTemplateDTO } from "../DTOs/Incoming/ShiftBreakTemplateDTO";
import { ShiftBreakTypeLocalizedDTO } from "../DTOs/Incoming/ShiftBreakTypeLocalizedDTO";
import { ShiftDTO } from "../DTOs/Incoming/ShiftDTO";
import { ShiftTemplateDTO } from "../DTOs/Incoming/ShiftTemplateDTO";

export interface ShiftVMApiResponse {
    $id: string;
    AllowEdit: boolean;
    ShiftBreakTypeLocalizeds: { $id: string; $values: ShiftBreakTypeLocalizedDTO[] };
    Shifts: { $id: string; $values: ShiftDTO[] }
    ShiftBreakTemplates: { $id: string; $values: ShiftBreakTemplateDTO[] }
    ShiftTemplates : { $id: string; $values: ShiftTemplateDTO[] }
}