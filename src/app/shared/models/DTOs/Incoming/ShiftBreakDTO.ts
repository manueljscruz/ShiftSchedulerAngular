export class ShiftBreakDTO
{
    /// <summary>
    /// Shift break id
    /// </summary>
    public ShiftBreakId: string ;

    /// <summary>
    /// Shift identifier 
    public ShiftId: string;

    /// <summary>
    /// Shift break type identifier
    /// </summary>
    public ShiftBreakTypeId : number;

    /// <summary>
    /// Shift break type localized name
    /// </summary>
    public ShiftBreakTypeDisplay : string;

    /// <summary>
    /// Shift break start time
    /// </summary>
    public ShiftBreakStartTime : Date;

    /// <summary>
    /// Shift break end time
    /// </summary>
    public ShiftBreakDuration : Date;

    /// <summary>
    /// Shift break duration
    /// </summary>
    public IncludedInShift: boolean;

    /// <summary>
    /// Shift break duration
    /// </summary>
    public IsTimeFlexible: boolean;

    constructor(shiftBreakId: string, shiftId: string, shiftBreakTypeId: number, shiftBreakTypeDisplay: string, shiftBreakStartTime: Date, shiftBreakDuration: Date, includedInShift: boolean, isTimeFlexible: boolean) {
        this.ShiftBreakId = shiftBreakId;
        this.ShiftId = shiftId;
        this.ShiftBreakTypeId = shiftBreakTypeId;
        this.ShiftBreakTypeDisplay = shiftBreakTypeDisplay;
        this.ShiftBreakStartTime = shiftBreakStartTime;
        this.ShiftBreakDuration = shiftBreakDuration;
        this.IncludedInShift = includedInShift;
        this.IsTimeFlexible = isTimeFlexible;
    }

    static newShiftBreakDTO(): ShiftBreakDTO {
        return new ShiftBreakDTO('', '', 0, '', new Date(), new Date(), false, false);
    }
}