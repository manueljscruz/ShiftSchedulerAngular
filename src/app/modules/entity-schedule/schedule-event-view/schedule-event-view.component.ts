import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { ScheduleEntryDTO } from '../../../shared/models/DTOs/Incoming/ScheduleEntryDTO';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'schedule-event-view',
  templateUrl: './schedule-event-view.component.html',
  styleUrl: './schedule-event-view.component.css'
})
export class ScheduleEventViewComponent {


  scheduleEntry: ScheduleEntryDTO = ScheduleEntryDTO.newScheduleEntryDTO();

  isCurrentUserEntityOwner: boolean = false;

  @Output() closeOp = new EventEmitter<boolean>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.scheduleEntry = data.scheduleEntry;
    this.isCurrentUserEntityOwner = data.isCurrentUserEntityOwner;
   }

  ngOnInit(): void {
    // Initialization logic can go here
  }

  closeDialog() {
    this.closeOp.emit(true);
  }

  // Add any additional methods or properties needed for the component
}
