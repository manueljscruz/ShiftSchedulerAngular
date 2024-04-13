import { EntityWorkerMemberDTO } from "../DTOs/EntityWorkerMemberDTO";
import { SkillDTO } from "../DTOs/SkillDTO";

export class EntityMembersViewModel {
    skills: SkillDTO[];
    entityMembers: EntityWorkerMemberDTO[];

    constructor(skills: SkillDTO[], entityMembers: EntityWorkerMemberDTO[]) {
        this.skills = skills;
        this.entityMembers = entityMembers;
    }
}