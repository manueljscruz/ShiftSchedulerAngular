import { Component, ViewChild } from '@angular/core';
import { WorkerDTO } from '../../shared/models/DTOs/Incoming/WorkerDTO';
import { ActivatedRoute } from '@angular/router';
import { ShiftDTO } from '../../shared/models/DTOs/Incoming/ShiftDTO';
import { ShiftBreakDTO } from '../../shared/models/DTOs/Incoming/ShiftBreakDTO';
import { ShiftBreakDialogFormComponent } from './shift-break-dialog-form/shift-break-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ShiftViewModel } from '../../shared/models/VM/ShiftViewModel';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { ShiftService } from '../../core/services/api/ShiftService';
import { EntityShiftViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/EntityShiftViewModelRequestDTO';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { MatTable } from '@angular/material/table';
import { AddShiftDTO } from '../../shared/models/DTOs/Outgoing/AddShiftDTO';
import { AddShiftBreakDTO } from '../../shared/models/DTOs/Outgoing/AddShiftBreakDTO';
import { GenericDeleteWarningDialogComponent } from '../../shared/components/generic-delete-warning-dialog/generic-delete-warning-dialog.component';
import { DELETE_SHIFT_BREAK_CONTENT, DELETE_SHIFT_BREAK_TITLE, DELETE_SHIFT_CONTENT, DELETE_SHIFT_TITLE } from '../../shared/constants/UITextConstants';
import e from 'express';

@Component({
  selector: 'app-entity-shifts',
  templateUrl: './entity-shifts.component.html',
  styleUrl: './entity-shifts.component.css'
})
export class EntityShiftsComponent {

  // CONSTANTS
  DELETE_SHIFT_TITLE = DELETE_SHIFT_TITLE;
  DELETE_SHIFT_CONTENT = DELETE_SHIFT_CONTENT;
  DELETE_SHIFT_BREAK_TITLE = DELETE_SHIFT_BREAK_TITLE;
  DELETE_SHIFT_BREAK_CONTENT = DELETE_SHIFT_BREAK_CONTENT;

  /// <summary>
  /// Logged user object
  /// </summary>
  public loggedUser: WorkerDTO = new WorkerDTO();
  
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
  ShiftViewModel: ShiftViewModel = new ShiftViewModel([], [], false, []);

  /// <summary>
  /// Reference to the shifts table
  /// </summary>
  @ViewChild(MatTable) shiftTable!: MatTable<any>;

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

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private shiftService: ShiftService
  ) 
  { 
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
  }

  async ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.isCurrentUserEntityOwner = true;

    // Turn on the loading spinner
    this.loadingScreenService.changeLoadingState(true);

    // Get the shifts View Model
    let entityShiftVWRequest = new EntityShiftViewModelRequestDTO(this.currentEntityId, this.loggedUser.workerId, '');
    this.ShiftViewModel = await this.shiftService.getShiftViewModel(entityShiftVWRequest);

    // Turn off the loading spinner
    this.loadingScreenService.changeLoadingState(false);
  }

  toggleForm(isEditing: boolean) {
    this.isFormActive = !this.isFormActive;
    this.isEditing = isEditing;
  }

  expandRow(_t95: any) {
    
  }
  
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

  // CREATING OR EDITING A SHIFT

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

  /// <summary>
  /// Opens the dialog form for adding a new shift break
  /// </summary>
  newShiftBreak() {
    this.openShiftBreakDialogForm('5000', '5000', true, ShiftBreakDTO.newShiftBreakDTO());
  }

  /// <summary>
  /// Opens the dialog to edit the shift break
  /// </summary>
  editShiftBreak(shiftBreakDTO: ShiftBreakDTO) {
    this.shiftBreakToChange = shiftBreakDTO;
    this.openShiftBreakDialogForm('5000', '5000', false, this.shiftBreakToChange);
  }

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
      };
    });
  }


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
}
