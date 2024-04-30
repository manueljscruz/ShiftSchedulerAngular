export class SkillDTO {
    SkillId: number;
    SkillLocalizedName: string;
    SkillHexBGColor: string;
    SkillHexFontColor: string;
    
    constructor(id: number, skillLocalizedName: string, hexBGColor: string, hexFontColor: string) {
        this.SkillId = id;
        this.SkillLocalizedName = skillLocalizedName;
        this.SkillHexBGColor = hexBGColor;
        this.SkillHexFontColor = hexFontColor;
    }
}