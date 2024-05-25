import { SkillDTO } from "./SkillDTO";

export class EntityWorkerMemberDTO{
    workerId: string;
    workerName: string;
    canCreateSchedules: boolean;
    isOwner: boolean;
    skillSet: SkillDTO[];

    constructor(workerId: string, workerName: string, canCreateSchedules: boolean, isOwner : boolean, skillSet: SkillDTO[]) {
        this.workerId = workerId;
        this.workerName = workerName;
        this.canCreateSchedules = canCreateSchedules;
        this.isOwner = isOwner;
        this.skillSet = skillSet;
    }
}