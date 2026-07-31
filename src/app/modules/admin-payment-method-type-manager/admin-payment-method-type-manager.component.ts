import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ADMIN_PAYMENT_METHOD_TYPES_URL } from '../../shared/constants/APIPathsConstants';
import { ADMIN_TYPE_CONFIGS } from '../admin-type-manager/AdminTypeConfigs';
import { AdminLanguageService } from '../../core/services/api/admin/AdminLanguageService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import {
    AdminPaymentMethodTypeFormDialogComponent,
    PaymentMethodTypeFormDialogData
} from './admin-payment-method-type-form-dialog/admin-payment-method-type-form-dialog.component';

export interface PaymentMethodTypeItem {
    id: number;
    name: string;
    isActive: boolean;
    countryCodes: string[];
    localizations: { localizationId: number; localizationCode: string; displayValue: string }[];
}

@Component({
    selector: 'app-admin-payment-method-type-manager',
    templateUrl: './admin-payment-method-type-manager.component.html',
    styleUrl: './admin-payment-method-type-manager.component.css'
})
export class AdminPaymentMethodTypeManagerComponent implements OnInit {

    items: PaymentMethodTypeItem[] = [];
    isLoading = false;
    readonly displayedColumns = ['name', 'isActive', 'countries', 'localizations', 'actions'];
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
            this.items = await firstValueFrom(this.http.get<PaymentMethodTypeItem[]>(ADMIN_PAYMENT_METHOD_TYPES_URL));
        } catch {
            this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Failed to load Payment Method Types.'));
        } finally {
            this.isLoading = false;
        }
    }

    async openForm(item?: PaymentMethodTypeItem): Promise<void> {
        const languages = await this.languageService.getAll();
        const data: PaymentMethodTypeFormDialogData = { languages, item };

        const ref = this.dialog.open(AdminPaymentMethodTypeFormDialogComponent, {
            data,
            width: '580px',
            disableClose: true
        });

        ref.afterClosed().subscribe(async (dto) => {
            if (!dto) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.post(ADMIN_PAYMENT_METHOD_TYPES_URL, dto));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, item ? 'Payment Method Type updated' : 'Payment Method Type created'));
                await this.loadItems();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Operation failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    confirmDelete(item: PaymentMethodTypeItem): void {
        const ref = this.dialog.open(GenericWarningDialogComponent, {
            data: {
                warningTitle: 'Delete Payment Method Type',
                warningMessage: `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
                isDeleteWarning: true
            }
        });

        ref.afterClosed().subscribe(async (confirmed: boolean) => {
            if (!confirmed) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.delete(`${ADMIN_PAYMENT_METHOD_TYPES_URL}/${item.id}`));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, 'Payment Method Type deleted'));
                await this.loadItems();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Delete failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    getLocalizationSummary(item: PaymentMethodTypeItem): string {
        if (!item.localizations?.length) return '—';
        return item.localizations.map(l => l.localizationCode.toUpperCase()).join(', ');
    }

    getCountriesSummary(item: PaymentMethodTypeItem): string {
        if (!item.countryCodes?.length) return '—';
        return item.countryCodes.join(', ');
    }
}
