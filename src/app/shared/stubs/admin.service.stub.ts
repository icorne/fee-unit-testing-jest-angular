import {Observable, of} from 'rxjs';

export class AdminServiceStub {

  getAmountOfPages(isbn: string): Observable<number> {
    return of(55);
  }
}
