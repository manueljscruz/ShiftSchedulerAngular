import { Injectable } from '@angular/core';
import { off } from 'node:process';

@Injectable({
  providedIn: 'root'
})
export class DateDisplayService {

  constructor() { }

  public getCurrentOffset(): number {
    return new Date().getTimezoneOffset();
  }

  public getDisplayDate(date: Date, dateOffset : string): string {
    let dateFormat = new Date(date);
    let offset = this.translateOffset(dateOffset);
    if(Number.isNaN(offset))
      offset = this.getCurrentOffset();
    let dateWithOffset = new Date(dateFormat.getTime() + offset * 60000);

    return dateWithOffset.toISOString().split('T')[0];
  }

  private translateOffset(offset: string){
    const offsetArray = offset.split(':');
    const hours = parseInt(offsetArray[0]);
    const minutes = parseInt(offsetArray[1]);
    return hours*60 + minutes;
  }

  /**
   * Converts a date to the specified timezone using offset and timezoneId.
   * @param date The original date.
   * @param offsetMinutes The offset in minutes.
   * @param timezoneId The timezone identifier.
   * @param targetTimezone The target timezone identifier.
   * @returns The converted Date object.
   */
  convertDateToTimezone(date: Date | string, offsetMinutes: number, timezoneId: string, targetTimezone: string): Date {
    // If date is a string, convert to Date
    const originalDate = typeof date === 'string' ? new Date(date) : date;

    // Adjust the date by the offset
    const utcDate = new Date(originalDate.getTime() - offsetMinutes * 60000);

    // Return the date in the target timezone (basic implementation)
    // For more accurate conversion, use a library like luxon or moment-timezone
    return utcDate;
  }
}
