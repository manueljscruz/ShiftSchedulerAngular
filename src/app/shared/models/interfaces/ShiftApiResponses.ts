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

export interface AddShiftBreakResponse{
    $id: string;
    Message: string;
    Success: boolean;
    Result: {$id: string; shiftDTO: ShiftDTO};
}

/*
export interface ShiftBreakDTO {
    $id: string;
    ShiftBreakId: string;
    ShiftId: string;
    ShiftBreakTypeId: number;
    ShiftBreakStartTime: string;
    ShiftBreakDuration: string;
    IncludedInShift: boolean;
    IsTimeFlexible: boolean;
}

export interface ShiftDTO {
    $id: string;
    ShiftId: string;
    EntityId: string;
    ShiftName: string;
    ShiftAlias: string;
    ShiftDescription: string;
    ShiftStartHour: string;
    ShiftDuration: string;
    ShiftBreakDTOs: {
        $id: string;
        $values: ShiftBreakDTO[];
    };
}
*/

