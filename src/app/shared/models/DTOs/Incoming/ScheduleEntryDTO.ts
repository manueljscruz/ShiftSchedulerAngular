import { EntityWorkerDTO } from "./EntityWorkerDTO";
import { EntityWorkerMemberDTO } from "./EntityWorkerMemberDTO";
import { ShiftDTO } from "./ShiftDTO";

export class ScheduleEntryDTO{
    scheduleEntryId: string;
    shiftId: string;
    scheduleStartDate: Date;
    scheduleEndDate: Date;
    shiftDTO: ShiftDTO;
    scheduleParticipants: EntityWorkerMemberDTO[];

    constructor(scheduleEntryId: string, shiftId: string, scheduleStartDate: Date, scheduleEndDate: Date, shiftDTO: ShiftDTO, scheduleParticipants: EntityWorkerMemberDTO[]){
        this.scheduleEntryId = scheduleEntryId;
        this.shiftId = shiftId;
        this.scheduleStartDate = scheduleStartDate;
        this.scheduleEndDate = scheduleEndDate;
        this.shiftDTO = shiftDTO;
        this.scheduleParticipants = scheduleParticipants;
    }

    public static newScheduleEntryDTO(): ScheduleEntryDTO
    {
        return new ScheduleEntryDTO('', '', new Date(), new Date(), ShiftDTO.newShiftDTO(), []);
    }
}