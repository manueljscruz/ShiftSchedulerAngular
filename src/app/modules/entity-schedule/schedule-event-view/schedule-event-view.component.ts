import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ScheduleEntryDTO } from '../../../shared/models/DTOs/Incoming/ScheduleEntryDTO';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'schedule-event-view',
  templateUrl: './schedule-event-view.component.html',
  styleUrl: './schedule-event-view.component.css'
})
export class ScheduleEventViewComponent {


  @Input() scheduleEntry: ScheduleEntryDTO = ScheduleEntryDTO.newScheduleEntryDTO();

  constructor() {
    
   }

  ngOnInit(): void {
    console.log("Schedule Event View Component Initialized");
    console.log("Schedule Entry: ", this.scheduleEntry);

    if(this.scheduleEntry?.scheduleParticipants) {
      for (let participant of this.scheduleEntry.scheduleParticipants) {
        if(participant?.assignedSkills?.length === 0 && participant.worker?.skillSet) {
          participant.assignedSkills = [...participant.worker.skillSet]; // Assign all skills if none are selected
        }
      }
    }
  }

}
