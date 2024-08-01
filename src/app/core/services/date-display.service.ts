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
}
