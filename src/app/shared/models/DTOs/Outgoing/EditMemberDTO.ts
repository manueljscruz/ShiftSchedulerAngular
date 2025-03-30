import { ShiftDTO } from "../Incoming/ShiftDTO";
import { SkillDTO } from "../Incoming/SkillDTO";

export class EditMemberDTO{
    workerId: string;
    entityId: string;
    isBot: boolean;
    workerName: string;
    assignedSkills: SkillDTO[];
    partOfRotation: boolean;
    assignedShifts: ShiftDTO[] = [];

    constructor(workerId: string, entityId: string, isBot: boolean, workerName: string, assignedSkills: SkillDTO[], partOfRotation: boolean, assignedShifts: ShiftDTO[]){
        this.workerId = workerId;
        this.entityId = entityId;
        this.isBot = isBot;
        this.workerName = workerName;
        this.assignedSkills = assignedSkills;
        this.partOfRotation = partOfRotation;
        this.assignedShifts = assignedShifts;
    }
}