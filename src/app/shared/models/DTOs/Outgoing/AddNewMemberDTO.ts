import { ShiftDTO } from "../Incoming/ShiftDTO";
import { SkillDTO } from "../Incoming/SkillDTO";

export class AddNewMemberDTO {

    /// <summary>
    /// Whether the new member is a bot.
    /// </summary>
    isBot: boolean;

    /// <summary>
    /// The entity id to where the new member will be added.
    /// </summary>
    destinationEntityId: string;

    /// <summary>
    /// The name of the new member.
    /// </summary>
    memberName: string;

    /// <summary>
    /// The email of the new member.
    /// </summary>
    memberEmail: string;

    /// <summary>
    /// The skills assigned to the new member.
    /// </summary>
    assignedSkills: SkillDTO[];

    partOfRotation: boolean = false;

    worksWeekDays: boolean = false;

    worksWeekends: boolean = false;

    multipleShiftAssignments : boolean;

    assignedShifts: ShiftDTO[] = [];

    entityPermissionRoleId: number = 3;

    constructor(isBot: boolean, destinationEntityId : string, name: string, email: string, skills: SkillDTO[], worksWeekDays: boolean, worksWeekends: boolean, multipleShiftAssignments : boolean, shifts: ShiftDTO[], partOfRotation: boolean, entityPermissionRoleId: number = 3){
        this.isBot = isBot;
        this.destinationEntityId = destinationEntityId;
        this.memberName = name;
        this.memberEmail = email;
        this.assignedSkills = skills;
        this.assignedShifts = shifts;
        this.partOfRotation = partOfRotation;
        this.worksWeekDays = worksWeekDays;
        this.worksWeekends = worksWeekends;
        this.multipleShiftAssignments = multipleShiftAssignments;
        this.entityPermissionRoleId = entityPermissionRoleId;
    }
}
