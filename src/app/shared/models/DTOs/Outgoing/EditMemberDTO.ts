import { ShiftDTO } from "../Incoming/ShiftDTO";
import { SkillDTO } from "../Incoming/SkillDTO";

export class EditMemberDTO{
    workerId: string;
    entityId: string;
    isBot: boolean;
    workerName: string;
    assignedSkills: SkillDTO[];
    partOfRotation: boolean;
    worksWeekDays: boolean = false;
    worksWeekends: boolean = false;
    assignedShifts: ShiftDTO[] = [];

    constructor(workerId: string, entityId: string, isBot: boolean, workerName: string, assignedSkills: SkillDTO[], partOfRotation: boolean, worksWeedDays: boolean, worksWeekends: boolean, assignedShifts: ShiftDTO[]){
        this.workerId = workerId;
        this.entityId = entityId;
        this.isBot = isBot;
        this.workerName = workerName;
        this.assignedSkills = assignedSkills;
        this.partOfRotation = partOfRotation;
        this.assignedShifts = assignedShifts;
        this.worksWeekDays = worksWeedDays;
        this.worksWeekends = worksWeekends;
    }
}