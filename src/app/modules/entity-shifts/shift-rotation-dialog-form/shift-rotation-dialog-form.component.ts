import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { ShiftService } from '../../../core/services/api/ShiftService';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShiftDTO } from '../../../shared/models/DTOs/Incoming/ShiftDTO';
import { AddShiftRotationDTO } from '../../../shared/models/DTOs/Outgoing/AddShiftRotationDTO';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import {MatSliderModule} from '@angular/material/slider';
import { FormControl, FormGroup } from '@angular/forms';
import { EntityShiftRotationDTO } from '../../../shared/models/DTOs/Incoming/EntityShiftRotationDTO';

@Component({
  selector: 'shift-rotation-dialog-form',
  templateUrl: './shift-rotation-dialog-form.component.html',
  styleUrl: './shift-rotation-dialog-form.component.css'
})
export class ShiftRotationDialogFormComponent {

  //#region Properties

  currentEntityId : string = "";

  shifts: ShiftDTO[] = [];

  selectShift: ShiftDTO = ShiftDTO.newShiftDTO();

  isLeave: boolean = false;

  leaveDurationInput: number = 0;

  leaveDurationLabel: string = '';

  leaveDuration: string = '';

  isEditMode: boolean = false;

  entityRotation : EntityShiftRotationDTO = EntityShiftRotationDTO.newEntityShiftRotationDTO();

  @Output() shiftRotationOp = new EventEmitter<BaseResponseModel>();

  //#endregion

  //#region Constructor

  /**
   *
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private shiftService: ShiftService
  ) {
    this.currentEntityId = data.entityId;
    this.shifts = data.shifts;
    let potentialRotation : EntityShiftRotationDTO = data.shiftRotationDTO;

    if(potentialRotation != null){
      this.entityRotation = potentialRotation;
      this.isEditMode = true;
      this.selectShift = this.shifts.find(s => s.shiftId == potentialRotation.shiftId) ?? ShiftDTO.newShiftDTO();
      this.isLeave = potentialRotation.isLeave;
      this.leaveDurationInput = this.dateToSliderValue(potentialRotation.leaveDurationText);
      this.leaveDurationLabel = this.setDurationAndLabel(this.leaveDurationInput);
    }
  }

  //#endregion

  //#region Methods

  //#region Add Shift Rotation

  async addUpdateShiftRotation() {
    let apiResponse : BaseResponseModel = new BaseResponseModel(false, '', null);
    this.loadingScreenService.changeLoadingState(true);

    if(!this.isEditMode){
      let newRotation: AddShiftRotationDTO = new AddShiftRotationDTO(this.currentEntityId, this.selectShift.shiftId, this.isLeave, this.leaveDuration);
      apiResponse = await this.shiftService.addShiftRotation(newRotation);
    }
    else{
      this.entityRotation.isLeave = this.isLeave;
      if(this.isLeave){
        this.entityRotation.leaveDurationText = new Date(0).toString();
        // Calculate days, hours, minutes from decimal value
        let days = Math.floor(this.leaveDurationInput / 24);
        let hours = Math.floor(this.leaveDurationInput) - (days * 24);
        let minutes = (this.leaveDurationInput % 1) * 60;
        this.entityRotation.leaveDurationText = days != 0 ? `${days}.${hours}:${minutes}:00` : `${hours}:${minutes}:00`;
        
        // Reset shift info
        this.entityRotation.shiftId = '';
        this.entityRotation.displayName = 'Leave / NA';
        this.entityRotation.alias = 'L/NA';
      }
      else{
        // Reset leave info
        this.entityRotation.leaveDurationText = new Date(0).toString();
        // Set shift info
        this.entityRotation.shiftId = this.selectShift.shiftId;
        this.entityRotation.displayName = this.selectShift.shiftName;
        this.entityRotation.alias = this.selectShift.shiftAlias;
      }

      apiResponse = await this.shiftService.updateShiftRotation(this.entityRotation);
    }
    
    this.loadingScreenService.changeLoadingState(false);

    if(!this.isEditMode && apiResponse.success){
      apiResponse.result = apiResponse.result;
    }
    else if(this.isEditMode && apiResponse == null){
      apiResponse = new BaseResponseModel(true, 'Shift rotation updated successfully', null);
      apiResponse.result = this.entityRotation;
    }

    if(apiResponse.success){
      this.shiftRotationOp.emit(apiResponse);
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));
    }else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
    }
  }

  //#endregion

  //#region Close Dialog

  closeDialog() {
    this.shiftRotationOp.emit(new BaseResponseModel(true, '', null));
  }

  //#endregion

  //#region On Duration Change

  onDurationChange(event: any) {
    this.leaveDurationLabel = this.setDurationAndLabel(this.leaveDurationInput);
  }

  //#endregion

  //#region Set Duration and Label

  setDurationAndLabel(value: number): string {
    let days = Math.floor(value / 24);
    let hours = Math.floor(value) - (days * 24);
    let minutes = (value % 1) * 60;

    this.leaveDuration = days != 0 ? days +' ' + hours + ':' + minutes : hours + ':' + minutes;

    return days != 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`;
  }

  //#endregion

  //#region Date to Slider Value

  dateToSliderValue(date: string): number {
    let splitDate = date.split('.');

    let days = 0;
    let hours = 0;
    let minutes = 0;

    // There is a days amount
    if (splitDate.length == 2) {
      days = parseInt(splitDate[0]);

      let timeSplit = splitDate[1].split(':');
      if(timeSplit.length == 3){
        hours = parseInt(timeSplit[0]);
        minutes = parseInt(timeSplit[1]);
      }
      else if(timeSplit.length == 2){
        minutes = parseInt(timeSplit[0]);
      }
    }
    else{
      let timeSplit = splitDate[0].split(':');
      if(timeSplit.length == 3){
        hours = parseInt(timeSplit[0]);
        minutes = parseInt(timeSplit[1]);
      }
      else if(timeSplit.length == 2){
        minutes = parseInt(timeSplit[0]);
      }
    }

    return days * 24 + hours + minutes / 60;
  }

  //#endregion

  //#endregion
}
