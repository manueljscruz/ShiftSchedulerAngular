export class EntityWorkerAbsenceDTO{
    entityWorkerAbsenceId: string;
    entityId: string;
    workerId: string;
    absenceTypeId: number;
    absenceTypeDisplayValue: string;
    observations: string;
    absenceStartDate: Date;
    absenceEndDate: Date;
    offsetMinutes: number;
    timezoneId: string;
    absenceApproved: boolean;
    absenceDecisionOwner: string;
    absenceApproverName: string;
    absenceDateDecision: Date;
    absenceDateDecisionOffset: number;
    decisionTimezoneId : string;
    // UI Only
    absenceDecisionBeingEdited : boolean = false;

    constructor(entityWorkerAbsenceId: string, 
        entityId: string, 
        workerId: string, 
        absenceTypeId: number, 
        absenceTypeDisplayValue: string, 
        observations: string, 
        absenceStartDate: Date, 
        absenceEndDate: Date, 
        offsetMinutes: number,
        timezoneId: string,
        absenceApproved: boolean, 
        absenceDecisionOwner: string, 
        absenceApproverName: string, 
        absenceDateDecision: Date,
        absenceDateDecisionOffset: number,
        decisionTimezoneId: string){
        this.entityWorkerAbsenceId = entityWorkerAbsenceId;
        this.entityId = entityId;
        this.workerId = workerId;
        this.absenceTypeId = absenceTypeId;
        this.absenceTypeDisplayValue = absenceTypeDisplayValue;
        this.observations = observations;
        this.absenceStartDate = absenceStartDate;
        this.absenceEndDate = absenceEndDate;
        this.offsetMinutes = offsetMinutes;
        this.timezoneId = timezoneId;
        this.absenceApproved = absenceApproved;
        this.absenceDecisionOwner = absenceDecisionOwner;
        this.absenceApproverName = absenceApproverName;
        this.absenceDateDecision = absenceDateDecision;
        this.absenceDateDecisionOffset = absenceDateDecisionOffset;
        this.decisionTimezoneId = decisionTimezoneId;
    }

    public static newEntityWorkerAbsenceDTO(): EntityWorkerAbsenceDTO{
        return new EntityWorkerAbsenceDTO('','','',0,'','',new Date(),new Date(),0,'',false,'', '', new Date(), 0, '');
    }
}