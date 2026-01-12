import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public returnLocalization(): string{
    if (isPlatformBrowser(this.platformId)) {
      let userLanguage = navigator.language;

      if (userLanguage.includes('-')) {
        userLanguage = userLanguage.split('-')[0];
      }

      return userLanguage;
    }

    // Fallback for SSR
    return 'en';
  }
}
