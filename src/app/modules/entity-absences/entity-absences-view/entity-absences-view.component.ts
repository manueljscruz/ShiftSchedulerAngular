import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EntityWorkerAbsenceDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerAbsenceDTO';
import { MatTable } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AbsenceService } from '../../../core/services/api/AbsenceService';
import { DELETE_ABSENCE_CONTENT, DELETE_ABSENCE_TITLE, NOT_OWNER_OF_INTANCE_CONTENT } from '../../../shared/constants/UITextConstants';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import { OperationCompletedPayload } from '../../../shared/models/interfaces/OperationCompletedPayload';
import { SingleIdentifierDTO } from '../../../shared/models/DTOs/Outgoing/SingleIdentifierDTO';
import { GenericWarningDialogComponent } from '../../../shared/components/generic-warning-dialog/generic-warning-dialog.component';

@Component({
  selector: 'entity-absences-view',
  templateUrl: './entity-absences-view.component.html',
  styleUrl: './entity-absences-view.component.css'
})
export class EntityAbsencesViewComponent {

  DELETE_ABSENCE_TITLE = DELETE_ABSENCE_TITLE;
  DELETE_ABSENCE_CONTENT = DELETE_ABSENCE_CONTENT;
  NOT_OWNER_OF_INTANCE_CONTENT = NOT_OWNER_OF_INTANCE_CONTENT;

  @Input() currentWorkerId: string = '';
  @Input() entityWorkerAbsences: EntityWorkerAbsenceDTO[] = [];
  @Input() isEntityOwner: boolean = false;
  @Input() onOperationCompletedObservable : Observable<OperationCompletedPayload<EntityWorkerAbsenceDTO>> | undefined; 
  @Output() editAbsenceEvent = new EventEmitter<EntityWorkerAbsenceDTO>();
  @ViewChild(MatTable) absenceTable!: MatTable<EntityWorkerAbsenceDTO>;
  private eventSubscription : Subscription | undefined;

  constructor(private dialog: MatDialog,
    private absenceService: AbsenceService,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
  ){
    this.isEntityOwner = false;
  }

  ngOnInit() {
    this.onOperationCompletedObservable?.subscribe((payload: OperationCompletedPayload<EntityWorkerAbsenceDTO>) => {
      this.handleOperationCompletedEvent(payload);
    });
  }

  /// <summary>
  /// Opens the delete dialog for an absence
  /// </summary>
  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, title : string, content : string, objectToDelete: EntityWorkerAbsenceDTO) {
    const dialogRef = this.dialog.open(GenericWarningDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, warningTitle: title, warningMessage: content, isDeleteWarning: true },
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

    let absenceId = new SingleIdentifierDTO(absenceInstance.entityWorkerAbsenceId);
    let response : BaseResponseModel = await this.absenceService.deleteAbsence(absenceId);

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
    if(absenceInstance.workerId !== this.currentWorkerId){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, NOT_OWNER_OF_INTANCE_CONTENT));
    }
    else
      this.editAbsenceEvent.emit(absenceInstance);
  }

  /// <summary>
  /// Submits a decision approval or rejection for an absence
  /// </summary>
  applyDecision(absence: EntityWorkerAbsenceDTO, decisionResult: boolean) {
    
  }


  
  editDecision(absence: EntityWorkerAbsenceDTO) {
    
  }

  handleOperationCompletedEvent( payload : OperationCompletedPayload<EntityWorkerAbsenceDTO>) {
    if(payload.isDataToBeEdited){
      let index = this.entityWorkerAbsences.findIndex(x => x.entityWorkerAbsenceId === payload.data.entityWorkerAbsenceId);
      this.entityWorkerAbsences[index] = payload.data;
    }
    else{
      this.entityWorkerAbsences.push(payload.data);
    }

    this.absenceTable.renderRows();
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
