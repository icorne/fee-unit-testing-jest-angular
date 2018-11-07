import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translateService: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translateService.use('en');
  }

  setLang(lang: string): void {
    if (lang === 'en' || lang === 'nl') {
      this.translateService.use(lang);
    } else {
      this.translateService.use('en');
    }
  }

  getLang(): string {
    return this.translateService.currentLang;
  }
}
