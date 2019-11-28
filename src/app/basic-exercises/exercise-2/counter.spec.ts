import { of } from 'rxjs';
import { Counter } from './counter';

describe('Counter2', () => {

  let counter: Counter;
  let apiMock;
  beforeEach(() => {
    apiMock = {
      getMessage: jest.fn(),
    };
    apiMock.getMessage.mockImplementation(() => of('HELLO WORLD'));

    counter = new Counter(apiMock);
  });
  test('should be init with 0', async () => {
    const actual = await counter.getCounter();
    expect(actual).toBe(0);
  });
  test('Increasing the counter three times should result in the counter having a count of 3.', async () => {
    await counter.increase();
    await counter.increase();
    await counter.increase();
    const actual = await counter.getCounter();
    expect(actual).toBe(3);
  });
  test('Decreasing it once and then increasing it three times should result in the counter having a count of 3.', async () => {
    await counter.decrease();
    await counter.increase();
    await counter.increase();
    await counter.increase();
    const actual = await counter.getCounter();
    expect(actual).toBe(3);
  });
  test('Increasing the counter twice and resetting it should result in the counter having a count of 0.', async () => {
    await counter.increase();
    await counter.increase();
    await counter.reset();
    const actual = await counter.getCounter();
    expect(actual).toBe(0);
  });
});
