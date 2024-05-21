import { Component, Input } from '@angular/core';
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

  formattedStartTime: string = '';
  formattedDuration: string = '';

  constructor(public datePipe : DatePipe) { }

  ngOnInit() {
    if (this.shiftTemplate) {
      this.formattedStartTime = this.getFormattedStartTime(this.shiftTemplate.ShiftBreakStartHour);
      this.formattedDuration = this.getFormattedDuration(this.shiftTemplate.ShiftBreakDuration);
    }
  }

  getFormattedStartTime(startTime: any): string {
    const date = new Date(startTime);
    return this.datePipe.transform(date, 'HH:mm') ? this.datePipe.transform(date, 'HH:mm') : '';
  }

  formatDuration(durationInMinutes: number): string {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours > 0 ? hours + ' hour' + (hours > 1 ? 's' : '') : ''} ${minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's' : '') : ''}`.trim();
  }

  getFormattedDuration(duration: any): string {
    const minutes = typeof duration === 'number' ? duration : parseInt(duration, 10);
    return this.formatDuration(minutes);
  }
}
