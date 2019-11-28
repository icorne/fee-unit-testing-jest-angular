import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockComponents, MockPipe } from 'ng-mocks';
import { Observable, of, throwError } from 'rxjs';
import { BooksComponent } from '../../shared/books/books.component';
import { Book } from '../../shared/domain/book.model';
import { BookService } from '../../shared/services/book.service';
import { MessageService } from '../../shared/services/message.service';
import { MyBooksComponent } from './my-books.component';

describe('MyBooksComponent', () => {

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
  });

  describe('IT', () => {
    let component: MyBooksComponent;
    let fixture: ComponentFixture<MyBooksComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          MyBooksComponent,
          MockComponents(BooksComponent),
          MockPipe(TranslatePipe),
        ],
        providers: [
          { provide: BookService, useValue: bookServiceMock },
          { provide: MessageService, useValue: messageServiceMock },
          { provide: TranslateService, useValue: translateServiceMock },
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      bookServiceMock.getMyBooks.mockImplementation(() => of(books));
      fixture = TestBed.createComponent(MyBooksComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('does not change', () => {
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('UT', () => {

    let booksComponent: MyBooksComponent;
    beforeEach(() => {
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
        it('calls showErrorMessage', () => {
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
});
