import { Observable } from 'rxjs';

export class Api {

  getMessage(): Observable<string> {
    return new Observable<string>(observer => {
      setTimeout(() => {
        observer.next('HELLO WORLD');
      }, 2000);
    });
  }
}
