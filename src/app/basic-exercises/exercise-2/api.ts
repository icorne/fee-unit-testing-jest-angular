import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export class Api {

  getMessage(): Observable<string> {
    return of('HELLO WORLD').pipe(delay(20000));
  }
}
