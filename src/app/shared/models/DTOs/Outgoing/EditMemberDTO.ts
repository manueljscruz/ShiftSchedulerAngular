import { SkillDTO } from "../Incoming/SkillDTO";

export class EditMemberDTO{
    workerId: string;
    entityId: string;
    isBot: boolean;
    workerName: string;
    assignedSkills: SkillDTO[];

    constructor(workerId: string, entityId: string, isBot: boolean, workerName: string, assignedSkills: SkillDTO[]){
        this.workerId = workerId;
        this.entityId = entityId;
        this.isBot = isBot;
        this.workerName = workerName;
        this.assignedSkills = assignedSkills;
    }
}