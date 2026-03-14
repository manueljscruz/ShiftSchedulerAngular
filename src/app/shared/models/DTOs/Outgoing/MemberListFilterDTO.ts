import { ShiftDTO } from "../Incoming/ShiftDTO";
import { SkillDTO } from "../Incoming/SkillDTO";

export class MemberListFilterDTO {
    nameFilter: string = "";
    applyMemberTypeFilter: boolean = false;
    isBot: boolean = false;
    selectedSkills: SkillDTO[] = [];
    selectedShifts: ShiftDTO[] = [];
    partOfRotation: boolean = false;
    worksWeekDays: boolean = false;
    worksWeekEnds: boolean = false;

    constructor(nameFilter: string = "", applyMemberTypeFilter = false, isBot = false, selectedSkills: SkillDTO[] = [], selectedShifts: ShiftDTO[] = [], partOfRotation: boolean = false, worksWeekDays: boolean = false, worksWeekEnds: boolean = false) {
        this.nameFilter = nameFilter;
        this.applyMemberTypeFilter = applyMemberTypeFilter;
        this.isBot = isBot;
        this.selectedSkills = selectedSkills;
        this.selectedShifts = selectedShifts;
        this.partOfRotation = partOfRotation;
        this.worksWeekDays = worksWeekDays;
        this.worksWeekEnds = worksWeekEnds;
    }

}