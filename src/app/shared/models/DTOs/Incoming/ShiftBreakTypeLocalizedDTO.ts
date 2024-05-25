export class ShiftBreakTypeLocalizedDTO {
    shiftBreakTypeId: number;
    shiftBreakTypeLocalizedName: string;

    constructor(id: number, name: string) {
        this.shiftBreakTypeId = id;
        this.shiftBreakTypeLocalizedName = name;
    }
}