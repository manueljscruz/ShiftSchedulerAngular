import { EntityWorkerMemberDTO } from "./EntityWorkerMemberDTO";
import { SkillDTO } from "./SkillDTO";

export class ScheduleEntryParticipantDTO {
    worker : EntityWorkerMemberDTO;
    isSelected: boolean = false;
    assignedSkills: SkillDTO[] = [];

    constructor(worker: EntityWorkerMemberDTO, isSelected: boolean = false, assignedSkills: SkillDTO[] = []) {
        this.worker = worker;
        this.isSelected = isSelected;
        this.assignedSkills = assignedSkills;
    }
}