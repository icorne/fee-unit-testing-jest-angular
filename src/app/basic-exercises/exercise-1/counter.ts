export class Counter {

  private counter = 0;

  increase(): void {
    this.counter++;
  }

  decrease(): void {
    this.counter--;
  }

  reset(): void {
    this.counter = 0;
  }

  getCounter(): number {
    return this.counter;
  }
}
