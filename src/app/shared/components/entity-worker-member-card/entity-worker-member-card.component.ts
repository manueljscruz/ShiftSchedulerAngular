import { Component, Input } from '@angular/core';
import { EntityWorkerMemberDTO } from '../../models/DTOs/Incoming/EntityWorkerMemberDTO';

@Component({
  selector: 'entity-worker-member-card',
  templateUrl: './entity-worker-member-card.component.html',
  styleUrl: './entity-worker-member-card.component.css'
})
export class EntityWorkerMemberCardComponent {

  @Input() entityWorkerMember?: EntityWorkerMemberDTO;

  constructor() {
    
  }
}
