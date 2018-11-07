import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {StubbedTranslatePipe} from './shared/stubs/translate.pipe.stub';
import {LanguageService} from './shared/services/language.service';
import {LanguageServiceStub} from './shared/stubs/language.service.stub';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, StubbedTranslatePipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: LanguageService, useClass: LanguageServiceStub}]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it(`should be able to change the language`, async(() => {
    // ARRANGE
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const mockedLanguageService = TestBed.get(LanguageService);
    spyOn(mockedLanguageService, 'setLang');

    // ACT
    app.changeLang('TT');

    // ASSERT
    expect(mockedLanguageService.setLang).toHaveBeenCalledWith('TT');
  }));

  it(`should be able to check the current language`, async(() => {
    // ARRANGE
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const mockedLanguageService = TestBed.get(LanguageService);
    spyOn(mockedLanguageService, 'getLang').and.returnValue('EN');

    // ACT
    app.isNotCurrentLang('TT');

    // ASSERT
    expect(mockedLanguageService.getLang).toHaveBeenCalled();
    expect(app.isNotCurrentLang('TT')).toEqual(true);
    expect(app.isNotCurrentLang('EN')).toEqual(false);
  }));
});
