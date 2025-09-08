export class AbsenceApprovalDecisionDTO {
    entityWorkerAbsenceId: string;
    absenceDecision: boolean;
    absenceDecisionSignature: string;
    decisionTimezoneId: string;
    languageCode: string;
    
    constructor(entityWorkerAbsenceId: string, absenceDecision: boolean, absenceDecisionSignature: string, decisionTimezoneId: string, languageCode: string) {
        this.entityWorkerAbsenceId = entityWorkerAbsenceId;
        this.absenceDecision = absenceDecision;
        this.absenceDecisionSignature = absenceDecisionSignature;
        this.decisionTimezoneId = decisionTimezoneId;
        this.languageCode = languageCode;
    }
}