import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillingService } from '../../../core/services/api/BillingService';
import { AvailablePlanDTO } from '../../../shared/models/DTOs/Incoming/billing/AvailablePlanDTO';
import { PaymentMethodSummaryDTO } from '../../../shared/models/DTOs/Incoming/billing/BillingSummaryDTO';
import { SubscribeRequestDTO } from '../../../shared/models/DTOs/Outgoing/billing/SubscribeRequestDTO';
import { CANCEL_ICON } from '../../../shared/constants/IconNamesConstants';

export interface PlanTierGroup {
  subscriptionPlanTypeId: number;
  subscriptionPlanTypeName: string;
  subscriptionPlanTypeDescription: string;
  durations: AvailablePlanDTO[];
}

@Component({
  selector: 'change-plan-dialog',
  templateUrl: './change-plan-dialog.component.html',
  styleUrl: './change-plan-dialog.component.css'
})
export class ChangePlanDialogComponent implements OnInit {

  CANCEL_ICON = CANCEL_ICON;

  private entityId: string = '';

  paymentMethods: PaymentMethodSummaryDTO[] = [];

  tierGroups: PlanTierGroup[] = [];

  isLoading: boolean = true;

  isSubmitting: boolean = false;

  errorMessage: string = '';

  selectedPlanId: string = '';

  selectedPaymentMethodId: string = '';

  couponCode: string = '';

  @Output() closeOp = new EventEmitter<boolean>();

  @Output() requestAddPaymentMethod = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private billingService: BillingService) {
    this.entityId = data.entityId;
    this.paymentMethods = data.paymentMethods || [];
  }

  async ngOnInit(): Promise<void> {
    const defaultPaymentMethod = this.paymentMethods.find(pm => pm.isDefault);
    if (defaultPaymentMethod) {
      this.selectedPaymentMethodId = defaultPaymentMethod.paymentMethodId;
    }
    else if (this.paymentMethods.length > 0) {
      this.selectedPaymentMethodId = this.paymentMethods[0].paymentMethodId;
    }

    const plans = await this.billingService.getAvailablePlans();
    this.tierGroups = this.groupByTier(plans);
    this.isLoading = false;
  }

  private groupByTier(plans: AvailablePlanDTO[]): PlanTierGroup[] {
    const groups: PlanTierGroup[] = [];

    for (const plan of plans) {
      let group = groups.find(g => g.subscriptionPlanTypeId === plan.subscriptionPlanTypeId);
      if (!group) {
        group = {
          subscriptionPlanTypeId: plan.subscriptionPlanTypeId,
          subscriptionPlanTypeName: plan.subscriptionPlanTypeName,
          subscriptionPlanTypeDescription: plan.subscriptionPlanTypeDescription,
          durations: []
        };
        groups.push(group);
      }
      group.durations.push(plan);
    }

    return groups;
  }

  addPaymentMethod(): void {
    this.requestAddPaymentMethod.emit();
  }

  async submit(): Promise<void> {
    if (!this.selectedPlanId || !this.selectedPaymentMethodId) {
      this.errorMessage = 'Please select a plan and a payment method.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const request = new SubscribeRequestDTO(this.selectedPlanId, this.selectedPaymentMethodId, this.couponCode || null);
    const success = await this.billingService.subscribe(this.entityId, request);

    this.isSubmitting = false;

    if (!success) {
      this.errorMessage = 'Failed to update the subscription. Please check the coupon code and try again.';
      return;
    }

    this.closeOp.emit(true);
  }

  cancel(): void {
    this.closeOp.emit(false);
  }
}
