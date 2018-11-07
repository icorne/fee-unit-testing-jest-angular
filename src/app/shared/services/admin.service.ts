import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() {
  }

  getAmountOfPages(isbn: string): Observable<number> {
    return of(Math.floor(Math.random() * 500) + 50);
  }
}
