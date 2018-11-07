import {Api} from './api';

export class Counter {

  private counter = 0;
  private _message: string;

  constructor(private api: Api) {
  }

  set message(message: string) {
    this._message = message;
  }

  get message(): string {
    return this._message;
  }

  increase(): void {
    this.counter++;
    this.api.getMessage().subscribe((message: string) => {
      this.message = message;
    });
  }

  decrease(): void {
    this.counter = this.counter === 0 ? 0 : this.counter - 1;
  }

  reset(): void {
    this.counter = 0;
  }

  getCounter(): number {
    return this.counter;
  }
}
