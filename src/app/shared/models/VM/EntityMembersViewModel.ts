import { EntityWorkerMemberDTO } from "../DTOs/Incoming/EntityWorkerMemberDTO";
import { PagedList } from "../DTOs/Incoming/PagedList";
import { ShiftDTO } from "../DTOs/Incoming/ShiftDTO";
import { SkillDTO } from "../DTOs/Incoming/SkillDTO";

export class EntityMembersViewModel {
    entityOwnerId: string;
    skills: SkillDTO[];
    shifts: ShiftDTO[];
    entityMembers: PagedList<EntityWorkerMemberDTO>;
    // entityMembers: EntityWorkerMemberDTO[];

    constructor(entityOwnerId : string, skills: SkillDTO[], shifts: ShiftDTO[], entityMembers: PagedList<EntityWorkerMemberDTO>) {
        this.entityOwnerId = entityOwnerId;
        this.skills = skills;
        this.shifts = shifts;
        this.entityMembers = entityMembers;
    }
}