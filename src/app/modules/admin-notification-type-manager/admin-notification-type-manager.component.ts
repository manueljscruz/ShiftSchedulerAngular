import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ADMIN_NOTIFICATION_TYPES_URL } from '../../shared/constants/APIPathsConstants';
import { ADMIN_TYPE_CONFIGS } from '../admin-type-manager/AdminTypeConfigs';
import { AdminLanguageService } from '../../core/services/api/admin/AdminLanguageService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import {
    AdminNotificationTypeFormDialogComponent,
    NotificationTypeFormDialogData
} from './admin-notification-type-form-dialog/admin-notification-type-form-dialog.component';

export interface NotificationTypeItem {
    id: number;
    notificationTypeCode: string;
    localizations: { localizationId: number; localizationCode: string; displayValue: string; messageTemplate: string }[];
}

@Component({
    selector: 'app-admin-notification-type-manager',
    templateUrl: './admin-notification-type-manager.component.html',
    styleUrl: './admin-notification-type-manager.component.css'
})
export class AdminNotificationTypeManagerComponent implements OnInit {

    items: NotificationTypeItem[] = [];
    isLoading = false;
    readonly displayedColumns = ['notificationTypeCode', 'localizations', 'actions'];
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
            this.items = await firstValueFrom(this.http.get<NotificationTypeItem[]>(ADMIN_NOTIFICATION_TYPES_URL));
        } catch {
            this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Failed to load Notification Types.'));
        } finally {
            this.isLoading = false;
        }
    }

    async openForm(item?: NotificationTypeItem): Promise<void> {
        const languages = await this.languageService.getAll();
        const data: NotificationTypeFormDialogData = { languages, item };

        const ref = this.dialog.open(AdminNotificationTypeFormDialogComponent, {
            data,
            width: '580px',
            disableClose: true
        });

        ref.afterClosed().subscribe(async (dto) => {
            if (!dto) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.post(ADMIN_NOTIFICATION_TYPES_URL, dto));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, item ? 'Notification Type updated' : 'Notification Type created'));
                await this.loadItems();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Operation failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    confirmDelete(item: NotificationTypeItem): void {
        const ref = this.dialog.open(GenericWarningDialogComponent, {
            data: {
                warningTitle: 'Delete Notification Type',
                warningMessage: `Are you sure you want to delete "${item.notificationTypeCode}"? This action cannot be undone.`,
                isDeleteWarning: true
            }
        });

        ref.afterClosed().subscribe(async (confirmed: boolean) => {
            if (!confirmed) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.delete(`${ADMIN_NOTIFICATION_TYPES_URL}/${item.id}`));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, 'Notification Type deleted'));
                await this.loadItems();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Delete failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    getLocalizationSummary(item: NotificationTypeItem): string {
        if (!item.localizations?.length) return '—';
        return item.localizations.map(l => l.localizationCode.toUpperCase()).join(', ');
    }
}
