export class AddScheduleEntryDTO {
    shiftId: string;
    scheduleStartDate: Date;

    constructor(shiftId: string, scheduleStartDate: Date) {
        this.shiftId = shiftId;
        this.scheduleStartDate = scheduleStartDate;
    }
}
