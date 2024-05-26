export class ShiftBreakDTO
{
    /// <summary>
    /// Shift break id
    /// </summary>
    public shiftBreakId: string ;

    /// <summary>
    /// Shift identifier 
    public shiftParentId: string;

    /// <summary>
    /// Shift break type identifier
    /// </summary>
    public shiftBreakTypeId : number;

    /// <summary>
    /// Shift break type localized name
    /// </summary>
    public shiftBreakTypeDisplay : string;

    /// <summary>
    /// Shift break start time
    /// </summary>
    public shiftBreakStartTime : Date;

    /// <summary>
    /// Shift break end time
    /// </summary>
    public shiftBreakDuration : Date;

    /// <summary>
    /// Shift break duration
    /// </summary>
    public includedInShift: boolean;

    /// <summary>
    /// Shift break duration
    /// </summary>
    public isTimeFlexible: boolean;

    public readonly type = 'ShiftBreakDTO';
    /*
    /// <summary>
    /// Formatted start time
    /// </summary>
    public get FormattedStartTime(): string {
        let splitTime = this.shiftBreakStartTime.toString().split(':');
        let strStartTime = splitTime[0] + ':' + splitTime[1];
        return strStartTime;
    }

    /// <summary>
    /// Formatted end time
    /// </summary>
    public get FormattedDuration(): string {
        let splitTime = this.shiftBreakDuration.toString().split(':');
        let hours = parseInt(splitTime[0]);
        let minutes = parseInt(splitTime[1]);
        return (hours > 0 ? hours + ' hour' + (hours > 1 ? 's' : '') : '') + ' ' + (minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's' : '') : '');
    }
    */

    constructor(shiftBreakId: string, shiftId: string, shiftBreakTypeId: number, shiftBreakTypeDisplay: string, shiftBreakStartTime: Date, shiftBreakDuration: Date, includedInShift: boolean, isTimeFlexible: boolean) {
        this.shiftBreakId = shiftBreakId;
        this.shiftParentId = shiftId;
        this.shiftBreakTypeId = shiftBreakTypeId;
        this.shiftBreakTypeDisplay = shiftBreakTypeDisplay;
        this.shiftBreakStartTime = shiftBreakStartTime;
        this.shiftBreakDuration = shiftBreakDuration;
        this.includedInShift = includedInShift;
        this.isTimeFlexible = isTimeFlexible;
    }

    static newShiftBreakDTO(): ShiftBreakDTO {
        return new ShiftBreakDTO('', '', 0, '', new Date(), new Date(), false, false);
    }
}