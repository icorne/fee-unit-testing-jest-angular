import { Counter } from './counter';

describe('Counter1', () => {
  let actual: Counter;
  beforeEach(() => {
    actual = new Counter();
  });
  test('should be init with 0', () => {
    expect(actual.getCounter()).toBe(0);
  });
  test('Increasing the counter three times should result in the counter having a count of 3.', () => {
    actual.increase();
    actual.increase();
    actual.increase();
    expect(actual.getCounter()).toBe(3);
  });
  test('Decreasing it once and then increasing it three times should result in the counter having a count of 3.', () => {
    actual.decrease();
    actual.increase();
    actual.increase();
    actual.increase();
    expect(actual.getCounter()).toBe(3);
  });
  test('Increasing the counter twice and resetting it should result in the counter having a count of 0.', () => {
    actual.increase();
    actual.increase();
    actual.reset();
    expect(actual.getCounter()).toBe(0);
  });
});
