import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { ActivatedRoute } from '@angular/router';
import { ShiftDTO } from '../../shared/models/DTOs/Incoming/ShiftDTO';
import { ShiftBreakDTO } from '../../shared/models/DTOs/Incoming/ShiftBreakDTO';
import { ShiftBreakDialogFormComponent } from './shift-break-dialog-form/shift-break-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ShiftViewModel } from '../../shared/models/VM/ShiftViewModel';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { ShiftService } from '../../core/services/api/ShiftService';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { MatTable } from '@angular/material/table';
import { AddShiftDTO } from '../../shared/models/DTOs/Outgoing/AddShiftDTO';
import { AddShiftBreakDTO } from '../../shared/models/DTOs/Outgoing/AddShiftBreakDTO';
import { GenericDeleteWarningDialogComponent } from '../../shared/components/generic-delete-warning-dialog/generic-delete-warning-dialog.component';
import { DELETE_SHIFT_BREAK_CONTENT, DELETE_SHIFT_BREAK_TITLE, DELETE_SHIFT_CONTENT, DELETE_SHIFT_ROTATION_CONTENT, DELETE_SHIFT_ROTATION_TITLE, DELETE_SHIFT_TITLE } from '../../shared/constants/UITextConstants';
import { ShiftTemplateDTO } from '../../shared/models/DTOs/Incoming/ShiftTemplateDTO';
import { BaseViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { ShiftRotationDialogFormComponent } from './shift-rotation-dialog-form/shift-rotation-dialog-form.component';
import { EntityShiftRotationDTO } from '../../shared/models/DTOs/Incoming/EntityShiftRotationDTO';
import { UpdateShiftRotationDTO } from '../../shared/models/DTOs/Outgoing/UpdateShiftRotationDTO';

@Component({
  selector: 'app-entity-shifts',
  templateUrl: './entity-shifts.component.html',
  styleUrl: './entity-shifts.component.css'
})
export class EntityShiftsComponent {

  //#region CONSTANTS
  // CONSTANTS
  DELETE_SHIFT_TITLE = DELETE_SHIFT_TITLE;
  DELETE_SHIFT_CONTENT = DELETE_SHIFT_CONTENT;
  DELETE_SHIFT_BREAK_TITLE = DELETE_SHIFT_BREAK_TITLE;
  DELETE_SHIFT_BREAK_CONTENT = DELETE_SHIFT_BREAK_CONTENT;
  DELETE_SHIFT_ROTATION_TITLE = DELETE_SHIFT_ROTATION_TITLE;
  DELETE_SHIFT_ROTATION_CONTENT = DELETE_SHIFT_ROTATION_CONTENT;

  //#endregion

  //#region PROPERTIES

  /// <summary>
  /// Logged user object
  /// </summary>
  public loggedUser: UserDTO = new UserDTO();
  
  /// <summary>
  /// Current entity id
  /// </summary>
  private currentEntityId: string = '';
  
  /// <summary>
  /// Is current user entity owner flag
  /// </summary>
  public isCurrentUserEntityOwner: boolean = false;

  /// <summary>
  /// Is the form visible at this moment
  /// </summary>
  public isFormActive : boolean = false;

  /// <summary>
  /// Signaling if the user is editing the shift
  /// </summary>
  public isEditing: boolean = false;

  /// <summary>
  /// Shift view model object
  /// </summary>
  public ShiftViewModel: ShiftViewModel = new ShiftViewModel([], [], [], false, []);

  /// <summary>
  /// Reference to the shifts table
  /// </summary>
  @ViewChild(MatTable) shiftTable!: MatTable<any>;

  @ViewChild(MatTable) shiftRotationTable!: MatTable<any>;

  /// <summary>
  /// Selected shift object
  /// </summary>
  public SelectedShift: ShiftDTO = ShiftDTO.newShiftDTO();

  /// <summary>
  /// Selected shift breaks
  /// </summary>
  public SelectedShiftBreaks: ShiftBreakDTO[] = [];

  /// <summary>
  /// Shift break to change
  /// </summary>
  public shiftBreakToChange: ShiftBreakDTO = ShiftBreakDTO.newShiftBreakDTO();

  shiftBreakDisplayedColumns: string[] = ['ShiftBreakTypeDisplay', 'ShiftBreakDuration', 'ShiftBreakStartTime', 'IncludedInShift', 'IsTimeFlexible', 'Actions'];

  /// <summary>
  /// Reference to the selected shift breaks table in the create/edit shift form
  /// </summary>
  @ViewChild(MatTable) selectedShiftBreakTable!: MatTable<any>;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private shiftService: ShiftService,
    private cdRef: ChangeDetectorRef
  ) 
  { 
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
  }

  //#endregion

  //#region METHODS

  //#region On Init

  async ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

    // Turn on the loading spinner
    this.loadingScreenService.changeLoadingState(true);

    // Get the shifts View Model
    let entityShiftVWRequest = new BaseViewModelRequestDTO(this.currentEntityId, this.loggedUser.userId, '');
    this.ShiftViewModel = await this.shiftService.getShiftViewModel(entityShiftVWRequest);
    this.isCurrentUserEntityOwner = this.ShiftViewModel.allowEdit;

    // Turn off the loading spinner
    this.loadingScreenService.changeLoadingState(false);
  }

  //#endregion

  //#region Toggle Form

  toggleForm(isEditing: boolean) {
    this.isFormActive = !this.isFormActive;
    this.isEditing = isEditing;
  }

  //#endregion

  //#region Expand Row

  expandRow(_t95: any) {
    
  }

  //#endregion
  
  //#region Edit Shift

  /// <summary>
  /// Changes the shift form to edit mode
  /// </summary>
  editShift(shiftToEdit: ShiftDTO) {
    this.SelectedShift = shiftToEdit;
    this.SelectedShiftBreaks = shiftToEdit.shiftBreakDTOs;
    this.selectedShiftBreakTable.renderRows();
    this.isEditing = true;
    this.toggleForm(true);
  }
  
  //#endregion

  //#region Delete Shift

  /// <summary>
  /// Deletes the shift
  /// </summary>
  async deleteShift(shiftToDelete: ShiftDTO) {
    if(shiftToDelete.entityId != '' && shiftToDelete.shiftId != '') {
      // Turn on the loading spinner
      this.loadingScreenService.changeLoadingState(true);

      let apiResponse = await this.shiftService.deleteShift(shiftToDelete.entityId, shiftToDelete.shiftId);

      // If API call successful
      if(apiResponse.success) {
        // Remove the shift from the shift view model
        let index = this.ShiftViewModel.shifts.findIndex(x => x.shiftId === shiftToDelete.shiftId);
        this.ShiftViewModel.shifts.splice(index, 1);

        // Show success message
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));

        // Reload the shift table
        this.shiftTable.renderRows();
      }
      else{
        // Show fail message
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }


      this.loadingScreenService.changeLoadingState(false);
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Shift cannot be deleted without required data.'));
    }
  }

  //#endregion

  //#region On Select Shift Template

  onSelectShiftTemplate($event: ShiftTemplateDTO) {
    let shiftTemplateDTO = $event;
    if(shiftTemplateDTO != null){
      this.SelectedShift.shiftName = shiftTemplateDTO.shiftTemplateName;
      this.SelectedShift.shiftAlias = shiftTemplateDTO.shiftTemplateAlias;
      this.SelectedShift.shiftStartHour = shiftTemplateDTO.shiftStartHour;
      this.SelectedShift.shiftDuration = shiftTemplateDTO.shiftDuration;

      if(shiftTemplateDTO.shiftBreakTemplates != null){
        this.SelectedShiftBreaks = [];

        shiftTemplateDTO.shiftBreakTemplates.forEach((shiftBreakTemplate) => {
          this.SelectedShiftBreaks.push(new ShiftBreakDTO(
            '',
            '',
            shiftBreakTemplate.shiftBreakTypeId,
            shiftBreakTemplate.shiftBreakTypeDisplayValue,
            shiftBreakTemplate.shiftBreakStartHour,
            shiftBreakTemplate.shiftBreakDuration,
            shiftBreakTemplate.includedInShift,
            shiftBreakTemplate.isTimeFlexible
          ));
        });

        this.selectedShiftBreakTable.renderRows();
      }
    }
  }

  //#endregion

  // CREATING OR EDITING A SHIFT

  //#region Save Shift

  /// <summary>
  /// Saves the shift
  /// </summary>
  async saveShift() {
    // Validate Shift Submission Entry
    let validateShiftForm = this.validateShiftForm();

    if(validateShiftForm.success) {
      // Turn on the loading spinner
      this.loadingScreenService.changeLoadingState(true);

      let apiResponse = new BaseResponseModel(false, '', null);

      // Editing an existing shift
      if(this.isEditing) {
        this.SelectedShift.shiftBreakDTOs = this.SelectedShiftBreaks;
        apiResponse = await this.shiftService.updateShift(this.SelectedShift);
      }

      // Adding a new shift
      else {
        // Convert SelectedShiftBreaks to AddShiftBreakDTO
        let addShiftBreaks : AddShiftBreakDTO[] = [];
        this.SelectedShiftBreaks.forEach((shiftBreak) => {
          addShiftBreaks.push(new AddShiftBreakDTO(
            '',
            shiftBreak.shiftBreakTypeId,
            shiftBreak.shiftBreakStartTime,
            shiftBreak.shiftBreakDuration,
            shiftBreak.includedInShift,
            shiftBreak.isTimeFlexible
          ));
        });

        // Create AddShiftDTO object from the selected shift object
        let addShiftDTO = new AddShiftDTO(
          this.currentEntityId,
          this.SelectedShift.shiftName,
          this.SelectedShift.shiftAlias,
          this.SelectedShift.shiftDescription,
          this.SelectedShift.shiftStartHour,
          this.SelectedShift.shiftDuration,
          '',
          addShiftBreaks
        );

        apiResponse = await this.shiftService.addShift(addShiftDTO);
      }

      // If API call successful
      if(apiResponse.success) {
        let shiftDTO = apiResponse.result as ShiftDTO;

        // Replace entry with the new one
        if(this.isEditing) {
          let index = this.ShiftViewModel.shifts.findIndex(x => x.shiftId === shiftDTO.shiftId);
          this.ShiftViewModel.shifts[index] = shiftDTO;
        }

        // Add new entry
        else {
          this.ShiftViewModel.shifts.push(shiftDTO);
        }

        // Show success message
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));

        // Reset form related data, toggle off flags and reload the shift table 
        this.isFormActive = false;
        this.isEditing = false;
        this.SelectedShift = ShiftDTO.newShiftDTO();
        this.SelectedShiftBreaks = [];
        this.shiftTable.renderRows();
      }
      // If API call not successful
      else 
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));

      // Turn off the loading spinner
      this.loadingScreenService.changeLoadingState(false);
    }
    // If validation fails
    else
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validateShiftForm.message));
    
  }

  //#endregion

  //#region Validate Shift Form

  validateShiftForm() : BaseResponseModel {
    let response = new BaseResponseModel(false, '', null);

    if(this.SelectedShift.shiftName === '') {
      response.message = 'Shift name is required';
      return response;
    }

    else if(this.SelectedShift.shiftDuration === new Date()) {
      response.message = 'Shift duration cannot be 0';
      return response;
    }

    response.success = true;

    return response;
  }

  //#endregion

  //#region Open Shift Break Dialog Form

  /// <summary>
  /// Opens the shift break dialog form to add or edit a shift break
  /// </summary>
  openShiftBreakDialogForm(enterAnimationDuration: string, exitAnimationDuration: string, isAddingShiftBreak : boolean, shiftBreakDTO: ShiftBreakDTO) {
    const dialogRef = this.dialog.open(ShiftBreakDialogFormComponent, {
      width: '600px',
      data: { 
        enterAnimationDuration, 
        exitAnimationDuration, 
        isAddingShiftBreak, 
        currentShiftId: this.SelectedShift.shiftId, 
        shiftBreakTypes: this.ShiftViewModel.shiftBreakTypeLocalizeds, 
        shiftBreakDTO : shiftBreakDTO,
        shiftBreakTemplateDTOs: this.ShiftViewModel.shiftBreakTemplates}
    });

    dialogRef.componentInstance.shiftBreakOp.subscribe((result : BaseResponseModel) => {
      dialogRef.close();

      // If successful
      if(result.success) {
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, result.message));

        // Add the shift break to the selected shift breaks
        if(isAddingShiftBreak){
          this.SelectedShiftBreaks.push(result.result);
        }
        
        // Find the index of the shift break to change and replace it with the new one
        else
        {
          let index = this.SelectedShiftBreaks.findIndex(x => x === this.shiftBreakToChange);
          this.SelectedShiftBreaks[index] = result.result;
        }

        this.selectedShiftBreakTable.renderRows();
      }
      else {
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, result.message));
      }
    });
  }

  //#endregion

  //#region New Shift Break

  /// <summary>
  /// Opens the dialog form for adding a new shift break
  /// </summary>
  newShiftBreak() {
    this.openShiftBreakDialogForm('5000', '5000', true, ShiftBreakDTO.newShiftBreakDTO());
  }

  //#endregion

  //#region Edit Shift Break

  /// <summary>
  /// Opens the dialog to edit the shift break
  /// </summary>
  editShiftBreak(shiftBreakDTO: ShiftBreakDTO) {
    this.shiftBreakToChange = shiftBreakDTO;
    this.openShiftBreakDialogForm('5000', '5000', false, this.shiftBreakToChange);
  }

  //#endregion

  //#region Open Delete Dialog

  async openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, title : string, content : string, objectToDelete: any, type: string){
    const dialogRef = this.dialog.open(GenericDeleteWarningDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, deleteWarningTitle: title, deleteWarningMessage: content}
    });

    dialogRef.afterClosed().subscribe(async result =>{
      if(result){
        if(type === 'ShiftDTO'){
          await this.deleteShift(objectToDelete);
        }
        
        else if(type === 'ShiftBreakDTO'){
          await this.deleteShiftBreak(objectToDelete);
        }

        else if(type === 'ShiftRotationDTO'){
          await this.deleteRotation(objectToDelete);
        }

      };
    });
  }

  //#endregion

  //#region Delete Shift Break

  async deleteShiftBreak(shiftBreakDTO: ShiftBreakDTO) {
    // If no shift break id, remove from the selected shift breaks
    if(shiftBreakDTO.shiftBreakId === ''){
      let index = this.SelectedShiftBreaks.findIndex(x => x === shiftBreakDTO);
      this.SelectedShiftBreaks.splice(index, 1);
      this.selectedShiftBreakTable.renderRows();
    }
    else{
      // Turn on the loading spinner
      this.loadingScreenService.changeLoadingState(true);

      let apiResponse = await this.shiftService.deleteShiftBreak(shiftBreakDTO.shiftBreakId);

      // If API call successful
      if(apiResponse.success) {
        // Remove the shift break from the selected shift breaks
        let index = this.SelectedShiftBreaks.findIndex(x => x.shiftBreakId === shiftBreakDTO.shiftBreakId);
        this.SelectedShiftBreaks.splice(index, 1);

        // Show success message
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));

        // Reload the shift breaks table
        this.selectedShiftBreakTable.renderRows();
      }
      // If API call not successful
      else 
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));

      // Turn off the loading spinner
      this.loadingScreenService.changeLoadingState(false);
    }
  }
  
  //#endregion

  //#region Change Rotation

  changeRotation() {
    this.openShiftRotationDialog('5000', '5000');
  }

  //#endregion

  //#region Open Shift Rotation Dialog

  openShiftRotationDialog(enterAnimationDuration: string, exitAnimationDuration: string, shiftRotationDTO?: EntityShiftRotationDTO) {

    let isEdit = shiftRotationDTO != null;

    const dialogRef = this.dialog.open(ShiftRotationDialogFormComponent, {
      width: '600px',
      data:{
        entityId: this.currentEntityId,
        shifts: this.ShiftViewModel.shifts,
        shiftRotationDTO: isEdit ? shiftRotationDTO : null,
      }
    });

    dialogRef.componentInstance.shiftRotationOp.subscribe((result : BaseResponseModel) => {
      dialogRef.close();

      if(result.success && result.result != null){
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, result.message));

        if(isEdit){
          let index = this.ShiftViewModel.shiftRotations.findIndex(x => x.entityId === result.result.entityId && x.orderNo === result.result.orderNo);
          this.ShiftViewModel.shiftRotations[index] = result.result;
          this.shiftRotationTable.renderRows();
          return;
        }
        else{
          this.ShiftViewModel.shiftRotations = [...this.ShiftViewModel.shiftRotations, result.result];
          this.shiftRotationTable.renderRows();
        }
      }

      else if(result.success && result.result == null){

      }
      else{
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, result.message));
      }
    });
  }

  //#endregion

  //#region Go Up Shift Rotation

  async goUp(shiftRotationDTO : EntityShiftRotationDTO){
    await this.updateShiftRotationOrder(shiftRotationDTO, 1);
  }

  //#endregion

  //#region Go Down Shift Rotation

  async goDown(shiftRotationDTO : EntityShiftRotationDTO){
    await this.updateShiftRotationOrder(shiftRotationDTO, -1);
  }

  //#endregion

  //#region Edit Shift Rotation

  editRotation(shiftRotationDTO : EntityShiftRotationDTO) {
    this.openShiftRotationDialog('5000', '5000', shiftRotationDTO);
  }

  //#endregion

  //#region Update Shift Rotation

  async updateShiftRotationOrder(shiftRotationDTO : EntityShiftRotationDTO, indexChange: number){
    let validationResponse = this.validateShiftRotationChange(shiftRotationDTO, indexChange);

    if(validationResponse.success){
      let updateShiftRotationDTO = new UpdateShiftRotationDTO(
        shiftRotationDTO.entityId,
        shiftRotationDTO.orderNo,
        shiftRotationDTO.isLeave,
        shiftRotationDTO.orderNo + indexChange
      );

      this.loadingScreenService.changeLoadingState(true);
      let apiResponse = await this.shiftService.updateShiftRotationOrder(updateShiftRotationDTO);
      this.loadingScreenService.changeLoadingState(false);

      if(apiResponse.success){
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));
        
        // Get this instance's index in the array
        let indexOrigin = this.ShiftViewModel.shiftRotations.findIndex(x => x.entityId === shiftRotationDTO.entityId && x.orderNo === shiftRotationDTO.orderNo);
        let indexDest = this.ShiftViewModel.shiftRotations.findIndex(x => x.entityId === shiftRotationDTO.entityId && x.orderNo === shiftRotationDTO.orderNo + indexChange);
        
        console.log("Index Origin:", indexOrigin, "Index Dest:", indexDest);

        // If both indexes are not found, then the order numbers are swapped
        if(indexOrigin !== -1 && indexDest !== -1){
          
          console.log("Before swap:", [...this.ShiftViewModel.shiftRotations]);
          [this.ShiftViewModel.shiftRotations[indexOrigin].orderNo, this.ShiftViewModel.shiftRotations[indexDest].orderNo] =
          [this.ShiftViewModel.shiftRotations[indexDest].orderNo, this.ShiftViewModel.shiftRotations[indexOrigin].orderNo];

          [this.ShiftViewModel.shiftRotations[indexOrigin], this.ShiftViewModel.shiftRotations[indexDest]] =
          [this.ShiftViewModel.shiftRotations[indexDest], this.ShiftViewModel.shiftRotations[indexOrigin]];
          console.log("After swap:", [...this.ShiftViewModel.shiftRotations]);

          this.ShiftViewModel.shiftRotations = [...this.ShiftViewModel.shiftRotations];
        }
      }
      else{
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResponse.message));
    }

  }

  //#endregion

  //#region Delete Shift Rotation

  async deleteRotation(shiftRotationDTO : EntityShiftRotationDTO){
    this.loadingScreenService.changeLoadingState(true);

    let apiResponse = await this.shiftService.deleteShiftRotation(shiftRotationDTO);

    this.loadingScreenService.changeLoadingState(false);

    if(apiResponse.success){
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));

      // Remove the shift break from the selected shift breaks
      let index = this.ShiftViewModel.shiftRotations.findIndex(x => x == shiftRotationDTO);
      this.ShiftViewModel.shiftRotations.splice(index, 1);

      this.shiftRotationTable.renderRows();

      this.reorderShiftRotations();
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
    }
  }

  //#endregion

  //#region Validate Shift Rotation Change

  validateShiftRotationChange(shiftRotationDTO : EntityShiftRotationDTO, variation: number) : BaseResponseModel{
    let response = new BaseResponseModel(false, '', null);

    if(this.ShiftViewModel.shiftRotations.length === 1){
      response.message = 'There is only one shift rotation';
      return response;
    }

    // If current order is at 1 and trying to go up
    if(variation > 0 && shiftRotationDTO.orderNo == this.ShiftViewModel.shiftRotations.length){
      response.message = 'Order is at the maximum value';
      return response;
    }

    // If current order is at the last order and trying to go down
    if(variation < 0 && shiftRotationDTO.orderNo == 1){
      response.message = 'Order is at the minimum value';
      return response;
    }

    response.success = true;

    return response;
  }

  //#endregion

  //#region Reorder Shift Rotations

  reorderShiftRotations(){

    let orderNo : number = 1;

    this.ShiftViewModel.shiftRotations.forEach((shiftRotation) => {
      if(shiftRotation.orderNo !== orderNo)
        shiftRotation.orderNo = orderNo;
      orderNo++;
    });

    this.ShiftViewModel.shiftRotations = [...this.ShiftViewModel.shiftRotations];
  }

  //#endregion

  //#endregion
}




