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

  @Input() shiftTemplate: any;
  @Input() isShiftBreakTemplate: boolean = false;
  @Output() selectShiftTemplateEvent = new EventEmitter<any>();


  templateName: string = '';
  templateAlias: string = '';
  formattedStartTime: string = '';
  formattedDuration: string = '';

  constructor(public datePipe : DatePipe) { }

  ngOnInit() {
    if(this.isShiftBreakTemplate) {
      this.shiftTemplate = this.shiftTemplate as ShiftBreakTemplateDTO;

      this.templateName = this.shiftTemplate.shiftBreakTemplateName;
      this.templateAlias = this.shiftTemplate.shiftBreakTypeDisplayValue;
      this.formattedStartTime = this.formatStartTime(this.shiftTemplate.shiftBreakStartHour);
      this.formattedDuration = this.formatDuration(this.shiftTemplate.shiftBreakDuration);
    }

    else {
      this.templateName = this.shiftTemplate.shiftTemplateName;
      this.templateAlias = this.shiftTemplate.shiftTemplateAlias;
      this.formattedStartTime = this.formatStartTime(this.shiftTemplate.shiftStartHour);
      this.formattedDuration = this.formatDuration(this.shiftTemplate.shiftDuration);
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
