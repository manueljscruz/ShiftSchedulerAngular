import { EntityWorkerMemberDTO } from "../DTOs/Incoming/EntityWorkerMemberDTO";
import { SkillDTO } from "../DTOs/Incoming/SkillDTO";

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