import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BooksComponent} from './books.component';
import {StubbedTranslatePipe} from '../stubs/translate.pipe.stub';
import {Book} from '../domain/book.model';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksComponent, StubbedTranslatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('should emit an event when clicked on a book', () => {
    // ARRANGE
    spyOn(component.clicked, 'emit');

    // ACT
    component.bookClicked({id: 1} as Book);

    // ASSERT
    expect(component.clicked.emit).toHaveBeenCalledWith({id: 1});
  });

  it('should the information of the books when books are available', () => {
    // ARRANGE
    component.books = [{
      title: 'This is the Title',
      author: 'Author',
      isbn: '1',
      amountOfPages: 1,
      releaseDate: new Date(),
      borrowed: true,
    } as Book];

    // ACT
    fixture.detectChanges();

    // ASSERT
    expect(fixture.nativeElement.textContent).not.toContain('No books available');
    expect(fixture.nativeElement.textContent).toContain('This is the Title');
  });

  it('should show a specific message when no books are available', () => {
    // ARRANGE
    component.books = [];

    // ACT
    fixture.detectChanges();

    // ASSERT
    expect(fixture.nativeElement.textContent).toContain('No books available');
  });
});
