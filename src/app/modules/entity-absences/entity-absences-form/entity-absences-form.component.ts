import { Component, Input } from '@angular/core';
import { AbsenceTypeLocalizedDTO } from '../../../shared/models/DTOs/Incoming/AbsenceTypeLocalizedDTO';
import { EntityWorkerAbsenceDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerAbsenceDTO';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'entity-absences-form',
  templateUrl: './entity-absences-form.component.html',
  styleUrl: './entity-absences-form.component.css'
})
export class EntityAbsencesFormComponent {
saveAbsence() {
throw new Error('Method not implemented.');
}

  @Input() entityWorkerAbsenceTypes?: AbsenceTypeLocalizedDTO[] = [];
  @Input() isEditing: boolean = false;
  @Input() absenceToEdit: EntityWorkerAbsenceDTO = new EntityWorkerAbsenceDTO('','','',0,'','',new Date(),new Date(),false,'', '', new Date());

  selectedAbsenceType?: AbsenceTypeLocalizedDTO;

  constructor() { }

  onAbsenceTypeChange($event: MatSelectChange) {
    this.selectedAbsenceType = $event.value;
  }

}
