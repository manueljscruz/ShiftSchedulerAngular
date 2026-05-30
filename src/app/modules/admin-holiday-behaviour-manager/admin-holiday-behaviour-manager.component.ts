import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ADMIN_HOLIDAY_BEHAVIOURS_URL } from '../../shared/constants/APIPathsConstants';
import { ADMIN_TYPE_CONFIGS } from '../admin-type-manager/AdminTypeConfigs';
import { AdminLanguageService } from '../../core/services/api/admin/AdminLanguageService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import {
    AdminHolidayBehaviourFormDialogComponent,
    HolidayBehaviourFormDialogData
} from './admin-holiday-behaviour-form-dialog/admin-holiday-behaviour-form-dialog.component';

export interface HolidayBehaviourItem {
    id: number;
    internalName: string;
    allowsOperatingTimes: boolean;
    localizations: { localizationId: number; localizationCode: string; displayValue: string }[];
}

@Component({
    selector: 'app-admin-holiday-behaviour-manager',
    templateUrl: './admin-holiday-behaviour-manager.component.html',
    styleUrl: './admin-holiday-behaviour-manager.component.css'
})
export class AdminHolidayBehaviourManagerComponent implements OnInit {

    items: HolidayBehaviourItem[] = [];
    isLoading = false;
    readonly displayedColumns = ['internalName', 'allowsOperatingTimes', 'localizations', 'actions'];
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
            this.items = await firstValueFrom(this.http.get<HolidayBehaviourItem[]>(ADMIN_HOLIDAY_BEHAVIOURS_URL));
        } catch {
            this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Failed to load Holiday Behaviours.'));
        } finally {
            this.isLoading = false;
        }
    }

    async openForm(item?: HolidayBehaviourItem): Promise<void> {
        const languages = await this.languageService.getAll();
        const data: HolidayBehaviourFormDialogData = { languages, item };

        const ref = this.dialog.open(AdminHolidayBehaviourFormDialogComponent, {
            data,
            width: '540px',
            disableClose: true
        });

        ref.afterClosed().subscribe(async (dto) => {
            if (!dto) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.post(ADMIN_HOLIDAY_BEHAVIOURS_URL, dto));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, item ? 'Holiday Behaviour updated' : 'Holiday Behaviour created'));
                await this.loadItems();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Operation failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    confirmDelete(item: HolidayBehaviourItem): void {
        const ref = this.dialog.open(GenericWarningDialogComponent, {
            data: {
                warningTitle: 'Delete Holiday Behaviour',
                warningMessage: `Are you sure you want to delete "${item.internalName}"? This action cannot be undone.`,
                isDeleteWarning: true
            }
        });

        ref.afterClosed().subscribe(async (confirmed: boolean) => {
            if (!confirmed) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.delete(`${ADMIN_HOLIDAY_BEHAVIOURS_URL}/${item.id}`));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, 'Holiday Behaviour deleted'));
                await this.loadItems();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Delete failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    getLocalizationSummary(item: HolidayBehaviourItem): string {
        if (!item.localizations?.length) return '—';
        return item.localizations.map(l => `${l.localizationCode.toUpperCase()}: ${l.displayValue}`).join(' · ');
    }
}
