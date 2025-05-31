import { ShiftBreakDTO } from "./ShiftBreakDTO";

export class ShiftDTO
{
    /// <summary>
    /// Shift identifier
    /// </summary>
    public shiftId: string;

    /// <summary>
    /// Shift Owner - Entity identifier
    /// </summary>
    public entityId: string;

    /// <summary>
    /// Shift name
    /// </summary>
    public shiftName: string;

    /// <summary>
    /// Shift alias
    /// </summary>
    public shiftAlias: string;

    /// <summary>
    /// Shift description
    /// </summary>
    public shiftDescription: string;

    /// <summary>
    /// Shift start time
    /// </summary>
    public shiftStartHour: Date;

    /// <summary>
    /// Shift duration
    /// </summary>
    public shiftDuration: Date;

    /// <summary>
    /// Shift color
    /// </summary>
    public shiftColorHex : string;

    /// <summary>
    /// Shift breaks
    /// </summary>
    public shiftBreakDTOs: ShiftBreakDTO[];

    public isSelected: boolean = false;

    public readonly type = 'ShiftDTO';

    constructor(shiftId: string, entityId: string, shiftName: string, shiftAlias: string, shiftDescription: string, shiftStartHour: Date, shiftDuration: Date, shiftColorHex: string, shiftBreaks: ShiftBreakDTO[], isSelected: boolean = false)
    {
        this.shiftId = shiftId;
        this.entityId = entityId;
        this.shiftName = shiftName;
        this.shiftAlias = shiftAlias;
        this.shiftDescription = shiftDescription;
        this.shiftStartHour = shiftStartHour;
        this.shiftDuration = shiftDuration;
        this.shiftColorHex = shiftColorHex;
        this.shiftBreakDTOs = shiftBreaks;
        this.isSelected = isSelected;
    }

    public static newShiftDTO(): ShiftDTO
    {
        return new ShiftDTO('', '', '', '', '', new Date(), new Date(), '000000', []);
    }
}