import { SkillDTO } from "./SkillDTO";

export class EntityWorkerMemberDTO{
    WorkerId: string;
    WorkerName: string;
    CanCreateSchedules: boolean;
    IsOwner: boolean;
    SkillSet: SkillDTO[];

    constructor(workerId: string, workerName: string, canCreateSchedules: boolean, isOwner : boolean, skillSet: SkillDTO[]) {
        this.WorkerId = workerId;
        this.WorkerName = workerName;
        this.CanCreateSchedules = canCreateSchedules;
        this.IsOwner = isOwner;
        this.SkillSet = skillSet;
    }
}