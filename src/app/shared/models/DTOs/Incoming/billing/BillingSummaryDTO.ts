export interface CurrentSubscriptionPlanDTO {
    entitySubscriptionPlanId: string;
    subscriptionPlanTypeId: number;
    subscriptionPlanTypeName: string;
    subscriptionDurationTypeId: number;
    subscriptionDurationTypeName: string;
    basePrice: number;
    startDate: string;
    endDate: string;
    status: string;
}

export interface BillingUsageDTO {
    membersUsed: number;
    toScale: boolean;
    membersIncluded: number | null;
    generationsUsed: number;
    generationsIncluded: number;
}

export interface PaymentMethodSummaryDTO {
    paymentMethodId: string;
    paymentMethodTypeId: number;
    paymentMethodTypeName: string;
    cardBrand: string;
    lastFourDigits: string;
    isDefault: boolean;
}

export interface BillingSummaryDTO {
    currentPlan: CurrentSubscriptionPlanDTO;
    usage: BillingUsageDTO;
    estimatedAmount: number;
    paymentMethods: PaymentMethodSummaryDTO[];
}
