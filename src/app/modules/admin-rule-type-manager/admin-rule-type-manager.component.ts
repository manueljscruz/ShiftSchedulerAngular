import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ADMIN_RULE_TYPES_URL, ADMIN_TYPES_GET_ALL_URL } from '../../shared/constants/APIPathsConstants';
import { ADMIN_TYPE_CONFIGS } from '../admin-type-manager/AdminTypeConfigs';
import { AdminLanguageService } from '../../core/services/api/admin/AdminLanguageService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import {
    AdminRuleTypeFormDialogComponent,
    RuleTypeFormDialogData
} from './admin-rule-type-form-dialog/admin-rule-type-form-dialog.component';

export interface RuleTypeItem {
    id: number;
    internalName: string;
    description: string;
    multipleSpecification: boolean;
    isSpecValuesBoolean: boolean;
    orderNo: number;
    businessAspectIds: number[];
    localizations: { localizationId: number; localizationCode: string; displayValue: string; descriptionValue: string }[];
}

export interface BusinessAspectOption {
    id: number;
    internalName: string;
}

@Component({
    selector: 'app-admin-rule-type-manager',
    templateUrl: './admin-rule-type-manager.component.html',
    styleUrl: './admin-rule-type-manager.component.css'
})
export class AdminRuleTypeManagerComponent implements OnInit {

    items: RuleTypeItem[] = [];
    businessAspects: BusinessAspectOption[] = [];
    isLoading = false;
    readonly displayedColumns = ['orderNo', 'internalName', 'flags', 'businessAspects', 'localizations', 'actions'];
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
            const [items, aspectsResult] = await Promise.all([
                firstValueFrom(this.http.get<RuleTypeItem[]>(ADMIN_RULE_TYPES_URL)),
                firstValueFrom(this.http.get<{ hasColors: boolean; items: BusinessAspectOption[] }>(
                    ADMIN_TYPES_GET_ALL_URL.replace('{typeKey}', 'business-aspects')
                ))
            ]);
            this.items = items;
            this.businessAspects = aspectsResult.items;
        } catch {
            this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Failed to load Rule Types.'));
        } finally {
            this.isLoading = false;
        }
    }

    async openForm(item?: RuleTypeItem): Promise<void> {
        const languages = await this.languageService.getAll();
        const data: RuleTypeFormDialogData = { languages, businessAspects: this.businessAspects, item };

        const ref = this.dialog.open(AdminRuleTypeFormDialogComponent, {
            data,
            width: '600px',
            disableClose: true
        });

        ref.afterClosed().subscribe(async (dto) => {
            if (!dto) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.post(ADMIN_RULE_TYPES_URL, dto));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, item ? 'Rule Type updated' : 'Rule Type created'));
                await this.loadData();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Operation failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    confirmDelete(item: RuleTypeItem): void {
        const ref = this.dialog.open(GenericWarningDialogComponent, {
            data: {
                warningTitle: 'Delete Rule Type',
                warningMessage: `Are you sure you want to delete "${item.internalName}"? This action cannot be undone.`,
                isDeleteWarning: true
            }
        });

        ref.afterClosed().subscribe(async (confirmed: boolean) => {
            if (!confirmed) return;
            this.spinner.changeLoadingState(true);
            try {
                await firstValueFrom(this.http.delete(`${ADMIN_RULE_TYPES_URL}/${item.id}`));
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, 'Rule Type deleted'));
                await this.loadData();
            } catch {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Delete failed. Please try again.'));
            } finally {
                this.spinner.changeLoadingState(false);
            }
        });
    }

    getAspectNames(item: RuleTypeItem): string {
        if (!item.businessAspectIds?.length) return '—';
        return item.businessAspectIds
            .map(id => this.businessAspects.find(a => a.id === id)?.internalName ?? id)
            .join(', ');
    }

    getLocalizationSummary(item: RuleTypeItem): string {
        if (!item.localizations?.length) return '—';
        return item.localizations.map(l => `${l.localizationCode.toUpperCase()}: ${l.displayValue}`).join(' · ');
    }
}
