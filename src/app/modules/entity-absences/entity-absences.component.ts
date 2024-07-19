import { Component } from '@angular/core';
import { EntityWorkerAbsenceViewModel } from '../../shared/models/VM/EntityWorkerAbsenceViewModel';
import { EntityWorkerAbsenceDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerAbsenceDTO';
import { WorkerDTO } from '../../shared/models/DTOs/Incoming/WorkerDTO';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { BaseViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { AbsenceService } from '../../core/services/api/AbsenceService';

@Component({
  selector: 'entity-absences',
  templateUrl: './entity-absences.component.html',
  styleUrl: './entity-absences.component.css'
})
export class EntityAbsencesComponent {

  /// <summary>
  /// Logged user object
  /// </summary>
  public loggedUser: WorkerDTO = new WorkerDTO();

  /// <summary>
  /// Current entity id
  /// </summary>
  private currentEntityId: string = '';

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
  /// Selected absence being worked on
  /// </summary
  selectedAbsence : EntityWorkerAbsenceDTO = EntityWorkerAbsenceDTO.newEntityWorkerAbsenceDTO();

  testAbsence : EntityWorkerAbsenceDTO;

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private absenceService: AbsenceService) { 
      this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
    this.testAbsence = new EntityWorkerAbsenceDTO(
      '',
      '',
      '',
      1,
      "Test Absence Display",
      'Obs',
      new Date(),
      new Date(),
      false,
      '',
      "",
      new Date()
    );

    this.entityWorkerAbsencesViewModel.entityWorkerAbsences.push(this.testAbsence);
    
  }

  async ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

    // Turn on the loading spinner
    this.loadingScreenService.changeLoadingState(true);
    
    let entityRuleViewModelRequestDTO = new BaseViewModelRequestDTO(this.currentEntityId, this.loggedUser.workerId, '');
    this.entityWorkerAbsencesViewModel = await this.absenceService.getAbsenceViewModel(entityRuleViewModelRequestDTO);

    this.loadingScreenService.changeLoadingState(false);
  }

  toggleFormToCreate() {
    this.selectedAbsence = EntityWorkerAbsenceDTO.newEntityWorkerAbsenceDTO();
    this.isEditing = false;
    this.toggleForm(true);
  }

  /// <summary>
  /// Responsible for toggling the form
  /// </summary>
  toggleForm(newState: boolean) {
    this.isFormActive = newState;
  }

  /// <summary>
  /// Responsible for the event when an absence is selected to be edited
  /// </summary>
  onAbsenceToEdit(absence: EntityWorkerAbsenceDTO) {
    this.selectedAbsence = absence;
    console.log(this.selectedAbsence);
    this.isEditing = true;
    this.toggleForm(true);
  }

}