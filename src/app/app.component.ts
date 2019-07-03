import { Component } from '@angular/core';
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'fee2019-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(public languageService: LanguageService) {
  }

  changeLang(lang: string): void {
    this.languageService.setLang(lang);
  }

  isNotCurrentLang(lang: string): boolean {
    return this.languageService.getLang() !== lang;
  }
}
