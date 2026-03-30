import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityService } from '../../../core/services/api/EntityService';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { ImportCandidatesDTO, ShiftSimpleDTO, EntityRuleSimpleDTO, EntityHolidaySimpleDTO } from '../../models/DTOs/Incoming/ImportCandidatesDTO';
import { ImportConfigDTO } from '../../models/DTOs/Outgoing/ImportConfigDTO';
import { SnackbarUIModel } from '../../models/UI/SnackbarUIModel';

export interface ImportConfigDialogData {
  entityId: string;
  type: 'shifts' | 'rules' | 'holidays';
}

@Component({
  selector: 'app-import-config-dialog',
  templateUrl: './import-config-dialog.component.html',
  styleUrl: './import-config-dialog.component.css'
})
export class ImportConfigDialogComponent implements OnInit {

  @Output() onImportComplete = new EventEmitter<boolean>();

  isLoading: boolean = false;
  candidates: ImportCandidatesDTO = { shifts: [], rules: [], holidays: [] };
  selectedIds: string[] = [];
  selectAll: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ImportConfigDialogData,
    private entityService: EntityService,
    private loadingSpinnerService: LoadingSpinnerManagerService,
    private snackbarManagerService: SnackbarManagerService
  ) {}

  ngOnInit(): void {
    this.loadCandidates();
  }

  private async loadCandidates(): Promise<void> {
    this.isLoading = true;
    const response = await this.entityService.getImportCandidates(this.data.entityId);
    this.isLoading = false;
    if (response.success && response.result) {
      this.candidates = response.result as ImportCandidatesDTO;
    }
  }

  getItems(): any[] {
    switch (this.data.type) {
      case 'shifts': return this.candidates.shifts;
      case 'rules': return this.candidates.rules;
      case 'holidays': return this.candidates.holidays;
      default: return [];
    }
  }

  getItemId(item: any): string {
    switch (this.data.type) {
      case 'shifts': return (item as ShiftSimpleDTO).shiftId;
      case 'rules': return (item as EntityRuleSimpleDTO).entityRuleId;
      case 'holidays': return (item as EntityHolidaySimpleDTO).entityHolidayId;
      default: return '';
    }
  }

  getItemLabel(item: any): string {
    switch (this.data.type) {
      case 'shifts': return (item as ShiftSimpleDTO).shiftName;
      case 'rules': return (item as EntityRuleSimpleDTO).ruleTypeName;
      case 'holidays': return (item as EntityHolidaySimpleDTO).holidayDisplayName;
      default: return '';
    }
  }

  onItemToggle(id: string, checked: boolean): void {
    if (checked) {
      if (!this.selectedIds.includes(id)) {
        this.selectedIds.push(id);
      }
    } else {
      this.selectedIds = this.selectedIds.filter(i => i !== id);
    }
    const items = this.getItems();
    this.selectAll = items.length > 0 && items.every(item => this.selectedIds.includes(this.getItemId(item)));
  }

  onSelectAll(checked: boolean): void {
    this.selectAll = checked;
    if (checked) {
      this.selectedIds = this.getItems().map(item => this.getItemId(item));
    } else {
      this.selectedIds = [];
    }
  }

  isSelected(id: string): boolean {
    return this.selectedIds.includes(id);
  }

  async confirm(): Promise<void> {
    if (this.selectedIds.length === 0) return;

    this.loadingSpinnerService.changeLoadingState(true);

    const dto = new ImportConfigDTO();
    dto.destinationEntityId = this.data.entityId;
    if (this.data.type === 'shifts') dto.shiftIds = this.selectedIds;
    else if (this.data.type === 'rules') dto.ruleIds = this.selectedIds;
    else dto.holidayIds = this.selectedIds;

    const response = await this.entityService.importConfigFromParent(dto);
    this.loadingSpinnerService.changeLoadingState(false);

    if (response.success) {
      const count = response.result as number ?? 0;
      this.snackbarManagerService.showSuccessSnackbar(
        new SnackbarUIModel(5, `${count} item(s) imported successfully.`)
      );
      this.onImportComplete.emit(true);
    } else {
      this.snackbarManagerService.showFailSnackbar(
        new SnackbarUIModel(5, response.message || 'Import failed.')
      );
    }
  }
}
