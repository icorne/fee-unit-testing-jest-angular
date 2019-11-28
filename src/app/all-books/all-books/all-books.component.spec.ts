import { TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Book } from '../../shared/domain/book.model';
import { BookService } from '../../shared/services/book.service';
import { MessageService } from '../../shared/services/message.service';
import { AllBooksComponent } from './all-books.component';

describe('AllBooksComponent', () => {
  let allBooksComponent: AllBooksComponent;
  let bookServiceMock: { [key: string]: jest.Mock<BookService> | any };
  let messageServiceMock: { [key: string]: jest.Mock<MessageService> | any };
  let translateServiceMock: { [key: string]: jest.Mock<TranslateService> | any };
  let books: Book[];
  beforeEach(async () => {
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
      borrowBook: jest.fn(),
      getAllBooks: jest.fn(),
    };
    messageServiceMock = {
      showSuccessMessage: jest.fn(),
      showErrorMessage: jest.fn(),
    };
    translateServiceMock = {
      instant: jest.fn((key) => key),
    };
    allBooksComponent = new AllBooksComponent(
      bookServiceMock as any as BookService,
      messageServiceMock as any as MessageService,
      translateServiceMock as any as TranslateService,
    );
    const booksGotten = new Promise((resolve) => {
      bookServiceMock.getAllBooks.mockImplementation(() => {
        return of(books)
          .pipe(finalize(resolve));
      });
    });
    allBooksComponent.ngOnInit();
    await booksGotten;
  });
  it('constructs', () => {
    expect(allBooksComponent).toBeDefined();
  });
  it('sets the books', () => {
    expect(allBooksComponent.books).toBe(books);
  });

  describe('.borrow(book)', () => {
    let bookToBorrow: Book;
    beforeEach(() => {
      bookToBorrow = books[0];
    });
    describe('success', () => {
      const successTranslation = 'success';
      const handedInTranslation = 'good';
      beforeEach((done) => {
        bookServiceMock.borrowBook.mockImplementation((book) => of(book).pipe(finalize(done)));
        translateServiceMock.instant.mockImplementation((key) => key === 'SUCCESS' ? successTranslation : handedInTranslation);
        allBooksComponent.borrow(bookToBorrow);
      });
      it('removes the book from all books', () => {
        expect(allBooksComponent.books).not.toContain(bookToBorrow);
      });
      it('calls showSuccessMessage', () => {
        expect(messageServiceMock.showSuccessMessage).toHaveBeenCalledWith(successTranslation, handedInTranslation);
      });
      it('calls correct translation', () => {
        expect(translateServiceMock.instant).toHaveBeenCalledWith('CHECKED_OUT', {
          title: bookToBorrow.title,
          author: bookToBorrow.author
        });
      });
    });
    describe('error', () => {
      const errorTranslation = 'error';
      const failTranslation = 'bad';
      let message;
      beforeEach((done) => {

        message = 'I FAIL';
        bookServiceMock.borrowBook.mockImplementation(() => throwError(new Error(message)).pipe(finalize(done)));
        translateServiceMock.instant.mockImplementation((key) => key === 'ERROR' ? errorTranslation : failTranslation);
        allBooksComponent.borrow(bookToBorrow);
      });
      it('does not remove the book from all books', () => {
        expect(allBooksComponent.books).toContain(bookToBorrow);
      });
      it('calls showErrorMessage', () => {
        expect(messageServiceMock.showErrorMessage).toHaveBeenCalledWith(errorTranslation, failTranslation);
      });
      it('calls correct translation', () => {
        expect(translateServiceMock.instant).toHaveBeenCalledWith('SOMETHING_WENT_WRONG', {
          message
        });
      });
    });
  });
});
