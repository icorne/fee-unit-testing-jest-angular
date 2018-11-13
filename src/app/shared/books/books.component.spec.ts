import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BooksComponent} from './books.component';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksComponent],
      schemas: [],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the BooksComponent', () => {
    expect(component).toBeTruthy();
  });
});
