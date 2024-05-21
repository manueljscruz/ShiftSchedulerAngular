import { ShiftBreakDTO } from "./ShiftBreakDTO";

export class ShiftDTO
{
    /// <summary>
    /// Shift identifier
    /// </summary>
    public ShiftId: string;

    /// <summary>
    /// Shift Owner - Entity identifier
    /// </summary>
    public EntityId: string;

    /// <summary>
    /// Shift name
    /// </summary>
    public ShiftName: string;

    /// <summary>
    /// Shift alias
    /// </summary>
    public ShiftAlias: string;

    /// <summary>
    /// Shift description
    /// </summary>
    public ShiftDescription: string;

    /// <summary>
    /// Shift start time
    /// </summary>
    public ShiftStartHour: Date;

    /// <summary>
    /// Shift duration
    /// </summary>
    public ShiftDuration: Date;

    /// <summary>
    /// Shift breaks
    /// </summary>
    public ShiftBreaks: ShiftBreakDTO[];

        
    constructor(shiftId: string, entityId: string, shiftName: string, shiftAlias: string, shiftDescription: string, shiftStartHour: Date, shiftDuration: Date, shiftBreaks: ShiftBreakDTO[])
    {
        this.ShiftId = shiftId;
        this.EntityId = entityId;
        this.ShiftName = shiftName;
        this.ShiftAlias = shiftAlias;
        this.ShiftDescription = shiftDescription;
        this.ShiftStartHour = shiftStartHour;
        this.ShiftDuration = shiftDuration;
        this.ShiftBreaks = shiftBreaks;
    }

    public static newShiftDTO(): ShiftDTO
    {
        return new ShiftDTO('', '', '', '', '', new Date(), new Date(), []);
    }
}