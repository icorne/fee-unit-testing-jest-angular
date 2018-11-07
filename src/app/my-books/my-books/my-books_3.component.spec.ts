import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

import {MyBooksComponent} from './my-books.component';
import {BookService} from '../../shared/services/book.service';
import {MessageService} from '../../shared/services/message.service';
import {TranslateServiceStub} from '../../shared/stubs/translate.service.stub';
import {BookServiceStub} from '../../shared/stubs/book.service.stub';
import {MessageServiceStub} from '../../shared/stubs/message.service.stub';
import {Book} from '../../shared/domain/book.model';

describe('MyBooksComponent3', () => {
  let component: MyBooksComponent;
  let bookService: BookService;
  let messageService: MessageService;
  let translateService: TranslateService;

  beforeEach(() => {
    bookService = new BookServiceStub() as BookService;
    messageService = new MessageServiceStub() as MessageService;
    translateService = new TranslateServiceStub() as TranslateService;
    component = new MyBooksComponent(bookService, messageService, translateService);
  });

  it('should create the MyBooksComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to hand in books', () => {
    // Arrange
    spyOn(messageService, 'showSuccessMessage').and.callThrough();
    spyOn(bookService, 'returnBook').and.callThrough();
    const book1: Book = {id: 1, title: 'Title', author: 'Author'} as Book;
    const book2: Book = {id: 2, title: 'Title2', author: 'Author2'} as Book;
    component.bookList = [book1, book2] as Book[];

    // Act
    component.handIn(book1);

    // Assert
    expect(component.bookList).toEqual([book2]);
    expect(bookService.returnBook).toHaveBeenCalledWith(book1);
    expect(messageService.showSuccessMessage).toHaveBeenCalledWith('SUCCESS', 'HANDED_IN');
  });

  it('should show an error toaster when a error occurs during hand in', () => {
    // Arrange
    spyOn(messageService, 'showErrorMessage').and.callThrough();
    spyOn(bookService, 'returnBook').and.returnValue(new Observable(observer => observer.error('')));
    const book1: Book = {id: 1, title: 'Title', author: 'Author'} as Book;
    const book2: Book = {id: 2, title: 'Title2', author: 'Author2'} as Book;
    const book3: Book = {id: 3, title: 'WRONG', author: 'Author3'} as Book;
    component.bookList = [book1, book2] as Book[];

    // Act
    component.handIn(book3);

    // Assert
    expect(messageService.showErrorMessage).toHaveBeenCalledWith('ERROR', 'SOMETHING_WENT_WRONG');
  });
});
