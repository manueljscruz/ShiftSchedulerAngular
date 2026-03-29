import { SkillDTO } from '../Incoming/SkillDTO';

export class MemberTransferItemDTO {
    workerId: string = '';
    workerName: string = '';
    isBot: boolean = false;
    // Human-only permission fields (ignored for bots)
    entityPermissionRoleId: number = 3;
    canManageChildren: boolean = false;
    partOfRoster: boolean = false;
    // Scheduling fields
    partOfRotation: boolean = false;
    worksWeekDays: boolean = false;
    worksWeekends: boolean = false;
    multipleShiftAssignments: boolean = false;
    assignedSkills: SkillDTO[] = [];
}
