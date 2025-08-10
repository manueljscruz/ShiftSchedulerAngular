import { ShiftDTO } from "./ShiftDTO";
import { SkillDTO } from "./SkillDTO";

export class EntityWorkerMemberDTO{
    workerId: string;
    workerName: string;
    isBot: boolean;
    canCreateSchedules: boolean;
    isOwner: boolean;
    skillSet: SkillDTO[];
    partOfRotation: boolean;
    worksWeekDays: boolean;
    worksWeekends: boolean;
    multipleShiftAssignments : boolean;
    assignedShifts: ShiftDTO[];

    isSelected: boolean = false;
    selectedSkills: SkillDTO[] = [];

    constructor(workerId: string, workerName: string, isBot: boolean, canCreateSchedules: boolean, isOwner : boolean, skillSet: SkillDTO[], partOfRotation: boolean, worksWeekDays: boolean, worksWeekends: boolean, multipleShiftAssignments:boolean, assignedShifts: ShiftDTO[]){ 
        this.workerId = workerId;
        this.workerName = workerName;
        this.isBot = isBot;
        this.canCreateSchedules = canCreateSchedules;
        this.isOwner = isOwner;
        this.skillSet = skillSet;
        this.partOfRotation = partOfRotation;
        this.assignedShifts = assignedShifts;
        this.worksWeekDays = worksWeekDays;
        this.worksWeekends = worksWeekends;
        this.multipleShiftAssignments = multipleShiftAssignments;
    }


    public static newInstance(): EntityWorkerMemberDTO {
        return new EntityWorkerMemberDTO("", "", false, false, false, [], false, true, true, false, []);
    }
}