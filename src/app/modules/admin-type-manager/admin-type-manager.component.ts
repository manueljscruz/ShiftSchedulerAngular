import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminTypeService } from '../../core/services/api/admin/AdminTypeService';
import { AdminLanguageService } from '../../core/services/api/admin/AdminLanguageService';
import { AdminTypeItemDTO } from '../../shared/models/DTOs/admin/AdminTypeItemDTO';
import { AdminUpsertTypeDTO } from '../../shared/models/DTOs/admin/AdminUpsertTypeDTO';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import { AdminTypeFormDialogComponent, AdminTypeFormDialogData } from './admin-type-form-dialog/admin-type-form-dialog.component';
import { getTypeConfig, ADMIN_TYPE_CONFIGS } from './AdminTypeConfigs';
import { TypeManagerConfig } from './TypeManagerConfig';

@Component({
    selector: 'app-admin-type-manager',
    templateUrl: './admin-type-manager.component.html',
    styleUrl: './admin-type-manager.component.css'
})
export class AdminTypeManagerComponent implements OnInit {

    config: TypeManagerConfig | undefined;
    items: AdminTypeItemDTO[] = [];
    hasColors: boolean = false;
    isLoading: boolean = false;
    typeKey: string = '';

    readonly allConfigs = ADMIN_TYPE_CONFIGS;
    readonly displayedColumns = ['internalName', 'localizations', 'actions'];
    readonly displayedColumnsWithColor = ['internalName', 'color', 'localizations', 'actions'];

    constructor(
        private route: ActivatedRoute,
        private typeService: AdminTypeService,
        private languageService: AdminLanguageService,
        private dialog: MatDialog,
        private snackbar: SnackbarManagerService,
        private spinner: LoadingSpinnerManagerService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const key = params.get('typeKey');
            if (key) {
                this.typeKey = key;
                this.config = getTypeConfig(key);
                this.loadItems();
            }
        });
    }

    get columns(): string[] {
        return this.hasColors ? this.displayedColumnsWithColor : this.displayedColumns;
    }

    async loadItems(): Promise<void> {
        this.isLoading = true;
        try {
            const result = await this.typeService.getAll(this.typeKey);
            this.hasColors = result.hasColors;
            this.items = result.items;
        } finally {
            this.isLoading = false;
        }
    }

    async openForm(item?: AdminTypeItemDTO): Promise<void> {
        const languages = await this.languageService.getAll();

        const dialogData: AdminTypeFormDialogData = {
            config: this.config!,
            hasColors: this.hasColors,
            languages,
            item
        };

        const ref = this.dialog.open(AdminTypeFormDialogComponent, {
            data: dialogData,
            width: '520px',
            disableClose: true
        });

        ref.afterClosed().subscribe(async (dto: AdminUpsertTypeDTO | null) => {
            if (!dto) return;

            this.spinner.changeLoadingState(true);
            const id = await this.typeService.upsert(this.typeKey, dto);
            this.spinner.changeLoadingState(false);

            if (id > 0) {
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3,
                    item ? `${this.config?.label} updated` : `${this.config?.label} created`
                ));
                await this.loadItems();
            } else {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Operation failed. Please try again.'));
            }
        });
    }

    confirmDelete(item: AdminTypeItemDTO): void {
        const ref = this.dialog.open(GenericWarningDialogComponent, {
            data: {
                warningTitle: `Delete ${this.config?.label}`,
                warningMessage: `Are you sure you want to delete "${item.internalName}"? This action cannot be undone.`,
                isDeleteWarning: true
            }
        });

        ref.afterClosed().subscribe(async (confirmed: boolean) => {
            if (!confirmed) return;

            this.spinner.changeLoadingState(true);
            const success = await this.typeService.delete(this.typeKey, item.id);
            this.spinner.changeLoadingState(false);

            if (success) {
                this.snackbar.showSuccessSnackbar(new SnackbarUIModel(3, `${this.config?.label} deleted`));
                await this.loadItems();
            } else {
                this.snackbar.showFailSnackbar(new SnackbarUIModel(4, 'Delete failed. Please try again.'));
            }
        });
    }

    getLocalizationSummary(item: AdminTypeItemDTO): string {
        if (!item.localizations?.length) return '—';
        return item.localizations
            .map(l => `${l.localizationCode.toUpperCase()}: ${l.displayValue}`)
            .join(' · ');
    }
}
