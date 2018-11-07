import {LanguageService} from './language.service';
import {TranslateServiceStub} from '../stubs/translate.service.stub';
import {TranslateService} from '@ngx-translate/core';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    service = new LanguageService(new TranslateServiceStub() as TranslateService);
  });

  it('should create the LanguageService', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to set the language', () => {
    // ARRANGE
    // ACT
    service.setLang('en');

    // ASSERT
    expect(service.getLang()).toEqual('en');

    // ACT
    service.setLang('nl');

    // ASSERT
    expect(service.getLang()).toEqual('nl');
  });

  it('should be able to default to en language when not know lang is given', () => {
    // ARRANGE
    // ACT
    service.setLang('errrr');

    // ASSERT
    expect(service.getLang()).toEqual('en');
  });

  it('should default to en language when none is given', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(service.getLang()).toEqual('en');
  });
});
