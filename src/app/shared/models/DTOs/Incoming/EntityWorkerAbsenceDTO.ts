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
    isFullDay: boolean;
    // UI Only
    absenceStartDateTime : string;
    absenceEndDateTime : string;
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
        decisionTimezoneId: string,
        isFullDay: boolean,
        absenceStartDateTime: string,
        absenceEndDateTime: string) {
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
        this.isFullDay = isFullDay;
        this.absenceStartDateTime = absenceStartDateTime;
        this.absenceEndDateTime = absenceEndDateTime;
    }

    public static newEntityWorkerAbsenceDTO(): EntityWorkerAbsenceDTO{
        return new EntityWorkerAbsenceDTO('','','',0,'','',new Date(),new Date(),0,'',false,'', '', new Date(), 0, '', true, '', '');
    }
}