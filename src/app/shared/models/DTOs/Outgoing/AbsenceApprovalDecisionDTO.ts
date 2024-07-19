export class AbsenceApprovalDecisionDTO {
    entityWorkerAbsenceId: string;
    absenceDecision: boolean;
    absenceDecisionSignature: string;
    
    constructor(entityWorkerAbsenceId: string, absenceDecision: boolean, absenceDecisionSignature: string){
        this.entityWorkerAbsenceId = entityWorkerAbsenceId;
        this.absenceDecision = absenceDecision;
        this.absenceDecisionSignature = absenceDecisionSignature;
    }
}