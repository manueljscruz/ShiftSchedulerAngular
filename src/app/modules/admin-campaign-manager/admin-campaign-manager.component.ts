import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import {
    ADMIN_CAMPAIGNS_URL,
    ADMIN_SUBSCRIPTION_PLAN_DURATION_PRICES_URL
} from '../../shared/constants/APIPathsConstants';
import { ADMIN_TYPE_CONFIGS } from '../admin-type-manager/AdminTypeConfigs';
import { AdminLanguageService } from '../../core/services/api/admin/AdminLanguageService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import { SubscriptionPlanDurationPriceItem } from '../admin-subscription-plan-duration-price-manager/admin-subscription-plan-duration-price-manager.component';
import {
    AdminCampaignFormDialogComponent,
    CampaignFormDialogData,
    SubscriptionPlanDurationPriceOption
} from './admin-campaign-form-dialog/admin-campaign-form-dialog.component';

export interface CampaignItem {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string | null;
    promotionPercent: number;
    isActive: boolean;
    maxRedemptions: number;
    redemptionCount: number;
    couponCode: string;
    eligibleSubscriptionPlanDurationPriceIds: string[];
    localizations: { localizationId: number; localizationCode: string; nameDisplayValue: string; descriptionDisplayValue: string }[];
}

@Component({
    selector: 'app-admin-campaign-manager',
    templateUrl: './admin-campaign-manager.component.html',
    styleUrl: './admin-campaign-manager.component.css'
})
export class AdminCampaignManagerComponent implements OnInit {

    items: CampaignItem[] = [];
    subscriptionPlanDurationPrices: SubscriptionPlanDurationPriceItem[] = [];
    isLoading = false;
    readonly displayedColumns = ['name', 'dates', 'promotion', 'redemptions', 'active', 'actions'];
    readonly allConfigs = ADMIN_TYPE_CONFIGS;

    constructor(
        private http: HttpClient,
        private languageService: AdminLanguageService,
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
            const [items, plans] = await Promise.all([
                firstValueFrom(this.http.get<CampaignItem[]>(ADMIN_CAMPAIGNS_URL)),
                firstValueFrom(this.http.get<SubscriptionPlanDurationPriceItem[]>(ADMIN_SUBSCRIPTION_PLAN_DURATION_PRICES_URL))
            ]);
            this.items = items;
            this.subscriptionPlanDurationPrices = plans;
        } catch {
            this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Failed to load Campaigns.'));
        } finally {
            this.isLoading = false;
        }
    }

    async openForm(item?: CampaignItem): Promise<void> {
        const languages = await this.languageService.getAll();
        const planOptions: SubscriptionPlanDurationPriceOption[] = this.subscriptionPlanDurationPrices.map(p => ({
            id: p.id,
            label: `${p.subscriptionPlanTypeName} / ${p.subscriptionDurationTypeName}`
        }));
        const data: CampaignFormDialogData = { languages, planOptions, item };

        const ref = this.dialog.open(AdminCampaignFormDialogComponent, {
            data,
            width: '640px',
            disableClose: true
        });

        ref.afterClosed().subscribe(async (dto) => {
            if (!dto) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.post(ADMIN_CAMPAIGNS_URL, dto));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, item ? 'Campaign updated' : 'Campaign created'));
                await this.loadData();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Operation failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    confirmDelete(item: CampaignItem): void {
        const ref = this.dialog.open(GenericWarningDialogComponent, {
            data: {
                warningTitle: 'Delete Campaign',
                warningMessage: `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
                isDeleteWarning: true
            }
        });

        ref.afterClosed().subscribe(async (confirmed: boolean) => {
            if (!confirmed) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.delete(`${ADMIN_CAMPAIGNS_URL}/${item.id}`));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, 'Campaign deleted'));
                await this.loadData();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Delete failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    formatDates(item: CampaignItem): string {
        const start = new Date(item.startDate).toLocaleDateString('en-GB');
        if (!item.endDate) return `${start} → ongoing`;
        const end = new Date(item.endDate).toLocaleDateString('en-GB');
        return `${start} → ${end}`;
    }
}
