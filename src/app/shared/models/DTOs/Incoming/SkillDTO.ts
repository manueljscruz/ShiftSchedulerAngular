export class SkillDTO {
    skillId: number;
    skillLocalizedName: string;
    skillHexBGColor: string;
    skillHexFontColor: string;
    // Additional properties
    isActive: boolean = true; // Default to true, can be set later if needed
    
    constructor(id: number, skillLocalizedName: string, hexBGColor: string, hexFontColor: string) {
        this.skillId = id;
        this.skillLocalizedName = skillLocalizedName;
        this.skillHexBGColor = hexBGColor;
        this.skillHexFontColor = hexFontColor;
    }
}