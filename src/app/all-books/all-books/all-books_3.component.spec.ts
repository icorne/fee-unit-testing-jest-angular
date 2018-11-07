import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

import {AllBooksComponent} from './all-books.component';
import {BookService} from '../../shared/services/book.service';
import {BookServiceStub} from '../../shared/stubs/book.service.stub';
import {MessageService} from '../../shared/services/message.service';
import {MessageServiceStub} from '../../shared/stubs/message.service.stub';
import {TranslateServiceStub} from '../../shared/stubs/translate.service.stub';
import {Book} from '../../shared/domain/book.model';

describe('AllBooksComponent3', () => {
  let component: AllBooksComponent;
  let bookService: BookService;
  let messageService: MessageService;
  let translateService: TranslateService;

  beforeEach(() => {
    bookService = new BookServiceStub() as BookService;
    messageService = new MessageServiceStub() as MessageService;
    translateService = new TranslateServiceStub() as TranslateService;
    component = new AllBooksComponent(bookService, messageService, translateService);
  });

  it('should be able to borrow books', () => {
    // Arrange
    spyOn(messageService, 'showSuccessMessage').and.callThrough();
    spyOn(bookService, 'borrowBook').and.callThrough();
    const book1: Book = {id: 1, title: 'Title', author: 'Author'} as Book;
    const book2: Book = {id: 2, title: 'Title2', author: 'Author2'} as Book;

    component.books = [book1, book2] as Book[];

    // Act
    component.borrow(book1);

    // Assert
    expect(component.books).toEqual([book2]);
    expect(bookService.borrowBook).toHaveBeenCalledWith(book1);
    expect(messageService.showSuccessMessage).toHaveBeenCalledWith('SUCCESS', 'CHECKED_OUT');
  });

  it('should show an error toaster when a error occurs during borrowing a book', () => {
    // Arrange
    spyOn(messageService, 'showErrorMessage').and.callThrough();
    spyOn(bookService, 'borrowBook').and.returnValue(new Observable(observer => observer.error('')));
    const book1: Book = {id: 1, title: 'Title', author: 'Author'} as Book;
    const book2: Book = {id: 2, title: 'Title2', author: 'Author2'} as Book;
    const book3: Book = {id: 3, title: 'Title3', author: 'Author3'} as Book;
    component.books = [book1, book2] as Book[];

    // Act
    component.borrow(book3);

    // Assert
    expect(messageService.showErrorMessage).toHaveBeenCalledWith('ERROR', 'SOMETHING_WENT_WRONG');
  });
});
