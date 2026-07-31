import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { BillingSummaryDTO } from '../../../shared/models/DTOs/Incoming/billing/BillingSummaryDTO';
import { SubscriptionHistoryItemDTO } from '../../../shared/models/DTOs/Incoming/billing/SubscriptionHistoryItemDTO';
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
    /// Get the subscription history for an entity
    /// </summary>
    async getHistory(request: BaseViewModelRequestDTO): Promise<SubscriptionHistoryItemDTO[]> {
        let history: SubscriptionHistoryItemDTO[] = [];

        try {
            history = await this.http.get<SubscriptionHistoryItemDTO[]>(`${ENTITY_BILLING_URL}/${request.entityId}/history`).toPromise() as SubscriptionHistoryItemDTO[];
        }
        catch (error: any) {
            console.error('Error fetching subscription history:', error.message);
        }

        return history;
    }
}
