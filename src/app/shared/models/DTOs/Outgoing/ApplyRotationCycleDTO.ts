export class ApplyRotationCycleDTO {
    entityId: string;
    workerId: string;
    isBot : boolean;
    languageCode: string;
    cycleStartDate: Date;
    cycleEndDate: Date;

    constructor(entityId: string, workerId: string, isBot: boolean, languageCode: string, cycleStartDate: Date, cycleEndDate: Date) {
        this.entityId = entityId;
        this.workerId = workerId;
        this.isBot = isBot;
        this.languageCode = languageCode;
        this.cycleStartDate = cycleStartDate;
        this.cycleEndDate = cycleEndDate;
    }
    
}