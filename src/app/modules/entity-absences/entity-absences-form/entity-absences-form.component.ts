import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { AbsenceTypeLocalizedDTO } from '../../../shared/models/DTOs/Incoming/AbsenceTypeLocalizedDTO';
import { EntityWorkerAbsenceDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerAbsenceDTO';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import { AddEntityWorkerAbsenceDTO } from '../../../shared/models/DTOs/Outgoing/AddEntityWorkerAbsenceDTO';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { AbsenceService } from '../../../core/services/api/AbsenceService';

@Component({
  selector: 'entity-absences-form',
  templateUrl: './entity-absences-form.component.html',
  styleUrl: './entity-absences-form.component.css'
})
export class EntityAbsencesFormComponent{

  // @Input() triggerAbsenceForm: Observable<void> | undefined;
  @Input() entityWorkerAbsenceTypes?: AbsenceTypeLocalizedDTO[] = [];
  @Input() isEditing: boolean = false;
  @Input() entityId: string = '';
  @Input() workerId: string = '';
  @Input() absenceToEdit: EntityWorkerAbsenceDTO = EntityWorkerAbsenceDTO.newEntityWorkerAbsenceDTO();
  @Output() operationCompleted : EventEmitter<BaseResponseModel> = new EventEmitter<BaseResponseModel>();
  selectedAbsenceType?: AbsenceTypeLocalizedDTO;
  private eventSubscription : Subscription | undefined;

  constructor(
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private absenceService: AbsenceService
  ) {
    
   }

  ngOnInit() {
    /*
    this.eventSubscription = this.triggerAbsenceForm?.subscribe(() => {
      this.setupForm();
    });
    */
  }

  ngOnCheck() {
    this.setupForm();
  }

  setupForm() {
    if(this.isEditing) {
      this.selectedAbsenceType = this.entityWorkerAbsenceTypes?.find(x => x.absenceTypeId === this.absenceToEdit.absenceTypeId);
    }
    else
      this.selectedAbsenceType = this.entityWorkerAbsenceTypes?.[0];

    console.log(this.selectedAbsenceType);
  }

  onAbsenceTypeChange($event: MatSelectChange) {
    this.selectedAbsenceType = $event.value;
  }

  async saveAbsence() {
    let validationResult = this.validateForm();

    if(!validationResult.success) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResult.message));
      return;
    }

    let response : BaseResponseModel = new BaseResponseModel(false, '', null);

    if(this.isEditing){
      this.absenceToEdit.absenceTypeId = this.selectedAbsenceType?.absenceTypeId ?? 0;
      this.absenceToEdit.absenceTypeDisplayValue = this.selectedAbsenceType?.absenceTypeLocalizedName ?? '';

      this.loadingScreenService.changeLoadingState(true);

      response = await this.absenceService.updateAbsence(this.absenceToEdit);

      this.loadingScreenService.changeLoadingState(false);

    }
    else{
      let test = this.absenceToEdit.absenceStartDate.getTimezoneOffset();
      let newAbsence = new AddEntityWorkerAbsenceDTO(
        this.entityId,
        this.workerId,
        this.selectedAbsenceType?.absenceTypeId ?? 0,
        this.absenceToEdit.observations,
        this.absenceToEdit.absenceStartDate,
        this.absenceToEdit.absenceEndDate,
        this.absenceToEdit.absenceStartDate.getTimezoneOffset(),
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        ''
      );

      this.loadingScreenService.changeLoadingState(true);
      
      response = await this.absenceService.addAbsence(newAbsence);

      this.loadingScreenService.changeLoadingState(false);
    }

    if(response.success) {
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Absence successfully saved.'));
      this.operationCompleted.emit(response);
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

    else if(this.absenceToEdit.absenceStartDate === undefined) {
      response.message = 'Start date is required.';
      return response;
    }

    else if(this.absenceToEdit.absenceEndDate === undefined) {
      response.message = 'End date is required.';
      return response;
    }

    else if(this.absenceToEdit.absenceEndDate < this.absenceToEdit.absenceStartDate) {
      response.message = 'End date cannot be before start date.';
      return response;
    }

    response.success = true;
    return response;
  }

  formatDateString(dateString: string): string {
    const date = new Date(dateString);
    // Convert to local time
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  }

  ngOnDestroy() {
    this.eventSubscription?.unsubscribe();
  }
}
