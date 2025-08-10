import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleEntryDTO } from '../../../shared/models/DTOs/Incoming/ScheduleEntryDTO';
import { CANCEL_ICON } from '../../../shared/constants/IconNamesConstants';

@Component({
  selector: 'schedule-event-view-holder',
  templateUrl: './schedule-event-view-holder.component.html',
  styleUrl: './schedule-event-view-holder.component.css'
})
export class ScheduleEventViewHolderComponent {

  CANCEL_ICON = CANCEL_ICON;
  scheduleEntries: ScheduleEntryDTO[] = [];

  isCurrentUserEntityOwner: boolean = false;

  @Output() closeOp = new EventEmitter<boolean>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.scheduleEntries = data.scheduleEntries || [];
    this.isCurrentUserEntityOwner = data.isCurrentUserEntityOwner;
   }

  ngOnInit(): void {
    // Initialization logic can go here
  }

  closeDialog() {
    this.closeOp.emit(true);
  }

}
