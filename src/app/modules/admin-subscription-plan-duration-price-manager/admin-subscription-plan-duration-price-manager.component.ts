import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import {
    ADMIN_SUBSCRIPTION_PLAN_DURATION_PRICES_URL,
    ADMIN_SUBSCRIPTION_PLAN_TYPES_URL,
    ADMIN_SUBSCRIPTION_DURATION_TYPES_URL
} from '../../shared/constants/APIPathsConstants';
import { ADMIN_TYPE_CONFIGS } from '../admin-type-manager/AdminTypeConfigs';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import {
    AdminSubscriptionPlanDurationPriceFormDialogComponent,
    SubscriptionPlanDurationPriceFormDialogData
} from './admin-subscription-plan-duration-price-form-dialog/admin-subscription-plan-duration-price-form-dialog.component';

export interface SubscriptionPlanDurationPriceItem {
    id: string;
    subscriptionPlanTypeId: number;
    subscriptionPlanTypeName: string;
    subscriptionDurationTypeId: number;
    subscriptionDurationTypeName: string;
    basePrice: number;
    toScale: boolean;
    scaleRequirement: number;
    pricePerExtraMember: number;
    includedGenerations: number;
    pricePerExtraGeneration: number;
    isPublicPlan: boolean;
    isActive: boolean;
}

export interface NamedOption { id: number; name: string; }

@Component({
    selector: 'app-admin-subscription-plan-duration-price-manager',
    templateUrl: './admin-subscription-plan-duration-price-manager.component.html',
    styleUrl: './admin-subscription-plan-duration-price-manager.component.css'
})
export class AdminSubscriptionPlanDurationPriceManagerComponent implements OnInit {

    items: SubscriptionPlanDurationPriceItem[] = [];
    planTypes: NamedOption[] = [];
    durationTypes: NamedOption[] = [];
    isLoading = false;
    readonly displayedColumns = ['plan', 'basePrice', 'quotas', 'flags', 'actions'];
    readonly allConfigs = ADMIN_TYPE_CONFIGS;

    constructor(
        private http: HttpClient,
        private dialog: MatDialog,
        private snackbar: SnackbarManagerService,
        private spinner: LoadingSpinnerManagerService
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    async loadData(): Promise<void> {
        this.isLoading = true;
        try {
            const [items, planTypes, durationTypes] = await Promise.all([
                firstValueFrom(this.http.get<SubscriptionPlanDurationPriceItem[]>(ADMIN_SUBSCRIPTION_PLAN_DURATION_PRICES_URL)),
                firstValueFrom(this.http.get<NamedOption[]>(ADMIN_SUBSCRIPTION_PLAN_TYPES_URL)),
                firstValueFrom(this.http.get<NamedOption[]>(ADMIN_SUBSCRIPTION_DURATION_TYPES_URL))
            ]);
            this.items = items;
            this.planTypes = planTypes;
            this.durationTypes = durationTypes;
        } catch {
            this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Failed to load Subscription Prices.'));
        } finally {
            this.isLoading = false;
        }
    }

    async openForm(item?: SubscriptionPlanDurationPriceItem): Promise<void> {
        const data: SubscriptionPlanDurationPriceFormDialogData = {
            planTypes: this.planTypes,
            durationTypes: this.durationTypes,
            item
        };

        const ref = this.dialog.open(AdminSubscriptionPlanDurationPriceFormDialogComponent, {
            data,
            width: '600px',
            disableClose: true
        });

        ref.afterClosed().subscribe(async (dto) => {
            if (!dto) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.post(ADMIN_SUBSCRIPTION_PLAN_DURATION_PRICES_URL, dto));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, item ? 'Subscription Price updated' : 'Subscription Price created'));
                await this.loadData();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Operation failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    confirmDelete(item: SubscriptionPlanDurationPriceItem): void {
        const ref = this.dialog.open(GenericWarningDialogComponent, {
            data: {
                warningTitle: 'Delete Subscription Price',
                warningMessage: `Are you sure you want to delete "${item.subscriptionPlanTypeName} / ${item.subscriptionDurationTypeName}"? This action cannot be undone.`,
                isDeleteWarning: true
            }
        });

        ref.afterClosed().subscribe(async (confirmed: boolean) => {
            if (!confirmed) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.delete(`${ADMIN_SUBSCRIPTION_PLAN_DURATION_PRICES_URL}/${item.id}`));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, 'Subscription Price deleted'));
                await this.loadData();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Delete failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }
}
