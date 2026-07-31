export class SubscribeRequestDTO {
    subscriptionPlanDurationPriceId: string;
    paymentMethodId: string;
    couponCode: string | null;

    constructor(subscriptionPlanDurationPriceId: string, paymentMethodId: string, couponCode: string | null) {
        this.subscriptionPlanDurationPriceId = subscriptionPlanDurationPriceId;
        this.paymentMethodId = paymentMethodId;
        this.couponCode = couponCode;
    }
}
