import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ModalService } from '../services/modal.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private modalService: ModalService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(val => this.handleError(val)));
  }

  private handleError(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (response instanceof HttpErrorResponse) {
      let errorMessage: string;
      const error = response.error;
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = response.message;
      }

      this.modalService.open(errorMessage);
    }
    return throwError(response);
  }
}
