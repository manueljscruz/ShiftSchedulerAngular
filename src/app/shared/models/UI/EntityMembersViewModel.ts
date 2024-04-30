import { EntityWorkerMemberDTO } from "../DTOs/Incoming/EntityWorkerMemberDTO";
import { SkillDTO } from "../DTOs/Incoming/SkillDTO";

export class EntityMembersViewModel {
    EntityOwnerId: string;
    Skills: SkillDTO[];
    EntityMembers: EntityWorkerMemberDTO[];

    constructor(entityOwnerId : string, skills: SkillDTO[], entityMembers: EntityWorkerMemberDTO[]) {
        this.EntityOwnerId = entityOwnerId;
        this.Skills = skills;
        this.EntityMembers = entityMembers;
    }
}