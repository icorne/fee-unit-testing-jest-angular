import {fakeAsync, flush} from '@angular/core/testing';
import {cold, getTestScheduler} from 'jasmine-marbles';
import {of} from 'rxjs';

import {Api} from './api';
import {Counter} from './counter';

describe('Counter2', () => {

  // TODO: Add unit tests here

  let counter: Counter;
  let api: Api;

  beforeEach(() => {
    api = new Api();
    counter = new Counter(api);
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

  it('should be able to get a message', () => {
    spyOn(api, 'getMessage').and.returnValue(of('TEST'));
    counter.increase();

    expect(api.getMessage).toHaveBeenCalled();
    expect(counter.message).toEqual('TEST');
  });

  // Advanced test
  it('should be able to get the original message from the message service', fakeAsync(() => {
    counter.increase();
    flush();
    expect(counter.message).toEqual('HELLO WORLD');
  }));

  it('should be able to decrease', () => {
    counter.increase();
    counter.increase();
    counter.decrease();
    expect(counter.getCounter()).toEqual(1);
  });

  it('should be able to reset', () => {
    counter.increase();
    counter.reset();
    expect(counter.getCounter()).toEqual(0);
  });

  it('should not be able to go below 0', () => {
    counter.decrease();
    expect(counter.getCounter()).toEqual(0);
  });

  // TODO: Marble Testing

  it('should be able to get a message from the message service', fakeAsync(() => {
    const q$ = cold('---x|', {x: 'Marble Testing'});
    spyOn(api, 'getMessage').and.returnValue(q$);

    counter.increase();
    getTestScheduler().flush();

    expect(counter.message).toEqual('Marble Testing');
  }));
});
