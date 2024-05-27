export class ShiftBreakTemplateDTO{
    shiftBreakTemplateId: number;
    shiftId: number;
    shiftBreakTypeId: number;
    shiftBreakTemplateName: string;
    shiftBreakTypeDisplayValue: string;
    shiftBreakDuration: Date;
    shiftBreakStartHour: Date;
    includedInShift: boolean;
    isTimeFlexible: boolean;
    isPopular: boolean;
    public readonly type = 'ShiftBreakTemplateDTO';
    
    constructor(shiftBreakTemplateId: number, 
        shiftId: number, 
        shiftBreakTypeId: number, 
        shiftBreakTemplateName: string, 
        shiftBreakTypeDisplayValue: string,
        shiftBreakDuration: Date, 
        shiftBreakStartHour: Date, 
        includedInShift: boolean, 
        isTimeFlexible: boolean, 
        isPopular: boolean)
    {
        this.shiftBreakTemplateId = shiftBreakTemplateId;
        this.shiftId = shiftId;
        this.shiftBreakTypeId = shiftBreakTypeId;
        this.shiftBreakTemplateName = shiftBreakTemplateName;
        this.shiftBreakTypeDisplayValue = shiftBreakTypeDisplayValue;
        this.shiftBreakDuration = shiftBreakDuration;
        this.shiftBreakStartHour = shiftBreakStartHour;
        this.includedInShift = includedInShift;
        this.isTimeFlexible = isTimeFlexible;
        this.isPopular = isPopular;
    }
}