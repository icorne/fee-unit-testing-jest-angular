import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

import {AllBooksComponent} from './all-books.component';
import {BookService} from '../../shared/services/book.service';
import {BookServiceStub} from '../../shared/stubs/book.service.stub';
import {MessageService} from '../../shared/services/message.service';
import {MessageServiceStub} from '../../shared/stubs/message.service.stub';
import {TranslateServiceStub} from '../../shared/stubs/translate.service.stub';
import {StubbedTranslatePipe} from '../../shared/stubs/translate.pipe.stub';
import {Book} from '../../shared/domain/book.model';

describe('AllBooksComponent2', () => {
  let component: AllBooksComponent;
  let fixture: ComponentFixture<AllBooksComponent>;

  const oldResetTestingModule = TestBed.resetTestingModule;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [AllBooksComponent, StubbedTranslatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: BookService, useClass: BookServiceStub},
        {provide: MessageService, useClass: MessageServiceStub},
        {provide: TranslateService, useClass: TranslateServiceStub}
      ]
    });

    await TestBed.compileComponents();

    // prevent Angular from resetting testing module
    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  afterAll(() => {
    TestBed.resetTestingModule = () => oldResetTestingModule();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the AllBooksComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to borrow books', () => {
    // Arrange
    const mockedMessageService = TestBed.get(MessageService);
    const mockedBookService = TestBed.get(BookService);
    spyOn(mockedMessageService, 'showSuccessMessage');
    spyOn(mockedBookService, 'borrowBook').and.callThrough();
    const book1: Book = {id: 1, title: 'Title', author: 'Author'} as Book;
    const book2: Book = {id: 2, title: 'Title2', author: 'Author2'} as Book;
    component.books = [book1, book2] as Book[];

    // Act
    component.borrow(book1);

    // Assert
    expect(component.books).toEqual([book2]);
    expect(mockedBookService.borrowBook).toHaveBeenCalledWith(book1);
    expect(mockedMessageService.showSuccessMessage).toHaveBeenCalledWith('SUCCESS', 'CHECKED_OUT');
  });

  it('should show an error toaster when a error occurs during borrowing a book', () => {
    // Arrange
    const mockedMessageService = TestBed.get(MessageService);
    const mockedBookService = TestBed.get(BookService);
    spyOn(mockedMessageService, 'showErrorMessage');
    spyOn(mockedBookService, 'borrowBook').and.returnValue(new Observable(observer => observer.error('')));
    const book1: Book = {id: 1, title: 'Title', author: 'Author'} as Book;
    const book2: Book = {id: 2, title: 'Title2', author: 'Author2'} as Book;
    const book3: Book = {id: 3, title: 'Title3', author: 'Author3'} as Book;
    component.books = [book1, book2] as Book[];

    // Act
    component.borrow(book3);

    // Assert
    expect(mockedMessageService.showErrorMessage).toHaveBeenCalledWith('ERROR', 'SOMETHING_WENT_WRONG');
  });
});
