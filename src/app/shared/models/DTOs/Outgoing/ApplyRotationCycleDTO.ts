export class ApplyRotationCycleDTO {
    entityId: string;
    workerId: string;
    isBot : boolean;
    cycleStartDate: Date;
    cycleEndDate: Date;

    constructor(entityId: string, workerId: string, isBot: boolean, cycleStartDate: Date, cycleEndDate: Date) {
        this.entityId = entityId;
        this.workerId = workerId;
        this.isBot = isBot;
        this.cycleStartDate = cycleStartDate;
        this.cycleEndDate = cycleEndDate;
    }

}
