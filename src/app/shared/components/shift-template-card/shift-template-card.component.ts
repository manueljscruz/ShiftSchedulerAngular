import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShiftBreakTemplateDTO } from '../../models/DTOs/Incoming/ShiftBreakTemplateDTO';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'shift-template-card',
  templateUrl: './shift-template-card.component.html',
  styleUrl: './shift-template-card.component.css',
  providers: [DatePipe]
})
export class ShiftTemplateCardComponent {

  @Input() shiftTemplate: ShiftBreakTemplateDTO = new ShiftBreakTemplateDTO(0, 0, 0,'', '', new Date(), new Date(), false, false, false);
  @Input() isShiftBreakTemplate: boolean = false;
  @Output() selectShiftTemplateEvent = new EventEmitter<ShiftBreakTemplateDTO>();

  formattedStartTime: string = '';
  formattedDuration: string = '';

  constructor(public datePipe : DatePipe) { }

  ngOnInit() {
    if (this.shiftTemplate) {
      this.formattedStartTime = this.formatStartTime(this.shiftTemplate.shiftBreakStartHour);
      this.formattedDuration = this.formatDuration(this.shiftTemplate.shiftBreakDuration);
    }
  }

  onSelectShiftTemplate() {
    this.selectShiftTemplateEvent.emit(this.shiftTemplate);
  }

  formatStartTime(startTime: Date): string {
    let splitTime = startTime.toString().split(':');
    let strStartTime = splitTime[0] + ':' + splitTime[1];
    return strStartTime;
}

/// <summary>
/// Formatted end time
/// </summary>
formatDuration(breakDuration : Date): string {
    let splitTime = breakDuration.toString().split(':');
    let hours = parseInt(splitTime[0]);
    let minutes = parseInt(splitTime[1]);
    return (hours > 0 ? hours + ' hour' + (hours > 1 ? 's' : '') : '') + ' ' + (minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's' : '') : '');
}
}
