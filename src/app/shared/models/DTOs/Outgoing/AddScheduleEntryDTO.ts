export class AddScheduleEntryDTO {
    shiftId: string;
    scheduleStartDate: Date;
    languageCode: string;

    constructor(shiftId: string, scheduleStartDate: Date, languageCode: string) {
        this.shiftId = shiftId;
        this.scheduleStartDate = scheduleStartDate;
        this.languageCode = languageCode;
    }
}