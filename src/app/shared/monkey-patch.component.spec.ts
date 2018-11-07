import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';

describe('MonkeyPatch', () => {
  let component: MonkeyComponent;
  let fixture: ComponentFixture<MonkeyComponent>;

  const oldResetTestingModule = TestBed.resetTestingModule;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [MonkeyComponent],
      schemas: [],
      providers: [],
      imports: []
    });

    await TestBed.compileComponents();

    // prevent Angular from resetting testing module
    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  afterAll(() => {
    TestBed.resetTestingModule = () => oldResetTestingModule();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

@Component({
  selector: 'fee2018-monkey',
  template: ''
})
class MonkeyComponent {
}
