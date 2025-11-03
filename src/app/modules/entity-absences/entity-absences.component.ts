import { Component, ViewChild } from '@angular/core';
import { EntityWorkerAbsenceViewModel } from '../../shared/models/VM/EntityWorkerAbsenceViewModel';
import { EntityWorkerAbsenceDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerAbsenceDTO';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { BaseViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { AbsenceService } from '../../core/services/api/AbsenceService';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { DELETE_ABSENCE_CONTENT, DELETE_ABSENCE_TITLE, NOT_OWNER_OF_INTANCE_CONTENT } from '../../shared/constants/UITextConstants';
import { MatTable } from '@angular/material/table';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { AbsenceTypeLocalizedDTO } from '../../shared/models/DTOs/Incoming/AbsenceTypeLocalizedDTO';
import { MatSelectChange } from '@angular/material/select';
import { AddEntityWorkerAbsenceDTO } from '../../shared/models/DTOs/Outgoing/AddEntityWorkerAbsenceDTO';
import { AbsenceApprovalDecisionDTO } from '../../shared/models/DTOs/Outgoing/AbsenceApprovalDecisionDTO';
import { DateDisplayService } from '../../core/services/date-display.service';
import { MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { SingleIdentifierDTO } from '../../shared/models/DTOs/Outgoing/SingleIdentifierDTO';
import { PageEvent } from '@angular/material/paginator';
import { PagedModelRequest } from '../../shared/models/DTOs/Outgoing/PagedModelRequest';
import { PagedList } from '../../shared/models/DTOs/Incoming/PagedList';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';

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
  public loggedUser: UserDTO = new UserDTO();

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
  entityWorkerAbsencesViewModel : EntityWorkerAbsenceViewModel = new EntityWorkerAbsenceViewModel(false, PagedList.Empty(), []);

  /// <summary>
  /// Absences data
  /// </summary>
  entityWorkerAbsences: PagedList<EntityWorkerAbsenceDTO> = PagedList.Empty();

  /// <summary>
  /// Selected absence being worked on
  /// </summary
  selectedAbsence : EntityWorkerAbsenceDTO = EntityWorkerAbsenceDTO.newEntityWorkerAbsenceDTO();

  /// <summary>
  /// Selected absence type for the absence
  /// </summary>
  selectedAbsenceType?: AbsenceTypeLocalizedDTO;

  @ViewChild(MatTable) absenceTable!: MatTable<EntityWorkerAbsenceDTO>;

  currentPageIndex = 0;

  pageSize = 10;

  totalItems = 0;

  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private absenceService: AbsenceService,
    private dateDisplayService: DateDisplayService) { 
      this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
  }

  //#region Methods

  //#region Ng On Init

  async ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

    // Turn on the loading spinner
    this.loadingScreenService.changeLoadingState(true);
    
    let entityRuleViewModelRequestDTO = new BaseViewModelRequestDTO(this.currentEntityId, this.loggedUser.userId, '');
    this.entityWorkerAbsencesViewModel = await this.absenceService.getAbsenceViewModel(entityRuleViewModelRequestDTO);
    this.handleAbsenceDateDisplay(this.entityWorkerAbsencesViewModel.entityWorkerAbsences);

    this.loadingScreenService.changeLoadingState(false);
  }

  //#endregion

  //#region GetAbsencesPage

  async GetAbsencesPage(nextPageIndex: number, pageSize: number) {

    let absencePageRequest : PagedModelRequest = {
      entityId: this.currentEntityId,
      workerId: this.loggedUser.userId,
      languageCode: '',
      currentPage: this.currentPageIndex,
      nextPage: nextPageIndex+1,
      itemsPerPage: pageSize,
    };

    this.loadingScreenService.changeLoadingState(true); 

    let data = await this.absenceService.getAbsencesPage(absencePageRequest);
    
    this.entityWorkerAbsencesViewModel.entityWorkerAbsences = data;

    this.handleAbsenceDateDisplay(this.entityWorkerAbsencesViewModel.entityWorkerAbsences);

    this.loadingScreenService.changeLoadingState(false);

  }

  //#region Handle Page Event

  async handlePageEvent($event: PageEvent) {
    this.currentPageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;

    await this.GetAbsencesPage(this.currentPageIndex, this.pageSize);
  }


  //#endregion

  //#region Handle Absence Date Display

  handleAbsenceDateDisplay(absences: PagedList<EntityWorkerAbsenceDTO>) {
    let currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    absences.data.forEach(absence => {
      if(absence.isFullDay){
        absence.absenceStartDate = this.dateDisplayService.convertDateToTimezone(absence.absenceStartDate, absence.timezoneId);
        absence.absenceEndDate = new Date(absence.absenceEndDate);
        absence.absenceEndDate.setHours(23,59,59,999);
      }
      else{
        absence.absenceStartDate = this.dateDisplayService.convertDateToTimezone(absence.absenceStartDate, absence.timezoneId);
        absence.absenceEndDate = this.dateDisplayService.convertDateToTimezone(absence.absenceEndDate, absence.timezoneId);
      }
      absence.absenceStartDateTime = this.formatTime(absence.absenceStartDate);
      absence.absenceEndDateTime = this.formatTime(absence.absenceEndDate);
    });

    this.entityWorkerAbsences = absences;
  }

  //#endregion

  //#region Toggle Form to Create

  toggleFormToCreate() {
    this.selectedAbsence = EntityWorkerAbsenceDTO.newEntityWorkerAbsenceDTO();
    this.selectedAbsence.absenceStartDate = new Date();
    this.selectedAbsence.absenceEndDate = new Date();

    this.isEditing = false;
    this.toggleForm(true);
  }

  //#endregion

  //#region Toggle Form

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

  //#endregion

  //#region On Absence To Edit

  /// <summary>
  /// Responsible for the event when an absence is selected to be edited
  /// </summary>
  onAbsenceToEdit(absence: EntityWorkerAbsenceDTO) {
    this.selectedAbsence = { ...absence};
    this.selectedAbsenceType = this.entityWorkerAbsencesViewModel.absenceTypeLocalizeds.find(x => x.absenceTypeId === absence.absenceTypeId);

    this.isEditing = true;
    this.toggleForm(true);
  }

  //#endregion

  //#region On Operation Completed

  /// <summary>
  /// Responsible for the event when an absence is created or updated
  onOperationCompleted($event: BaseResponseModel) {
    this.isEditing = false;
    this.toggleForm(false);
  }

  //#endregion

  //#region Open Delete Dialog

  /// <summary>
  /// Opens the delete dialog for an absence
  /// </summary>
  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, title : string, content : string, objectToDelete: EntityWorkerAbsenceDTO) {
    const dialogRef = this.dialog.open(GenericWarningDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, warningTitle: title, warningMessage: content, isDeleteWarning: true }
    });

    dialogRef.afterClosed().subscribe(async result =>{
      if(result){
        this.deleteAbsence(objectToDelete);
      };
    });
  }

  //#endregion

  //#region Delete Absence

  /// <summary>
  /// Deletes an absence from the list of absences
  /// </summary>
  async deleteAbsence(absenceInstance: EntityWorkerAbsenceDTO) {
    let index = this.entityWorkerAbsences.data.findIndex(x => x.entityWorkerAbsenceId === absenceInstance.entityWorkerAbsenceId);

    this.loadingScreenService.changeLoadingState(true);

    let absenceId = new SingleIdentifierDTO(absenceInstance.entityWorkerAbsenceId);
    let response : BaseResponseModel = await this.absenceService.deleteAbsence(absenceId);

    this.loadingScreenService.changeLoadingState(false);

    if(response.success){
      this.entityWorkerAbsences.data.splice(index, 1);
      this.absenceTable.renderRows();
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, response.message));
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
    }
  }

  //#endregion

  //#region Edit Absence

  /// <summary>
  /// Edits an absence from the list of absences
  /// </summary
  editAbsence(absenceInstance: EntityWorkerAbsenceDTO) {
    if(absenceInstance.workerId !== this.loggedUser.userId){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, NOT_OWNER_OF_INTANCE_CONTENT));
    }
    else{
      this.onAbsenceToEdit(absenceInstance);
    }
      
  }

  //#endregion

  //#region Apply Decision

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
      let absenceApprovalDecision : AbsenceApprovalDecisionDTO = new AbsenceApprovalDecisionDTO(absence.entityWorkerAbsenceId, decisionResult, this.loggedUser.userId,Intl.DateTimeFormat().resolvedOptions().timeZone,'');

      this.loadingScreenService.changeLoadingState(true);

      let apiResponse = await this.absenceService.absenceApprovalDecision(absenceApprovalDecision);

      this.loadingScreenService.changeLoadingState(false);

      if(apiResponse.success){
        let index = this.entityWorkerAbsences.data.findIndex(x => x.entityWorkerAbsenceId === absence.entityWorkerAbsenceId);
        this.entityWorkerAbsences.data[index] = apiResponse.result;
        this.absenceTable.renderRows();
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Decision successfully applied.'));
      }
      else{
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }
    }
  }

  //#endregion

  //#region Edit Decision

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

  //#endregion

  //#region Cancel Edit Decision

  cancelEditDecision(absence: EntityWorkerAbsenceDTO) {
    absence.absenceDecisionBeingEdited = false;
  }

  //#endregion

  //#region On Absence Type Change

  /// <summary>
  /// Handles the selection of an absence type
  /// </summary>
  onAbsenceTypeChange($event: MatSelectChange) {
    this.selectedAbsenceType = $event.value;
  }

  //#endregion

  //#region Save Absence

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

    // Combine absenceStartDate and absenceStartDateTime (HH:mm) into a single Date
      let startDate = new Date(this.selectedAbsence.absenceStartDate);
      if (this.selectedAbsence.absenceStartDateTime) {
        const [hours, minutes] = this.selectedAbsence.absenceStartDateTime.split(':').map(Number);
        startDate.setHours(hours, minutes, 0, 0);
      }

      let endDate = new Date(this.selectedAbsence.absenceEndDate);
      if (this.selectedAbsence.absenceEndDateTime) {
        const [hours, minutes] = this.selectedAbsence.absenceEndDateTime.split(':').map(Number);
        endDate.setHours(hours, minutes, 0, 0);
      }

      this.selectedAbsence.absenceStartDate = startDate;
      this.selectedAbsence.absenceEndDate = endDate;

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
        this.loggedUser.userId,
        this.selectedAbsenceType?.absenceTypeId ?? 0,
        this.selectedAbsence.observations,
        startDate,
        endDate,
        startDate.getTimezoneOffset(),
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        ''
      );

      this.loadingScreenService.changeLoadingState(true);
      
      response = await this.absenceService.addAbsence(newAbsence);

      this.loadingScreenService.changeLoadingState(false);
    }

    if(response.success) {
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Absence successfully saved.'));
      if(this.isEditing){
        let index = this.entityWorkerAbsences.data.findIndex(x => x.entityWorkerAbsenceId === this.selectedAbsence.entityWorkerAbsenceId);
        this.selectedAbsence = response.result;
        this.entityWorkerAbsences.data[index] = this.selectedAbsence;
      }
      else{
        this.entityWorkerAbsences.data.push(response.result);
      }

      this.isEditing = false;
      this.toggleForm(false);
    }
    else {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
    }

  }

  //#endregion

  //#region Validate Form

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

    else if(
      !this.selectedAbsence.isFullDay &&
      (
        (this.selectedAbsence.absenceEndDate?.getTime() ?? 0) -
        (this.selectedAbsence.absenceStartDate?.getTime() ?? 0)
      ) > (24 * 60 * 60 * 1000)
    ) {
      response.message = 'For non full day absences, the maximum duration is 24 hours.';
      return response;
    }

    response.success = true;
    return response;
  }

  //#endregion

  //#region Validate Decision Data

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

  //#endregion

  //#region On Absence Start Date Change

  onAbsenceStartDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedAbsence.absenceStartDate = event.value as Date;
  }
  
  //#endregion

  //#region On Absence End Date Change

  onAbsenceEndDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedAbsence.absenceEndDate = event.value as Date;
  }

  //#endregion

  //#region On Is Full Day Change

  onFulldayFlagChange() {
    if(this.selectedAbsence.isFullDay) {
      this.selectedAbsence.absenceStartDate?.setHours(0,0,0,0);
      this.selectedAbsence.absenceEndDate?.setHours(23,59,59,999);
    }
    else{
      let now = new Date();
      this.selectedAbsence.absenceStartDate?.setHours(now.getHours(), now.getMinutes(), 0, 0);
      this.selectedAbsence.absenceEndDate?.setHours(now.getHours(), now.getMinutes(), 0, 0);
    }
  }

  //#endregion

  private formatTime(date: Date): string {
    if (!date) return '';
    try {
      date = new Date(date);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  }
}