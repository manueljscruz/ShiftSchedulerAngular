import { EntityWorkerMemberDTO } from "../DTOs/EntityWorkerMemberDTO";
import { SkillDTO } from "../DTOs/SkillDTO";

export class EntityMembersViewModel {
    entityOwnerId: string;
    skills: SkillDTO[];
    entityMembers: EntityWorkerMemberDTO[];

    constructor(entityOwnerId : string, skills: SkillDTO[], entityMembers: EntityWorkerMemberDTO[]) {
        this.entityOwnerId = entityOwnerId;
        this.skills = skills;
        this.entityMembers = entityMembers;
    }
}