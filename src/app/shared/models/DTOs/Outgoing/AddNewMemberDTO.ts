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

    languageCode: string;

    constructor(isBot: boolean, destinationEntityId : string, name: string, email: string, skills: SkillDTO[], languageCode: string){
        this.isBot = isBot;
        this.destinationEntityId = destinationEntityId;
        this.memberName = name;
        this.memberEmail = email;
        this.assignedSkills = skills;
        this.languageCode = languageCode;
    }
}