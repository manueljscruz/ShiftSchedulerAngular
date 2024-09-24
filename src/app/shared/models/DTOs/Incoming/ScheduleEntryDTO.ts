import { EntityWorkerDTO } from "./EntityWorkerDTO";
import { ShiftDTO } from "./ShiftDTO";

export class ScheduleEntryDTO{
    scheduleEntryId: string;
    shiftId: string;
    scheduleStartDate: Date;
    scheduleEndDate: Date;
    shiftDTO: ShiftDTO;
    scheduleParticipants: EntityWorkerDTO[];

    constructor(scheduleEntryId: string, shiftId: string, scheduleStartDate: Date, scheduleEndDate: Date, shiftDTO: ShiftDTO, scheduleParticipants: EntityWorkerDTO[]){
        this.scheduleEntryId = scheduleEntryId;
        this.shiftId = shiftId;
        this.scheduleStartDate = scheduleStartDate;
        this.scheduleEndDate = scheduleEndDate;
        this.shiftDTO = shiftDTO;
        this.scheduleParticipants = scheduleParticipants;
    }
}