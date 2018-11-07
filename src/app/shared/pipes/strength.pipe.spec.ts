import {StrengthPipe} from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe: StrengthPipe;

  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('should display weak if strength is 5', () => {
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });

  it('should display weak if strength is > 0', () => {
    expect(pipe.transform(-1)).toEqual('-1 (weak)');
  });

  it('should display strong if strength is 10', () => {
    expect(pipe.transform(10)).toEqual('10 (strong)');
  });

  it('should display unbelievable if strength is greater than 19', () => {
    expect(pipe.transform(19)).toEqual('19 (strong)');
  });

  it('should display unbelievable if strength is greater than 20', () => {
    expect(pipe.transform(20)).toEqual('20 (unbelievable)');
  });
});
