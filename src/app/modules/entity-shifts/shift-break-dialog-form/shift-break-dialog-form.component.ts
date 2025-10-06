import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ADD_ICON, SAVE_ICON } from '../../../shared/constants/IconNamesConstants';
import { ShiftBreakDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakDTO';
import { ShiftBreakTypeLocalizedDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakTypeLocalizedDTO';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { ShiftBreakTemplateDTO } from '../../../shared/models/DTOs/Incoming/ShiftBreakTemplateDTO';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { AddShiftBreakDTO } from '../../../shared/models/DTOs/Outgoing/AddShiftBreakDTO';
import { ShiftService } from '../../../core/services/api/ShiftService';

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
  selectedShiftBreakType: ShiftBreakTypeLocalizedDTO;

  /// <summary>
  /// List of shift break templates
  /// </summary>
  shiftBreakTemplateDTOs: ShiftBreakTemplateDTO[] = [];

  /// <summary>
  /// Selected shift break template from the shift break template list
  /// </summary>
  selectedShiftBreakTemplate?: ShiftBreakTemplateDTO;

  /// <summary>
  /// Form Variable - Break start time
  /// </summary>
  breakStartTime: Date = new Date();

  /// <summary>
  /// Form Variable - Break duration
  /// </summary>
  breakDuration: Date = new Date();

  /// <summary>
  /// Form Variable - Included in shift
  /// </summary>
  includedInShift: boolean = false;

  /// <summary>
  /// Form Variable - Is time flexible
  /// </summary>
  isTimeFlexible: boolean = false;

  @Output() shiftBreakOp = new EventEmitter<BaseResponseModel>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private snackbarManagerService: SnackbarManagerService,
  private loadingScreenService: LoadingSpinnerManagerService,
  private shiftService: ShiftService) 
  { 
    this.isAddingShiftBreak = data.isAddingShiftBreak;
    this.currentShiftId = data.currentShiftId;
    this.shiftBreakTypes = data.shiftBreakTypes;
    this.shiftBreakDTO = data.shiftBreakDTO;
    this.shiftBreakTemplateDTOs = data.shiftBreakTemplateDTOs;
    this.selectedShiftBreakType = this.shiftBreakTypes[0];
  }


  ngOnInit() {
    if(this.isAddingShiftBreak) {
      this.selectedTabIndex = 0;
      this.executeActionText = 'Add';
      this.executeActionIcon = ADD_ICON;
    }
    else {
      this.selectedTabIndex = 2;
      this.executeActionText = 'Save';
      this.executeActionIcon = SAVE_ICON;

      this.setShiftFormValues(this.shiftBreakDTO.shiftBreakTypeId, this.shiftBreakDTO.shiftBreakStartTime, this.shiftBreakDTO.shiftBreakDuration, this.shiftBreakDTO.includedInShift, this.shiftBreakDTO.isTimeFlexible)
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
  async handleShiftBreakSubmission() {
    let validationResult = this.validateFormValues();
    if(!validationResult.success) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResult.message));
      return;
    }
    else{
      this.shiftBreakDTO.shiftParentId = this.currentShiftId;
      this.shiftBreakDTO.shiftBreakTypeId = this.selectedShiftBreakType.shiftBreakTypeId;
      this.shiftBreakDTO.shiftBreakStartTime = this.breakStartTime;
      this.shiftBreakDTO.shiftBreakDuration = this.breakDuration;
      this.shiftBreakDTO.includedInShift = this.includedInShift;
      this.shiftBreakDTO.isTimeFlexible = this.isTimeFlexible;
      this.shiftBreakDTO.shiftBreakTypeDisplay = this.selectedShiftBreakType.shiftBreakTypeLocalizedName;

      let baseResponseModel = new BaseResponseModel(false, '', null);

      if(this.currentShiftId === '') {
        baseResponseModel.success = true;
        baseResponseModel.result = this.shiftBreakDTO;
        baseResponseModel.message = 'Shift Break added successfully';

        this.shiftBreakOp.emit(baseResponseModel);
      }
      else{
        
        this.loadingScreenService.changeLoadingState(true);

        // If its a new shift break, with a shift association, call the API to add it
        if(this.isAddingShiftBreak) {
          let addShiftBreakDTO = new AddShiftBreakDTO(
            this.shiftBreakDTO.shiftParentId, 
            this.shiftBreakDTO.shiftBreakTypeId, 
            this.shiftBreakDTO.shiftBreakStartTime, 
            this.shiftBreakDTO.shiftBreakDuration, 
            this.shiftBreakDTO.includedInShift, 
            this.shiftBreakDTO.isTimeFlexible);

          // API Call
          let response = await this.shiftService.addShiftBreak(addShiftBreakDTO);
          
          // If the API call was successful, emit the response
          if(response.success){
            this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Shift Break added successfully'));
            response.result.shiftBreakTypeDisplay = this.selectedShiftBreakType.shiftBreakTypeLocalizedName;
            this.shiftBreakOp.emit(response);
          }
          else{
            this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
          }
        }

        // If its an existing shift break, with a shift association, call the API to update it
        else{
          let apiResponse = await this.shiftService.updateShiftBreak(this.shiftBreakDTO);
          if(apiResponse.success){
            this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Shift Break updated successfully'));
            apiResponse.result = this.shiftBreakDTO;
            this.shiftBreakOp.emit(apiResponse);
          }
          else{
            this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
          }
        }

        this.loadingScreenService.changeLoadingState(false);
      }
    }
  }

  /// <summary>
  /// Handle the shift break template selection
  /// </summary>
  onSelectShiftTemplate($event: ShiftBreakTemplateDTO) {
    this.selectedShiftBreakTemplate = $event;
    this.selectedTabIndex = 2;
    this.setShiftFormValues($event.shiftBreakTypeId, $event.shiftBreakStartHour, $event.shiftBreakDuration, $event.includedInShift, $event.isTimeFlexible);
    this.shiftService.updateShiftBreakTemplatePopCount(this.selectedShiftBreakTemplate.shiftBreakTemplateId);
  }

  /// <summary>
  /// Set the shift form values
  /// </summary>
  setShiftFormValues(shiftBreakTypeId: number, startTime: Date, duration: Date, includedInShift: boolean, isTimeFlexible: boolean) {
    this.selectedShiftBreakType = this.shiftBreakTypes.find(shiftBreakType => shiftBreakType.shiftBreakTypeId === shiftBreakTypeId) || this.shiftBreakTypes[0];
    this.breakStartTime = startTime;
    this.breakDuration = duration;
    this.includedInShift = includedInShift;
    this.isTimeFlexible = isTimeFlexible;
  }

  /// <summary>
  /// Validate the form values
  /// </summary>
  validateFormValues() : BaseResponseModel {
    let response = new BaseResponseModel(false, '', null);
    
    if(this.selectedShiftBreakType === undefined || this.breakStartTime === undefined || this.breakDuration === undefined) {
      response.message = 'Please fill in all the required fields';
    }
    else if(this.breakDuration == new Date(0)) {
      response.message = 'Please enter a valid break duration';
    }

    else
      response.success = true;

    return response;
  }

}
