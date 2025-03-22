import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { ShiftService } from '../../../core/services/api/ShiftService';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShiftDTO } from '../../../shared/models/DTOs/Incoming/ShiftDTO';
import { AddShiftRotationDTO } from '../../../shared/models/DTOs/Outgoing/AddShiftRotationDTO';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';

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

  leaveDuration: Date = new Date();

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
    this.leaveDuration.setHours(0,0,0,0);
  }

  //#endregion

  //#region Methods

  //#region Add Shift Rotation

  async addShiftRotation() {

    let newRotation: AddShiftRotationDTO = new AddShiftRotationDTO(this.currentEntityId, this.selectShift.shiftId, this.isLeave, this.leaveDuration);

    this.loadingScreenService.changeLoadingState(true);

    let apiResponse = await this.shiftService.addShiftRotation(newRotation);

    this.loadingScreenService.changeLoadingState(false);
    if(apiResponse.success){
      this.shiftRotationOp.emit(apiResponse);
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));
    }else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
    }
  }

  closeDialog() {
    this.shiftRotationOp.emit(new BaseResponseModel(true, '', null));
  }

  //#endregion

  //#endregion

}
