import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

import {MyBooksComponent} from './my-books.component';
import {StubbedTranslatePipe} from '../../shared/stubs/translate.pipe.stub';
import {BookService} from '../../shared/services/book.service';
import {MessageService} from '../../shared/services/message.service';
import {TranslateServiceStub} from '../../shared/stubs/translate.service.stub';
import {BookServiceStub} from '../../shared/stubs/book.service.stub';
import {MessageServiceStub} from '../../shared/stubs/message.service.stub';
import {Book} from '../../shared/domain/book.model';

describe('MyBooksComponent2', () => {
  let component: MyBooksComponent;
  let fixture: ComponentFixture<MyBooksComponent>;

  const oldResetTestingModule = TestBed.resetTestingModule;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [MyBooksComponent, StubbedTranslatePipe],
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
    fixture = TestBed.createComponent(MyBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the MyBooksComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to hand in books', () => {
    // Arrange
    const mockedMessageService = TestBed.get(MessageService);
    const mockedBookService = TestBed.get(BookService);
    spyOn(mockedMessageService, 'showSuccessMessage');
    spyOn(mockedBookService, 'returnBook').and.callThrough();
    const book1: Book = {id: 1, title: 'Title', author: 'Author'} as Book;
    const book2: Book = {id: 2, title: 'Title2', author: 'Author2'} as Book;
    component.bookList = [book1, book2] as Book[];

    // Act
    component.handIn(book1);

    // Assert
    expect(component.bookList).toEqual([book2]);
    expect(mockedBookService.returnBook).toHaveBeenCalledWith(book1);
    expect(mockedMessageService.showSuccessMessage).toHaveBeenCalledWith('SUCCESS', 'HANDED_IN');
  });

  it('should show an error toaster when a error occurs during hand in', () => {
    // Arrange
    const mockedMessageService = TestBed.get(MessageService);
    const mockedBookService = TestBed.get(BookService);
    spyOn(mockedMessageService, 'showErrorMessage');
    spyOn(mockedBookService, 'returnBook').and.returnValue(new Observable(observer => observer.error('')));
    const book1: Book = {id: 1, title: 'Title', author: 'Author'} as Book;
    const book2: Book = {id: 2, title: 'Title2', author: 'Author2'} as Book;
    const book3: Book = {id: 3, title: 'Title3', author: 'Author3'} as Book;
    component.bookList = [book1, book2] as Book[];

    // Act
    component.handIn(book3);

    // Assert
    expect(mockedMessageService.showErrorMessage).toHaveBeenCalledWith('ERROR', 'SOMETHING_WENT_WRONG');
  });
});
