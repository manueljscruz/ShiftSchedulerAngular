export class SkillDTO {
    skillId: number;
    skillLocalizedName: string;
    skillHexBGColor: string;
    skillHexFontColor: string;
    
    constructor(id: number, skillLocalizedName: string, hexBGColor: string, hexFontColor: string) {
        this.skillId = id;
        this.skillLocalizedName = skillLocalizedName;
        this.skillHexBGColor = hexBGColor;
        this.skillHexFontColor = hexFontColor;
    }
}