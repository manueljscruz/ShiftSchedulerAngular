export interface AvailablePlanDTO {
    subscriptionPlanDurationPriceId: string;
    subscriptionPlanTypeId: number;
    subscriptionPlanTypeName: string;
    subscriptionPlanTypeDescription: string;
    subscriptionDurationTypeId: number;
    subscriptionDurationTypeName: string;
    durationInDays: number;
    basePrice: number;
    toScale: boolean;
    scaleRequirement: number;
    pricePerExtraMember: number;
    includedGenerations: number;
    pricePerExtraGeneration: number;
}
