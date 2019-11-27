import {Api} from './api';

export class Counter {

  private _counter = 0;
  private _message: string;

  constructor(private api: Api) {
  }

  async getMessage(): Promise<string> {
    return this._message;
  }

  async increase(): Promise<void> {
    this._counter++;
    this._message = await this.api.getMessage().toPromise();
  }

  async decrease(): Promise<void> {
    this._counter = this._counter === 0 ? 0 : this._counter - 1;
  }

  async reset(): Promise<void> {
    this._counter = 0;
  }

  async getCounter(): Promise<number> {
    return this._counter;
  }
}
