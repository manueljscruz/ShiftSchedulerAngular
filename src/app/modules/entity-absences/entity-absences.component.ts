import { Component, ViewChild } from '@angular/core';
import { EntityWorkerAbsenceViewModel } from '../../shared/models/VM/EntityWorkerAbsenceViewModel';
import { EntityWorkerAbsenceDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerAbsenceDTO';
import { WorkerDTO } from '../../shared/models/DTOs/Incoming/WorkerDTO';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { BaseViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { AbsenceService } from '../../core/services/api/AbsenceService';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { DELETE_ABSENCE_CONTENT, DELETE_ABSENCE_TITLE, NOT_OWNER_OF_INTANCE_CONTENT } from '../../shared/constants/UITextConstants';
import { MatTable } from '@angular/material/table';
import { GenericDeleteWarningDialogComponent } from '../../shared/components/generic-delete-warning-dialog/generic-delete-warning-dialog.component';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { AbsenceTypeLocalizedDTO } from '../../shared/models/DTOs/Incoming/AbsenceTypeLocalizedDTO';
import { MatSelectChange } from '@angular/material/select';
import { AddEntityWorkerAbsenceDTO } from '../../shared/models/DTOs/Outgoing/AddEntityWorkerAbsenceDTO';
import { AbsenceApprovalDecisionDTO } from '../../shared/models/DTOs/Outgoing/AbsenceApprovalDecisionDTO';
import { DateDisplayService } from '../../core/services/date-display.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../shared/pipes/AppDateAdapter';
import { MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'entity-absences',
  templateUrl: './entity-absences.component.html',
  styleUrl: './entity-absences.component.css',
  providers: [provideNativeDateAdapter()],
})
export class EntityAbsencesComponent {

  DELETE_ABSENCE_TITLE = DELETE_ABSENCE_TITLE;
  DELETE_ABSENCE_CONTENT = DELETE_ABSENCE_CONTENT;
  NOT_OWNER_OF_INTANCE_CONTENT = NOT_OWNER_OF_INTANCE_CONTENT;

  /// <summary>
  /// Logged user object
  /// </summary>
  public loggedUser: WorkerDTO = new WorkerDTO();

  /// <summary>
  /// Current entity id
  /// </summary>
  public currentEntityId: string = '';

  /// <summary>
  /// Determines if the form is active or not
  /// </summary>
  isFormActive : boolean = false;

  /// <summary>
  /// Determines if the user is editing an absence or not
  /// </summary>
  isEditing : boolean = false;

  /// <summary>
  /// View model for the entity worker absences
  /// </summary>
  entityWorkerAbsencesViewModel : EntityWorkerAbsenceViewModel = new EntityWorkerAbsenceViewModel(false, [], []);

  /// <summary>
  /// Absences data
  /// </summary>
  entityWorkerAbsences: EntityWorkerAbsenceDTO[] = [];

  /// <summary>
  /// Selected absence being worked on
  /// </summary
  selectedAbsence : EntityWorkerAbsenceDTO = EntityWorkerAbsenceDTO.newEntityWorkerAbsenceDTO();

  /// <summary>
  /// Selected absence type for the absence
  /// </summary>
  selectedAbsenceType?: AbsenceTypeLocalizedDTO;

  @ViewChild(MatTable) absenceTable!: MatTable<EntityWorkerAbsenceDTO>;

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private absenceService: AbsenceService,
    private dateDisplayService: DateDisplayService) { 
      this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
  }

  async ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

    // Turn on the loading spinner
    this.loadingScreenService.changeLoadingState(true);
    
    let entityRuleViewModelRequestDTO = new BaseViewModelRequestDTO(this.currentEntityId, this.loggedUser.workerId, '');
    this.entityWorkerAbsencesViewModel = await this.absenceService.getAbsenceViewModel(entityRuleViewModelRequestDTO);
    this.entityWorkerAbsences = this.entityWorkerAbsencesViewModel.entityWorkerAbsences;

    this.loadingScreenService.changeLoadingState(false);
  }

  toggleFormToCreate() {
    this.selectedAbsence = EntityWorkerAbsenceDTO.newEntityWorkerAbsenceDTO();
    this.selectedAbsence.absenceStartDate = new Date();
    this.selectedAbsence.absenceEndDate = new Date();

    this.isEditing = false;
    this.toggleForm(true);
  }

  /// <summary>
  /// Responsible for toggling the form
  /// </summary>
  toggleForm(newState: boolean) {
    this.isFormActive = newState;

    if(!newState){
      this.selectedAbsence = EntityWorkerAbsenceDTO.newEntityWorkerAbsenceDTO();
      this.selectedAbsenceType = undefined;
    }
  }

  /// <summary>
  /// Responsible for the event when an absence is selected to be edited
  /// </summary>
  onAbsenceToEdit(absence: EntityWorkerAbsenceDTO) {
    this.selectedAbsence = { ...absence};
    this.selectedAbsenceType = this.entityWorkerAbsencesViewModel.absenceTypeLocalizeds.find(x => x.absenceTypeId === absence.absenceTypeId);

    this.isEditing = true;
    this.toggleForm(true);
  }

  /// <summary>
  /// Responsible for the event when an absence is created or updated
  onOperationCompleted($event: BaseResponseModel) {
    this.isEditing = false;
    this.toggleForm(false);
  }

  /// <summary>
  /// Opens the delete dialog for an absence
  /// </summary>
  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, title : string, content : string, objectToDelete: EntityWorkerAbsenceDTO) {
    const dialogRef = this.dialog.open(GenericDeleteWarningDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, deleteWarningTitle: title, deleteWarningMessage: content}
    });

    dialogRef.afterClosed().subscribe(async result =>{
      if(result){
        this.deleteAbsence(objectToDelete);
      };
    });
  }

  /// <summary>
  /// Deletes an absence from the list of absences
  /// </summary>
  async deleteAbsence(absenceInstance: EntityWorkerAbsenceDTO) {
    let index = this.entityWorkerAbsences.findIndex(x => x.entityWorkerAbsenceId === absenceInstance.entityWorkerAbsenceId);

    this.loadingScreenService.changeLoadingState(true);

    let response : BaseResponseModel = await this.absenceService.deleteAbsence(absenceInstance.entityWorkerAbsenceId);

    this.loadingScreenService.changeLoadingState(false);

    if(response.success){
      this.entityWorkerAbsences.splice(index, 1);
      this.absenceTable.renderRows();
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, response.message));
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
    }
}

  /// <summary>
  /// Edits an absence from the list of absences
  /// </summary
  editAbsence(absenceInstance: EntityWorkerAbsenceDTO) {
    if(absenceInstance.workerId !== this.loggedUser.workerId){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, NOT_OWNER_OF_INTANCE_CONTENT));
    }
    else{
      this.onAbsenceToEdit(absenceInstance);
    }
      
  }

  /// <summary>
  /// Submits a decision approval or rejection for an absence
  /// </summary>
  async applyDecision(absence: EntityWorkerAbsenceDTO, decisionResult: boolean) {
    let validationResult = this.validateDecisionData();

    if(!validationResult.success) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResult.message));
      return;
    }
    else{
      let absenceApprovalDecision : AbsenceApprovalDecisionDTO = new AbsenceApprovalDecisionDTO(absence.entityWorkerAbsenceId, decisionResult, this.loggedUser.workerId, '');

      this.loadingScreenService.changeLoadingState(true);

      let apiResponse = await this.absenceService.absenceApprovalDecision(absenceApprovalDecision);

      this.loadingScreenService.changeLoadingState(false);

      if(apiResponse.success){
        let index = this.entityWorkerAbsences.findIndex(x => x.entityWorkerAbsenceId === absence.entityWorkerAbsenceId);
        this.entityWorkerAbsences[index] = apiResponse.result;
        this.absenceTable.renderRows();
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Decision successfully applied.'));
      }
      else{
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }
    }
  }

  /// <summary>
  /// Enables an absence decision to be edited
  /// </summary>
  editDecision(absence: EntityWorkerAbsenceDTO) {
    let validateDecisionData = this.validateDecisionData();
    
    if(!validateDecisionData.success){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validateDecisionData.message));
      return;
    }

    absence.absenceDecisionBeingEdited = true;
  }

  cancelEditDecision(absence: EntityWorkerAbsenceDTO) {
    absence.absenceDecisionBeingEdited = false;
  }

  /// <summary>
  /// Handles the selection of an absence type
  /// </summary>
  onAbsenceTypeChange($event: MatSelectChange) {
    this.selectedAbsenceType = $event.value;
  }

  /// <summary>
  /// Saves an absence to the server
  /// </summary>
  async saveAbsence() {
    let validationResult = this.validateForm();

    if(!validationResult.success) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResult.message));
      return;
    }

    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    if(this.isEditing){
      this.selectedAbsence.absenceTypeId = this.selectedAbsenceType?.absenceTypeId ?? 0;
      this.selectedAbsence.absenceTypeDisplayValue = this.selectedAbsenceType?.absenceTypeLocalizedName ?? '';
      this.selectedAbsence.absenceApproverName = '';

      this.loadingScreenService.changeLoadingState(true);

      response = await this.absenceService.updateAbsence(this.selectedAbsence);

      this.loadingScreenService.changeLoadingState(false);

    }
    else{
      let newAbsence = new AddEntityWorkerAbsenceDTO(
        this.currentEntityId,
        this.loggedUser.workerId,
        this.selectedAbsenceType?.absenceTypeId ?? 0,
        this.selectedAbsence.observations,
        this.selectedAbsence.absenceStartDate,
        this.selectedAbsence.absenceEndDate,
        ''
      );

      this.loadingScreenService.changeLoadingState(true);
      
      response = await this.absenceService.addAbsence(newAbsence);

      this.loadingScreenService.changeLoadingState(false);
    }

    if(response.success) {
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Absence successfully saved.'));
      if(this.isEditing){
        let index = this.entityWorkerAbsences.findIndex(x => x.entityWorkerAbsenceId === this.selectedAbsence.entityWorkerAbsenceId);
        this.selectedAbsence = response.result;
        this.entityWorkerAbsences[index] = this.selectedAbsence;
      }
      else{
        this.entityWorkerAbsences.push(response.result);
      }

      this.isEditing = false;
      this.toggleForm(false);
      this.absenceTable.renderRows();
    }
    else {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
    }

  }

  /// <summary>
  /// Validates the form before sending the data to the server.
  /// </summary>
  private validateForm() : BaseResponseModel {
    let response = new BaseResponseModel(false, '', null);

    if(this.selectedAbsenceType === undefined) {
      response.message = 'Absence type is required.';
      return response;
    }

    else if(this.selectedAbsence.absenceStartDate === undefined) {
      response.message = 'Start date is required.';
      return response;
    }

    else if(this.selectedAbsence.absenceEndDate === undefined) {
      response.message = 'End date is required.';
      return response;
    }

    else if(this.selectedAbsence.absenceEndDate < this.selectedAbsence.absenceStartDate) {
      response.message = 'End date cannot be before start date.';
      return response;
    }

    response.success = true;
    return response;
  }

  /// <summary>
  /// Validates the decision data before sending it to the server.
  /// </summary>
  private validateDecisionData() : BaseResponseModel {
    let response = new BaseResponseModel(false, '', null);

    if(this.selectedAbsence === undefined) {
      response.message = 'Decision is required.';
      return response;
    }

    else if(this.entityWorkerAbsencesViewModel.isOwner === false) {
      response.message = 'You do not have permissions to apply decision regarding absences.';
      return response;
    }

    response.success = true;
    return response;
  }

  onAbsenceStartDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedAbsence.absenceStartDate = event.value as Date;
  }
  

  onAbsenceEndDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedAbsence.absenceEndDate = event.value as Date;
  }
}