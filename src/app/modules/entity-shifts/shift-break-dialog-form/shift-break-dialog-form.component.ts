import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ADD_ICON, SAVE_ICON } from '../../../shared/constants/IconNamesConstants';
import { ShiftBreakDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakDTO';
import { ShiftBreakTypeLocalizedDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakTypeLocalizedDTO';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { ShiftBreakTemplateDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakTemplateDTO';

@Component({
  selector: 'shift-break-dialog-form',
  templateUrl: './shift-break-dialog-form.component.html',
  styleUrl: './shift-break-dialog-form.component.css'
})
export class ShiftBreakDialogFormComponent {

  /// <summary>
  /// Current shift id if applicable
  /// </summary>
  public currentShiftId: string = '';

  /// <summary>
  /// Is this an adding shift break form
  /// </summary>
  public isAddingShiftBreak: boolean = false;

  /// <summary>
  /// Determines which tab is selected
  /// 0 - Options Tab
  /// 1 - Templates Tab
  /// 2 - Shift Breaks Form Tab
  /// </summary>
  public selectedTabIndex: number = 0;

  /// <summary>
  /// Execute action text : Save or Add
  /// </summary>
  executeActionText: string = '';

  /// <summary>
  /// Execute action icon : Save or Add
  /// </summary>
  executeActionIcon: string = '';

  /// <summary>
  /// Shift break DTO Instance to be worked on
  /// </summary>
  shiftBreakDTO: ShiftBreakDTO = ShiftBreakDTO.newShiftBreakDTO();

  /// <summary>
  /// List of shift break types
  /// </summary>
  shiftBreakTypes: ShiftBreakTypeLocalizedDTO[] = [];

  /// <summary>
  /// Selected shift break type from the shift break types list
  /// </summary>
  selectedShiftBreakType?: ShiftBreakTypeLocalizedDTO;

  shiftBreakTemplateDTOs: ShiftBreakTemplateDTO[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private snackbarManagerService: SnackbarManagerService,
  private loadingScreenService: LoadingSpinnerManagerService,) 
  { 
    this.isAddingShiftBreak = data.isAddingShiftBreak;
    this.currentShiftId = data.currentShiftId;
    this.shiftBreakTypes = data.shiftBreakTypes;
    this.shiftBreakDTO = data.shiftBreakDTO;
    this.shiftBreakTemplateDTOs = data.shiftBreakTemplateDTOs;
  }


  ngOnInit() {
    console.log(this.shiftBreakTemplateDTOs);
    if(this.isAddingShiftBreak) {
      this.selectedTabIndex = 0;
      this.executeActionText = 'Add';
      this.executeActionIcon = ADD_ICON;
    }
    else {
      this.selectedTabIndex = 2;
      this.executeActionText = 'Save';
      this.executeActionIcon = SAVE_ICON;

      this.selectedShiftBreakType = this.shiftBreakTypes.find(shiftBreakType => shiftBreakType.ShiftBreakTypeId === this.shiftBreakDTO.ShiftBreakTypeId);
    }
  }

  /// <summary>
  /// Set the tab index
  /// </summary>
  setTabIndex(newTabIndex: number) {
    this.selectedTabIndex = newTabIndex;  
  }

  /// <summary>
  /// Handle the shift break submission
  /// </summary>
  handleShiftBreakSubmission() {
    
  }

}
