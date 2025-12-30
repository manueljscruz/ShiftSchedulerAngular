export class EntityFinancialStatusDTO{
    planId: string;
    planDisplayName: string;
    isOnFreePlan: boolean;
    currentPeriodEndDate: Date;

    constructor(planId: string, planDisplayName: string, isOnFreePlan: boolean, currentPeriodEndDate: Date){
        this.planId = planId;
        this.planDisplayName = planDisplayName;
        this.isOnFreePlan = isOnFreePlan;
        this.currentPeriodEndDate = currentPeriodEndDate;
    }

    static newEntityFinancialStatusDTO() : EntityFinancialStatusDTO {
        return new EntityFinancialStatusDTO(
            '',
            '',
            true,
            new Date()
        );
    }
}