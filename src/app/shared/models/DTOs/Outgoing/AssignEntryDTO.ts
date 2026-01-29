export class AssignEntryDTO {
    workerId: string;
    entityId: string;
    isBot: boolean;
    scheduleId: string;
    shiftId: string;
    date: Date;

    constructor(workerId: string, entityId: string, isBot:boolean, scheduleId: string, shiftId: string, date: Date) {
        this.workerId = workerId;
        this.entityId = entityId;
        this.isBot = isBot;
        this.scheduleId = scheduleId;
        this.shiftId = shiftId;
        this.date = date;
    }
}
