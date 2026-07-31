import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { BaseViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { BillingSummaryDTO, PaymentMethodSummaryDTO } from '../../shared/models/DTOs/Incoming/billing/BillingSummaryDTO';
import { BillingService } from '../../core/services/api/BillingService';
import { AuthService } from '../../core/services/api/AuthService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { AddPaymentMethodDialogComponent } from './add-payment-method-dialog/add-payment-method-dialog.component';
import { ChangePlanDialogComponent } from './change-plan-dialog/change-plan-dialog.component';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';

@Component({
  selector: 'entity-billing',
  templateUrl: './entity-billing.component.html',
  styleUrl: './entity-billing.component.css',
})
export class EntityBillingComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public loggedUser: UserDTO | null = null;

  public currentEntityId: string = '';

  public summary: BillingSummaryDTO | null = null;

  public isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private billingService: BillingService,
    private authService: AuthService,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const entityId = params.get('entityId') || '';
        if (entityId) {
          this.currentEntityId = entityId;
          this.loadViewData();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadViewData(): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.loggedUser = currentUser;
    }

    if (!this.loggedUser) {
      return;
    }

    this.isLoading = true;
    this.loadingScreenService.changeLoadingState(true);

    const request = new BaseViewModelRequestDTO(this.currentEntityId, this.loggedUser.userId);
    const summary = await this.billingService.getSummary(request);

    this.loadingScreenService.changeLoadingState(false);
    this.isLoading = false;

    if (summary == null) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Error loading billing data'));
      return;
    }

    this.summary = summary;
  }

  openAddPaymentMethodDialog(): void {
    const dialogRef = this.dialog.open(AddPaymentMethodDialogComponent, {
      width: '500px',
      data: { entityId: this.currentEntityId }
    });

    dialogRef.componentInstance.closeOp.subscribe((result: PaymentMethodSummaryDTO | null) => {
      if (result && this.summary) {
        if (result.isDefault) {
          this.summary.paymentMethods.forEach(pm => pm.isDefault = false);
        }
        this.summary.paymentMethods.push(result);
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Payment method added successfully.'));
      }
      dialogRef.close();
    });
  }

  openChangePlanDialog(): void {
    if (!this.summary) {
      return;
    }

    const dialogRef = this.dialog.open(ChangePlanDialogComponent, {
      width: '600px',
      data: { entityId: this.currentEntityId, paymentMethods: this.summary.paymentMethods }
    });

    dialogRef.componentInstance.closeOp.subscribe(async (subscribed: boolean) => {
      dialogRef.close();
      if (subscribed) {
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Subscription updated successfully.'));
        await this.loadViewData();
      }
    });

    dialogRef.componentInstance.requestAddPaymentMethod.subscribe(() => {
      dialogRef.close();
      this.openAddPaymentMethodDialog();
    });
  }

  async setDefaultPaymentMethod(paymentMethod: PaymentMethodSummaryDTO): Promise<void> {
    if (!this.summary || paymentMethod.isDefault) {
      return;
    }

    this.loadingScreenService.changeLoadingState(true);
    const success = await this.billingService.setDefaultPaymentMethod(this.currentEntityId, paymentMethod.paymentMethodId);
    this.loadingScreenService.changeLoadingState(false);

    if (success) {
      this.summary.paymentMethods.forEach(pm => pm.isDefault = pm.paymentMethodId === paymentMethod.paymentMethodId);
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Default payment method updated.'));
    }
    else {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Failed to update the default payment method.'));
    }
  }

  openRemovePaymentMethodDialog(paymentMethod: PaymentMethodSummaryDTO): void {
    const dialogRef = this.dialog.open(GenericWarningDialogComponent, {
      width: '500px',
      data: {
        warningTitle: 'Remove payment method',
        warningMessage: `Are you sure you want to remove the card ending in ${paymentMethod.lastFourDigits}?`,
        isDeleteWarning: true
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.removePaymentMethod(paymentMethod);
      }
    });
  }

  private async removePaymentMethod(paymentMethod: PaymentMethodSummaryDTO): Promise<void> {
    if (!this.summary) {
      return;
    }

    this.loadingScreenService.changeLoadingState(true);
    const success = await this.billingService.removePaymentMethod(this.currentEntityId, paymentMethod.paymentMethodId);
    this.loadingScreenService.changeLoadingState(false);

    if (success) {
      const index = this.summary.paymentMethods.findIndex(pm => pm.paymentMethodId === paymentMethod.paymentMethodId);
      if (index >= 0) {
        this.summary.paymentMethods.splice(index, 1);
      }
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Payment method removed.'));
    }
    else {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Failed to remove the payment method.'));
    }
  }

  get membersProgress(): number {
    if (!this.summary || !this.summary.usage.toScale || !this.summary.usage.membersIncluded) {
      return 0;
    }
    return Math.min(100, (this.summary.usage.membersUsed / this.summary.usage.membersIncluded) * 100);
  }

  get generationsProgress(): number {
    if (!this.summary || !this.summary.usage.generationsIncluded) {
      return 0;
    }
    return Math.min(100, (this.summary.usage.generationsUsed / this.summary.usage.generationsIncluded) * 100);
  }
}
