import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import {ErrorInterceptor} from './error.interceptor';
import {ModalService} from '../services/modal.service';
import {ModalServiceStub} from '../stubs/modal.service.stub';

describe('ErrorInterceptor', () => {

  let service: ErrorInterceptor;
  let modalService: ModalServiceStub;

  const err1: object = {error: 'err1', headers: {} as HttpHeaders, status: 500, statusText: '', url: ''};
  const err2: object = {error: {message: 'err2'}, headers: {} as HttpHeaders, status: 500, statusText: '', url: ''};
  const err3: object = {message: 'err3', headers: {} as HttpHeaders, status: 500, statusText: '', url: ''};
  const okk: object = {error: 'none', headers: {} as HttpHeaders, status: 200, statusText: '', url: ''};

  const errorResponse1: HttpErrorResponse = new HttpErrorResponse(err1);
  const errorResponse2: HttpErrorResponse = new HttpErrorResponse(err2);
  const errorResponse3: HttpErrorResponse = new HttpErrorResponse(err3);
  const errorResponse4: any = 'TEST';
  const okResponse: HttpResponse<any> = new HttpResponse(okk);

  const nextError1: HttpHandler = {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
      return throwError(errorResponse1);
    }
  };

  const nextError2: HttpHandler = {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
      return throwError(errorResponse2);
    }
  };

  const nextError3: HttpHandler = {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
      return throwError(errorResponse3);
    }
  };

  const nextError4: HttpHandler = {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
      return throwError(errorResponse4);
    }
  };

  const nextOk: HttpHandler = {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
      return of(okResponse);
    }
  };

  beforeEach(() => {
    modalService = new ModalServiceStub();
    service = new ErrorInterceptor(modalService as ModalService);
  });

  it('should create the ErrorInterceptor', () => {
    expect(service).toBeTruthy();
  });

  it('should open a modal on error and return the error', () => {
    spyOn(modalService, 'open');

    service.intercept({} as any, nextError1).subscribe(() => {
    }, (error) => {
      expect(modalService.open).toHaveBeenCalledWith('err1');
      expect(error).toEqual(errorResponse1);
    });
  });

  it('should open a modal on error and return the error', () => {
    spyOn(modalService, 'open');

    service.intercept({} as any, nextError2).subscribe(() => {
    }, (error) => {
      expect(modalService.open).toHaveBeenCalledWith('err2');
      expect(error).toEqual(errorResponse2);
    });
  });

  it('should open a modal on error and return the error', () => {
    spyOn(modalService, 'open');

    service.intercept({} as any, nextError3).subscribe(() => {
    }, (error) => {
      expect(modalService.open)
        .toHaveBeenCalledWith('Http failure response for (unknown url): 500 ');
      expect(error).toEqual(errorResponse3);
    });
  });

  it('should not open a model when an unexpected error occurs and return the error', () => {
    spyOn(modalService, 'open');

    service.intercept({} as any, nextError4).subscribe(() => {
    }, (error) => {
      expect(modalService.open).not.toHaveBeenCalled();
      expect(error).toEqual(errorResponse4);
    });
  });

  it('should not open a modal on a valid request', () => {
    spyOn(modalService, 'open');
    service.intercept({} as any, nextOk).subscribe(() => {
      expect(modalService.open).not.toHaveBeenCalled();
    });
  });
});
