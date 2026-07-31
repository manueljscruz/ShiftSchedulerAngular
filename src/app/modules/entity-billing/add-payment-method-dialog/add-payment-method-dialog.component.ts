import { Component, ElementRef, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment';
import { BillingService } from '../../../core/services/api/BillingService';
import { PaymentMethodSummaryDTO } from '../../../shared/models/DTOs/Incoming/billing/BillingSummaryDTO';
import { CANCEL_ICON } from '../../../shared/constants/IconNamesConstants';

@Component({
  selector: 'add-payment-method-dialog',
  templateUrl: './add-payment-method-dialog.component.html',
  styleUrl: './add-payment-method-dialog.component.css'
})
export class AddPaymentMethodDialogComponent implements OnInit, OnDestroy {

  CANCEL_ICON = CANCEL_ICON;

  @ViewChild('cardElementContainer') cardElementContainer!: ElementRef;

  @Output() closeOp = new EventEmitter<PaymentMethodSummaryDTO | null>();

  private entityId: string = '';
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardElement: StripeCardElement | null = null;
  private clientSecret: string = '';

  isLoading: boolean = true;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private billingService: BillingService) {
    this.entityId = data.entityId;
  }

  async ngOnInit(): Promise<void> {
    const setupIntent = await this.billingService.createSetupIntent(this.entityId);

    if (!setupIntent) {
      this.errorMessage = 'Unable to start payment method setup.';
      this.isLoading = false;
      return;
    }

    this.clientSecret = setupIntent.clientSecret;
    this.stripe = await loadStripe(environment.stripePublishableKey);

    if (!this.stripe) {
      this.errorMessage = 'Unable to load the payment provider.';
      this.isLoading = false;
      return;
    }

    this.elements = this.stripe.elements({ clientSecret: this.clientSecret });
    this.cardElement = this.elements.create('card');
    this.isLoading = false;

    setTimeout(() => {
      if (this.cardElement && this.cardElementContainer) {
        this.cardElement.mount(this.cardElementContainer.nativeElement);
      }
    });
  }

  ngOnDestroy(): void {
    this.cardElement?.unmount();
  }

  async submit(): Promise<void> {
    if (!this.stripe || !this.cardElement) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const result = await this.stripe.confirmCardSetup(this.clientSecret, {
      payment_method: { card: this.cardElement }
    });

    if (result.error || !result.setupIntent?.payment_method) {
      this.errorMessage = result.error?.message ?? 'Failed to confirm card.';
      this.isSubmitting = false;
      return;
    }

    const stripePaymentMethodId = typeof result.setupIntent.payment_method === 'string'
      ? result.setupIntent.payment_method
      : result.setupIntent.payment_method.id;

    const savedPaymentMethod = await this.billingService.confirmPaymentMethod(this.entityId, stripePaymentMethodId);

    this.isSubmitting = false;

    if (!savedPaymentMethod) {
      this.errorMessage = 'Card confirmed, but we could not save it. Please try again.';
      return;
    }

    this.closeOp.emit(savedPaymentMethod);
  }

  cancel(): void {
    this.closeOp.emit(null);
  }
}
