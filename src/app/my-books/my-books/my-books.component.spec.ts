import { TranslateService } from '@ngx-translate/core';
import { Observable, of, throwError } from 'rxjs';
import { Book } from '../../shared/domain/book.model';
import { BookService } from '../../shared/services/book.service';
import { MessageService } from '../../shared/services/message.service';
import { MyBooksComponent } from './my-books.component';

describe('MyBooksComponent', () => {
  let booksComponent: MyBooksComponent;
  let bookServiceMock: { [key: string]: jest.Mock<BookService> | any };
  let messageServiceMock: { [key: string]: jest.Mock<MessageService> | any };
  let translateServiceMock: { [key: string]: jest.Mock<TranslateService> | any };
  let books: Book[];
  beforeEach(() => {
    books = [
      {
        amountOfPages: 1,
        author: 'Ian',
        borrowed: false,
        description: 'book 1',
        id: 1,
        isbn: 'isbn',
        releaseDate: new Date(),
        title: 'Book 1',
      },
    ];
    bookServiceMock = {
      getMyBooks: jest.fn((): Observable<Book[]> => of(books)),
      returnBook: jest.fn(),
    };
    messageServiceMock = {
      showSuccessMessage: jest.fn(),
      showErrorMessage: jest.fn(),
    };
    translateServiceMock = {
      instant: jest.fn((key) => key),
    };
    booksComponent = new MyBooksComponent(
      bookServiceMock as any as BookService,
      messageServiceMock as any as MessageService,
      translateServiceMock as any as TranslateService,
    );
    booksComponent.bookList = books;
  });
  it('constructs', () => {
    expect(booksComponent).toBeDefined();
  });

  describe('.handIn()', () => {
    let msHasBeenCalled: Promise<void>;
    beforeEach(() => {
      msHasBeenCalled = new Promise((resolve) => {
        messageServiceMock.showSuccessMessage.mockImplementation(() => resolve());
        messageServiceMock.showErrorMessage.mockImplementation(() => resolve());
      });
    });
    describe('success', () => {
      const successTranslation = 'success';
      const handedInTranslation = 'good';
      let bookToHandIn: Book;
      beforeEach(async () => {
        bookServiceMock.returnBook.mockImplementation((book) => of(book));
        translateServiceMock.instant.mockImplementation((key) => key === 'SUCCESS' ? successTranslation : handedInTranslation);
        bookToHandIn = books[0];
        booksComponent.handIn(bookToHandIn);
        await msHasBeenCalled;
      });
      it('calls showSuccessMessage', () => {
        expect(messageServiceMock.showSuccessMessage).toHaveBeenCalledWith(successTranslation, handedInTranslation);
      });
      it('calls correct translation', () => {
        expect(translateServiceMock.instant).toHaveBeenCalledWith('HANDED_IN', {
          title: bookToHandIn.title,
          author: bookToHandIn.author
        });
      });
    });
    describe('error', () => {
      const errorTranslation = 'error';
      const failTranslation = 'bad';
      let bookToHandIn: Book;
      let message;
      beforeEach(async () => {

        message = 'I FAIL';
        bookServiceMock.returnBook.mockImplementation(() => throwError(new Error(message)));
        translateServiceMock.instant.mockImplementation((key) => key === 'ERROR' ? errorTranslation : failTranslation);
        bookToHandIn = books[0];
        booksComponent.handIn(bookToHandIn);
        await msHasBeenCalled;
      });
      it('calls showSuccessMessage', () => {
        expect(messageServiceMock.showErrorMessage).toHaveBeenCalledWith(errorTranslation, failTranslation);
      });
      it('calls correct translation', () => {
        expect(translateServiceMock.instant).toHaveBeenCalledWith('SOMETHING_WENT_WRONG', {
          message,
        });
      });
    });
  });
});
