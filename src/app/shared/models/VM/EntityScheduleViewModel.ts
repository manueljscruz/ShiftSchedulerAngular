import { EntityRuleDTO } from "../DTOs/Incoming/EntityRuleDTO";
import { ScheduleEntryDTO } from "../DTOs/Incoming/ScheduleEntryDTO";
import { ShiftDTO } from "../DTOs/Incoming/ShiftDTO";

export class EntityScheduleViewModel{
    scheduleEntries: ScheduleEntryDTO[];
    allowEdit: boolean;
    shifts: ShiftDTO[];
    entityRules: EntityRuleDTO[];

    constructor(scheduleEntries: ScheduleEntryDTO[], allowEdit: boolean, shifts: ShiftDTO[], entityRules: EntityRuleDTO[]){
        this.scheduleEntries = scheduleEntries;
        this.allowEdit = allowEdit;
        this.shifts = shifts;
        this.entityRules = entityRules;
    }
}