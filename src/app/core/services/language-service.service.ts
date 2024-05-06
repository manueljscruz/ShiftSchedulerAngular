import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {

  constructor() { }

  public returnLocalization(): string{
    let userLanguage = navigator.language;
    if(userLanguage.indexOf('-') > 0)
    {
      userLanguage = userLanguage.split('-')[0];
    }
    return userLanguage;
  }
}
