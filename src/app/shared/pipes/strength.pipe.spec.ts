import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe: StrengthPipe;
  beforeEach(() => {
    pipe = new StrengthPipe();
  });
  it('transforms < 10 to a weak annotated value', () => {
    const value = 9;
    const actual = pipe.transform(value);
    expect(actual).toEqual(`${value} (weak)`);
  });
  it('transforms >= 10, <20 to a strong annotated value', () => {
    const value = 19;
    const actual = pipe.transform(value);
    expect(actual).toEqual(`${value} (strong)`);
  });
  it('transforms >= 20 to a unbelievable annotated value', () => {
    const value = 20;
    const actual = pipe.transform(value);
    expect(actual).toEqual(`${value} (unbelievable)`);
  });

});
