import { Api } from './api';

export class Counter {

  private _counter = 0;
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
    this._counter++;
    this.api.getMessage()
      .subscribe((message: string) => this.message = message);
  }

  decrease(): void {
    this._counter = this._counter === 0 ? 0 : this._counter - 1;
  }

  reset(): void {
    this._counter = 0;
  }

  get counter(): number {
    return this._counter;
  }
}
