import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { BaseViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { BillingSummaryDTO } from '../../shared/models/DTOs/Incoming/billing/BillingSummaryDTO';
import { BillingService } from '../../core/services/api/BillingService';
import { AuthService } from '../../core/services/api/AuthService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { SubscriptionHistoryDialogComponent } from './subscription-history-dialog/subscription-history-dialog.component';

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

  async openHistoryDialog(): Promise<void> {
    if (!this.loggedUser) {
      return;
    }

    this.loadingScreenService.changeLoadingState(true);
    const request = new BaseViewModelRequestDTO(this.currentEntityId, this.loggedUser.userId);
    const history = await this.billingService.getHistory(request);
    this.loadingScreenService.changeLoadingState(false);

    const dialogRef = this.dialog.open(SubscriptionHistoryDialogComponent, {
      width: '700px',
      data: { history }
    });

    dialogRef.componentInstance.closeOp.subscribe((result: boolean) => {
      if (result) {
        dialogRef.close();
      }
    });
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
