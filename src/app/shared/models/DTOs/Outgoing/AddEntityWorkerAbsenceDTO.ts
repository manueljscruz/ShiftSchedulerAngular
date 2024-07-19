export class AddEntityWorkerAbsenceDTO{
    entityId: string;
    workerId: string;
    absenceTypeId: number;
    observations: string;
    absenceStartDate: Date;
    absenceEndDate: Date;
    languageCode: string;
    
    constructor(entityId: string, workerId: string, absenceTypeId: number, observations: string, absenceStartDate: Date, absenceEndDate: Date, languageCode: string){
        this.entityId = entityId;
        this.workerId = workerId;
        this.absenceTypeId = absenceTypeId;
        this.observations = observations;
        this.absenceStartDate = absenceStartDate;
        this.absenceEndDate = absenceEndDate;
        this.languageCode = languageCode;
    }
}