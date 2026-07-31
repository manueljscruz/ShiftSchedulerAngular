import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ADMIN_SUBSCRIPTION_PLAN_TYPES_URL } from '../../shared/constants/APIPathsConstants';
import { ADMIN_TYPE_CONFIGS } from '../admin-type-manager/AdminTypeConfigs';
import { AdminLanguageService } from '../../core/services/api/admin/AdminLanguageService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import {
    AdminSubscriptionPlanTypeFormDialogComponent,
    SubscriptionPlanTypeFormDialogData
} from './admin-subscription-plan-type-form-dialog/admin-subscription-plan-type-form-dialog.component';

export interface SubscriptionPlanTypeItem {
    id: number;
    name: string;
    description: string;
    localizations: { localizationId: number; localizationCode: string; nameDisplayValue: string; descriptionDisplayValue: string }[];
}

@Component({
    selector: 'app-admin-subscription-plan-type-manager',
    templateUrl: './admin-subscription-plan-type-manager.component.html',
    styleUrl: './admin-subscription-plan-type-manager.component.css'
})
export class AdminSubscriptionPlanTypeManagerComponent implements OnInit {

    items: SubscriptionPlanTypeItem[] = [];
    isLoading = false;
    readonly displayedColumns = ['name', 'localizations', 'actions'];
    readonly allConfigs = ADMIN_TYPE_CONFIGS;

    constructor(
        private http: HttpClient,
        private languageService: AdminLanguageService,
        private dialog: MatDialog,
        private snackbar: SnackbarManagerService,
        private spinner: LoadingSpinnerManagerService
    ) {}

    ngOnInit(): void {
        this.loadItems();
    }

    async loadItems(): Promise<void> {
        this.isLoading = true;
        try {
            this.items = await firstValueFrom(this.http.get<SubscriptionPlanTypeItem[]>(ADMIN_SUBSCRIPTION_PLAN_TYPES_URL));
        } catch {
            this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Failed to load Subscription Plan Types.'));
        } finally {
            this.isLoading = false;
        }
    }

    async openForm(item?: SubscriptionPlanTypeItem): Promise<void> {
        const languages = await this.languageService.getAll();
        const data: SubscriptionPlanTypeFormDialogData = { languages, item };

        const ref = this.dialog.open(AdminSubscriptionPlanTypeFormDialogComponent, {
            data,
            width: '580px',
            disableClose: true
        });

        ref.afterClosed().subscribe(async (dto) => {
            if (!dto) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.post(ADMIN_SUBSCRIPTION_PLAN_TYPES_URL, dto));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, item ? 'Subscription Plan Type updated' : 'Subscription Plan Type created'));
                await this.loadItems();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Operation failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    confirmDelete(item: SubscriptionPlanTypeItem): void {
        const ref = this.dialog.open(GenericWarningDialogComponent, {
            data: {
                warningTitle: 'Delete Subscription Plan Type',
                warningMessage: `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
                isDeleteWarning: true
            }
        });

        ref.afterClosed().subscribe(async (confirmed: boolean) => {
            if (!confirmed) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.delete(`${ADMIN_SUBSCRIPTION_PLAN_TYPES_URL}/${item.id}`));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, 'Subscription Plan Type deleted'));
                await this.loadItems();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Delete failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    getLocalizationSummary(item: SubscriptionPlanTypeItem): string {
        if (!item.localizations?.length) return '—';
        return item.localizations.map(l => l.localizationCode.toUpperCase()).join(', ');
    }
}
