import { EntityRuleDTO } from "../DTOs/Incoming/EntityRuleDTO";
import { EntityWorkerDTO } from "../DTOs/Incoming/EntityWorkerDTO";
import { EntityWorkerMemberDTO } from "../DTOs/Incoming/EntityWorkerMemberDTO";
import { ScheduleEntryDTO } from "../DTOs/Incoming/ScheduleEntryDTO";
import { ShiftDTO } from "../DTOs/Incoming/ShiftDTO";

export class EntityScheduleViewModel{
    scheduleEntries: ScheduleEntryDTO[];
    allowEdit: boolean;
    entityWorkerMembers: EntityWorkerMemberDTO[];
    shifts: ShiftDTO[];
    entityRules: EntityRuleDTO[];

    constructor(scheduleEntries: ScheduleEntryDTO[], allowEdit: boolean, entityWorkerMembers: EntityWorkerMemberDTO[], shifts: ShiftDTO[], entityRules: EntityRuleDTO[]){
        this.scheduleEntries = scheduleEntries;
        this.allowEdit = allowEdit;
        this.entityWorkerMembers = entityWorkerMembers;
        this.shifts = shifts;
        this.entityRules = entityRules;
    }
}