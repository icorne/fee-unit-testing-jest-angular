export class TranslateServiceStub {

  public currentLang: string;

  setDefaultLang(lang: string): void {
  }

  use(lang: string): void {
    this.currentLang = lang;
  }

  instant(key: string): string {
    return key;
  }
}
