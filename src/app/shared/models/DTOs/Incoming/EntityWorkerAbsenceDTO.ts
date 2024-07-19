export class EntityWorkerAbsenceDTO{
    entityWorkerAbsenceId: string;
    entityId: string;
    workerId: string;
    absenceTypeId: number;
    absenceTypeDisplayValue: string;
    observations: string;
    absenceStartDate: Date;
    absenceEndDate: Date;
    absenceApproved: boolean;
    absenceDecisionOwner: string;
    absenceApproverName: string;
    absenceDateDecision: Date;

    constructor(entityWorkerAbsenceId: string, entityId: string, workerId: string, absenceTypeId: number, absenceTypeDisplayValue: string, observations: string, absenceStartDate: Date, absenceEndDate: Date, absenceApproved: boolean, absenceDecisionOwner: string, absenceApproverName: string, absenceDateDecision: Date){
        this.entityWorkerAbsenceId = entityWorkerAbsenceId;
        this.entityId = entityId;
        this.workerId = workerId;
        this.absenceTypeId = absenceTypeId;
        this.absenceTypeDisplayValue = absenceTypeDisplayValue;
        this.observations = observations;
        this.absenceStartDate = absenceStartDate;
        this.absenceEndDate = absenceEndDate;
        this.absenceApproved = absenceApproved;
        this.absenceDecisionOwner = absenceDecisionOwner;
        this.absenceApproverName = absenceApproverName;
        this.absenceDateDecision = absenceDateDecision;
    }

    public static newEntityWorkerAbsenceDTO(): EntityWorkerAbsenceDTO{
        return new EntityWorkerAbsenceDTO('','','',0,'','',new Date(),new Date(),false,'', '', new Date());
    }
}