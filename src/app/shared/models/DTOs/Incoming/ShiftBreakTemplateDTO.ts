export class ShiftBreakTemplateDTO{
    ShiftBreakTemplateId: number;
    ShiftId: number;
    ShiftBreakTypeId: number;
    ShiftBreakTemplateName: string;
    ShiftBreakTypeDisplayValue: string;
    ShiftBreakDuration: Date;
    ShiftBreakStartHour: Date;
    IncludedInShift: boolean;
    IsTimeFlexible: boolean;
    IsPopular: boolean;

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
        this.ShiftBreakTemplateId = shiftBreakTemplateId;
        this.ShiftId = shiftId;
        this.ShiftBreakTypeId = shiftBreakTypeId;
        this.ShiftBreakTemplateName = shiftBreakTemplateName;
        this.ShiftBreakTypeDisplayValue = shiftBreakTypeDisplayValue;
        this.ShiftBreakDuration = shiftBreakDuration;
        this.ShiftBreakStartHour = shiftBreakStartHour;
        this.IncludedInShift = includedInShift;
        this.IsTimeFlexible = isTimeFlexible;
        this.IsPopular = isPopular;
    }
}