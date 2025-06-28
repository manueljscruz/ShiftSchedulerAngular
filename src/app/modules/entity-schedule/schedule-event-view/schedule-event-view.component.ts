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
    // Initialization logic can go here
  }

}
