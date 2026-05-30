import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import {
    ADMIN_HOLIDAY_CATALOGS_URL,
    ADMIN_TYPES_GET_ALL_URL,
    ADMIN_HOLIDAY_BEHAVIOURS_URL
} from '../../shared/constants/APIPathsConstants';
import { ADMIN_TYPE_CONFIGS } from '../admin-type-manager/AdminTypeConfigs';
import { AdminLanguageService } from '../../core/services/api/admin/AdminLanguageService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import {
    AdminHolidayCatalogFormDialogComponent,
    HolidayCatalogFormDialogData
} from './admin-holiday-catalog-form-dialog/admin-holiday-catalog-form-dialog.component';

export interface HolidayCatalogItem {
    id: number;
    holidayName: string;
    holidayDescription: string;
    holidayTypeId: number;
    holidayTypeName: string;
    holidayBehaviourId: number;
    holidayBehaviourName: string;
    recurrenceDay: number;
    recurrenceMonth: number;
    isRecurring: boolean;
    isActive: boolean;
    localizations: { localizationId: number; localizationCode: string; localizedName: string; localizedDescription: string }[];
}

export interface SimpleDropdownOption { id: number; internalName: string; }

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

@Component({
    selector: 'app-admin-holiday-catalog-manager',
    templateUrl: './admin-holiday-catalog-manager.component.html',
    styleUrl: './admin-holiday-catalog-manager.component.css'
})
export class AdminHolidayCatalogManagerComponent implements OnInit {

    items: HolidayCatalogItem[] = [];
    holidayTypes: SimpleDropdownOption[] = [];
    holidayBehaviours: SimpleDropdownOption[] = [];
    isLoading = false;
    readonly displayedColumns = ['holidayName', 'type', 'recurrence', 'active', 'localizations', 'actions'];
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
            const [items, typesResult, behaviours] = await Promise.all([
                firstValueFrom(this.http.get<HolidayCatalogItem[]>(ADMIN_HOLIDAY_CATALOGS_URL)),
                firstValueFrom(this.http.get<{ hasColors: boolean; items: SimpleDropdownOption[] }>(
                    ADMIN_TYPES_GET_ALL_URL.replace('{typeKey}', 'holiday-types')
                )),
                firstValueFrom(this.http.get<SimpleDropdownOption[]>(ADMIN_HOLIDAY_BEHAVIOURS_URL))
            ]);
            this.items = items;
            this.holidayTypes = typesResult.items;
            this.holidayBehaviours = behaviours;
        } catch {
            this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Failed to load Holiday Catalogs.'));
        } finally {
            this.isLoading = false;
        }
    }

    async openForm(item?: HolidayCatalogItem): Promise<void> {
        const languages = await this.languageService.getAll();
        const data: HolidayCatalogFormDialogData = {
            languages,
            holidayTypes: this.holidayTypes,
            holidayBehaviours: this.holidayBehaviours,
            item
        };

        const ref = this.dialog.open(AdminHolidayCatalogFormDialogComponent, {
            data,
            width: '600px',
            disableClose: true
        });

        ref.afterClosed().subscribe(async (dto) => {
            if (!dto) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.post(ADMIN_HOLIDAY_CATALOGS_URL, dto));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, item ? 'Holiday Catalog updated' : 'Holiday Catalog created'));
                await this.loadData();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Operation failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    confirmDelete(item: HolidayCatalogItem): void {
        const ref = this.dialog.open(GenericWarningDialogComponent, {
            data: {
                warningTitle: 'Delete Holiday Catalog',
                warningMessage: `Are you sure you want to delete "${item.holidayName}"? This action cannot be undone.`,
                isDeleteWarning: true
            }
        });

        ref.afterClosed().subscribe(async (confirmed: boolean) => {
            if (!confirmed) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.delete(`${ADMIN_HOLIDAY_CATALOGS_URL}/${item.id}`));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, 'Holiday Catalog deleted'));
                await this.loadData();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Delete failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    formatRecurrence(item: HolidayCatalogItem): string {
        if (!item.isRecurring) return 'One-time';
        const month = MONTH_NAMES[item.recurrenceMonth - 1] ?? item.recurrenceMonth;
        return `${item.recurrenceDay} ${month}`;
    }
}
