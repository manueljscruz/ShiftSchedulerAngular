export class AddShiftBreakDTO {
    ShiftId: string;
    ShiftBreakTypeId: number;
    ShiftBreakStartTime: Date;
    ShiftBreakDuration: Date;
    IncludedInShift: boolean;
    IsTimeFlexible: boolean;

    constructor(ShiftId: string, ShiftBreakTypeId: number, ShiftBreakStartTime: Date, ShiftBreakDuration: Date, IncludedInShift: boolean, IsTimeFlexible: boolean) {
        this.ShiftId = ShiftId;
        this.ShiftBreakTypeId = ShiftBreakTypeId;
        this.ShiftBreakStartTime = ShiftBreakStartTime;
        this.ShiftBreakDuration = ShiftBreakDuration;
        this.IncludedInShift = IncludedInShift;
        this.IsTimeFlexible = IsTimeFlexible;
    }
}