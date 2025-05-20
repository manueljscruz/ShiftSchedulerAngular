import { AddShiftBreakDTO } from "./AddShiftBreakDTO";

export class AddShiftDTO{
    EntityId: string;
    ShiftName: string;
    ShiftAlias: string;
    ShiftDescription: string;
    ShiftStartHour: Date;
    ShiftDuration: Date;
    ShiftColorHex: string;
    ShiftBreakDTOs: AddShiftBreakDTO[];

    constructor(EntityId: string, ShiftName: string, ShiftAlias: string, ShiftDescription: string, ShiftStartHour: Date, ShiftDuration: Date, ShiftColorHex: string, ShiftBreakDTOs: AddShiftBreakDTO[]){
        this.EntityId = EntityId;
        this.ShiftName = ShiftName;
        this.ShiftAlias = ShiftAlias;
        this.ShiftDescription = ShiftDescription;
        this.ShiftStartHour = ShiftStartHour;
        this.ShiftDuration = ShiftDuration;
        this.ShiftColorHex = ShiftColorHex;
        this.ShiftBreakDTOs = ShiftBreakDTOs;
    }
}