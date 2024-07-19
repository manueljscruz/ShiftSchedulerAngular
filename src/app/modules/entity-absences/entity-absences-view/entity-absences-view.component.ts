import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityWorkerAbsenceDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerAbsenceDTO';

@Component({
  selector: 'entity-absences-view',
  templateUrl: './entity-absences-view.component.html',
  styleUrl: './entity-absences-view.component.css'
})
export class EntityAbsencesViewComponent {

  @Input() entityWorkerAbsences: EntityWorkerAbsenceDTO[] = [];
  @Input() isEntityOwner: boolean = false;
  @Output() editAbsenceEvent = new EventEmitter<EntityWorkerAbsenceDTO>();

  constructor(){
    this.isEntityOwner = false;
  }


  /// <summary>
  /// Deletes an absence from the list of absences
  /// </summary>
  deleteAbsence(absenceInstance: EntityWorkerAbsenceDTO) {
    
  }

  /// <summary>
  /// Edits an absence from the list of absences
  /// </summary
  editAbsence(absenceInstance: EntityWorkerAbsenceDTO) {
    this.editAbsenceEvent.emit(absenceInstance);
  }

  /// <summary>
  /// Submits a decision approval or rejection for an absence
  /// </summary>
  applyDecision(absence: EntityWorkerAbsenceDTO, decisionResult: boolean) {
    
  }


  
  editDecision(absence: EntityWorkerAbsenceDTO) {
    
  }

}
