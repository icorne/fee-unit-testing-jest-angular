import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let languageService: LanguageService;
  let currentLang: string;
  let translateServiceMock: { [key: string]: jest.Mock | any };
  beforeEach(() => {
    translateServiceMock = {
      use: jest.fn(),
      setDefaultLang: jest.fn(),
      get currentLang(): string {
        return currentLang;
      },
    };
    // translateServiceMock.use.mockImplementation((lang) => currentLang = lang);
    // translateServiceMock.setDefaultLang.mockImplementation((lang) => defaultLang = lang);
    languageService = new LanguageService(translateServiceMock as any as TranslateService);
  });
  it('calls use with en', () => {
    expect(translateServiceMock.use).toHaveBeenCalledWith('en');
  });
  it('calls use with en', () => {
    expect(translateServiceMock.setDefaultLang).toHaveBeenCalledWith('en');
  });

  it('.getLang() returns currentLang', () => {
    currentLang = 'nl';
    expect(languageService.getLang()).toBe(currentLang);
  });
  describe('.setLang() ', () => {
    it('with nl sets to nl', () => {
      const lang = 'nl';
      languageService.setLang(lang);
      expect(translateServiceMock.use).toHaveBeenCalledWith(lang);
    });
    it('with en sets to en', () => {
      const lang = 'en';
      languageService.setLang(lang);
      expect(translateServiceMock.use).toHaveBeenCalledWith(lang);
    });
    it('with other sets to en', () => {
      const lang = 'fr';
      languageService.setLang(lang);
      expect(translateServiceMock.use).toHaveBeenCalledWith('en');
    });
  });
});
