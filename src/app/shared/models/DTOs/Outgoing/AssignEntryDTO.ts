export class AssignEntryDTO {
    workerId: string;
    entityId: string;
    languageCode: string;
    isBot: boolean;
    scheduleId: string;
    shiftId: string;
    date: Date;

    constructor(workerId: string, entityId: string, languageCode: string, isBot:boolean, scheduleId: string, shiftId: string, date: Date) {
        this.workerId = workerId;
        this.entityId = entityId;
        this.languageCode = languageCode;
        this.isBot = isBot;
        this.scheduleId = scheduleId;
        this.shiftId = shiftId;
        this.date = date;
    }
}