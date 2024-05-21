export class ShiftBreakTypeLocalizedDTO {
    ShiftBreakTypeId: number;
    ShiftBreakTypeLocalizedName: string;

    constructor(id: number, name: string) {
        this.ShiftBreakTypeId = id;
        this.ShiftBreakTypeLocalizedName = name;
    }
}