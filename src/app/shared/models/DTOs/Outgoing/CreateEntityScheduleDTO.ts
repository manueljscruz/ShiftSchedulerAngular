import { BaseViewModelRequestDTO } from "./BaseViewModelRequestDTO";

export class CreateEntityScheduleDTO extends BaseViewModelRequestDTO {
    startDate: Date;
    endDate: Date;
    singleRoleResponsibility: boolean = false;
    clearExistingSchedule: boolean = false;
    filteredMembers: string[] = [];
    filteredShifts: string[] = [];
    filteredRules: string[] = [];

    constructor(entityId: string, workerId: string, languageCode: string, startDate: Date, endDate: Date, singleRoleResponsibility : boolean, clearExistingSchedule : boolean, filteredMembers: string[] = [], filteredShifts: string[] = [], filteredRules: string[] = []) {
        super(entityId, workerId, languageCode);
        this.startDate = startDate;
        this.endDate = endDate;
        this.singleRoleResponsibility = singleRoleResponsibility;
        this.clearExistingSchedule = clearExistingSchedule;
        this.filteredMembers = filteredMembers;
        this.filteredShifts = filteredShifts;
        this.filteredRules = filteredRules;
    }
}