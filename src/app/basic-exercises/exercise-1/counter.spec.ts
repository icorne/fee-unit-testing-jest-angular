import {Counter} from './counter';

describe('Counter1', () => {

  // TODO: Add unit tests here

  let counter: Counter;

  beforeEach(() => {
    counter = new Counter();
  });

  it('should create the counter', () => {
    const newCounter = new Counter();
    expect(newCounter).toBeTruthy();
  });

  it('should be 0 on initial', () => {
    expect(counter.getCounter()).toEqual(0);
  });

  it('should be able to increment', () => {
    counter.increase();
    counter.increase();
    counter.increase();
    expect(counter.getCounter()).toEqual(3);
  });

  it('should be able to decrease', () => {
    counter.decrease();
    counter.increase();
    counter.increase();
    counter.increase();
    expect(counter.getCounter()).toEqual(2);
  });

  it('should be able to reset', () => {
    counter.increase();
    counter.reset();
    expect(counter.getCounter()).toEqual(0);
  });

  xit('should not be able to go below 0', () => {
    counter.decrease();
    expect(counter.getCounter()).toEqual(0);
  });
});
