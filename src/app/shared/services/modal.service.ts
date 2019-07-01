import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  open(message: string): Promise<void> {
    return new Promise<void>(resolve => resolve());
  }
}
