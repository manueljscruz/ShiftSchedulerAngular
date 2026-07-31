import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ADMIN_SUBSCRIPTION_DURATION_TYPES_URL } from '../../shared/constants/APIPathsConstants';
import { ADMIN_TYPE_CONFIGS } from '../admin-type-manager/AdminTypeConfigs';
import { AdminLanguageService } from '../../core/services/api/admin/AdminLanguageService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import {
    AdminSubscriptionDurationTypeFormDialogComponent,
    SubscriptionDurationTypeFormDialogData
} from './admin-subscription-duration-type-form-dialog/admin-subscription-duration-type-form-dialog.component';

export interface SubscriptionDurationTypeItem {
    id: number;
    name: string;
    durationInDays: number;
    appliesPromo: boolean;
    promoPercentage: number;
    localizations: { localizationId: number; localizationCode: string; displayValue: string }[];
}

@Component({
    selector: 'app-admin-subscription-duration-type-manager',
    templateUrl: './admin-subscription-duration-type-manager.component.html',
    styleUrl: './admin-subscription-duration-type-manager.component.css'
})
export class AdminSubscriptionDurationTypeManagerComponent implements OnInit {

    items: SubscriptionDurationTypeItem[] = [];
    isLoading = false;
    readonly displayedColumns = ['name', 'durationInDays', 'promo', 'localizations', 'actions'];
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
            this.items = await firstValueFrom(this.http.get<SubscriptionDurationTypeItem[]>(ADMIN_SUBSCRIPTION_DURATION_TYPES_URL));
        } catch {
            this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Failed to load Subscription Duration Types.'));
        } finally {
            this.isLoading = false;
        }
    }

    async openForm(item?: SubscriptionDurationTypeItem): Promise<void> {
        const languages = await this.languageService.getAll();
        const data: SubscriptionDurationTypeFormDialogData = { languages, item };

        const ref = this.dialog.open(AdminSubscriptionDurationTypeFormDialogComponent, {
            data,
            width: '580px',
            disableClose: true
        });

        ref.afterClosed().subscribe(async (dto) => {
            if (!dto) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.post(ADMIN_SUBSCRIPTION_DURATION_TYPES_URL, dto));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, item ? 'Subscription Duration Type updated' : 'Subscription Duration Type created'));
                await this.loadItems();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Operation failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    confirmDelete(item: SubscriptionDurationTypeItem): void {
        const ref = this.dialog.open(GenericWarningDialogComponent, {
            data: {
                warningTitle: 'Delete Subscription Duration Type',
                warningMessage: `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
                isDeleteWarning: true
            }
        });

        ref.afterClosed().subscribe(async (confirmed: boolean) => {
            if (!confirmed) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.delete(`${ADMIN_SUBSCRIPTION_DURATION_TYPES_URL}/${item.id}`));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, 'Subscription Duration Type deleted'));
                await this.loadItems();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Delete failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    getLocalizationSummary(item: SubscriptionDurationTypeItem): string {
        if (!item.localizations?.length) return '—';
        return item.localizations.map(l => l.localizationCode.toUpperCase()).join(', ');
    }
}
