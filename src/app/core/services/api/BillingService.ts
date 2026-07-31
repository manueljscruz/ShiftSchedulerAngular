import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { BillingSummaryDTO, PaymentMethodSummaryDTO } from '../../../shared/models/DTOs/Incoming/billing/BillingSummaryDTO';
import { SetupIntentDTO } from '../../../shared/models/DTOs/Incoming/billing/SetupIntentDTO';
import { ENTITY_BILLING_URL } from '../../../shared/constants/APIPathsConstants';

@Injectable({
    providedIn: 'root'
})
export class BillingService {

    constructor(private http: HttpClient) {
    }

    /// <summary>
    /// Get the billing summary (current plan, usage, estimate, payment methods) for an entity
    /// </summary>
    async getSummary(request: BaseViewModelRequestDTO): Promise<BillingSummaryDTO | null> {
        let summary: BillingSummaryDTO | null = null;

        try {
            summary = await this.http.get<BillingSummaryDTO>(`${ENTITY_BILLING_URL}/${request.entityId}/summary`).toPromise() as BillingSummaryDTO;
        }
        catch (error: any) {
            console.error('Error fetching billing summary:', error.message);
        }

        return summary;
    }

    /// <summary>
    /// Creates a Stripe Setup Intent for the entity, returning the client secret used by Stripe Elements
    /// </summary>
    async createSetupIntent(entityId: string): Promise<SetupIntentDTO | null> {
        let setupIntent: SetupIntentDTO | null = null;

        try {
            setupIntent = await this.http.post<SetupIntentDTO>(`${ENTITY_BILLING_URL}/${entityId}/payment-methods/setup-intent`, {}).toPromise() as SetupIntentDTO;
        }
        catch (error: any) {
            console.error('Error creating setup intent:', error.message);
        }

        return setupIntent;
    }

    /// <summary>
    /// Confirms a Stripe payment method (already tokenized by Stripe Elements) and stores it for the entity
    /// </summary>
    async confirmPaymentMethod(entityId: string, stripePaymentMethodId: string): Promise<PaymentMethodSummaryDTO | null> {
        let paymentMethod: PaymentMethodSummaryDTO | null = null;

        try {
            paymentMethod = await this.http.post<PaymentMethodSummaryDTO>(`${ENTITY_BILLING_URL}/${entityId}/payment-methods`, { stripePaymentMethodId }).toPromise() as PaymentMethodSummaryDTO;
        }
        catch (error: any) {
            console.error('Error confirming payment method:', error.message);
        }

        return paymentMethod;
    }

    /// <summary>
    /// Marks a payment method as the default for the entity
    /// </summary>
    async setDefaultPaymentMethod(entityId: string, paymentMethodId: string): Promise<boolean> {
        try {
            await this.http.post(`${ENTITY_BILLING_URL}/${entityId}/payment-methods/${paymentMethodId}/default`, {}).toPromise();
            return true;
        }
        catch (error: any) {
            console.error('Error setting default payment method:', error.message);
            return false;
        }
    }

    /// <summary>
    /// Removes (deactivates) a payment method for the entity
    /// </summary>
    async removePaymentMethod(entityId: string, paymentMethodId: string): Promise<boolean> {
        try {
            await this.http.delete(`${ENTITY_BILLING_URL}/${entityId}/payment-methods/${paymentMethodId}`).toPromise();
            return true;
        }
        catch (error: any) {
            console.error('Error removing payment method:', error.message);
            return false;
        }
    }
}
