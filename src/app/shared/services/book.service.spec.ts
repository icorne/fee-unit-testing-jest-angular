import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { Book } from '../domain/book.model';
import { BookService } from './book.service';

describe('BookService', () => {

  let bookService: BookService;
  let books: Book[];
  let httpClientMock: { [key: string]: jest.Mock };
  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      put: jest.fn(),
    };
    httpClientMock.get.mockImplementation(() => of(books));
    httpClientMock.put.mockImplementation((endpoint, book) => of(book));
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
    bookService = new BookService(httpClientMock as any as HttpClient);
  });

  describe('.getAllBooks()', () => {
    let actual: Book[];
    beforeEach(async () => {
      actual = await bookService.getAllBooks().toPromise();
    });
    it('returns all books', () => {
      expect(actual).toBe(books);
    });
    it('calls the correct endpoint', () => {
      expect(httpClientMock.get).toHaveBeenCalledWith('http://localhost:3001/books');
    });
  });

  describe('.getMyBooks()', () => {
    let actual: Book[];
    beforeEach(async () => {
      actual = await bookService.getMyBooks().toPromise();
    });
    it('returns all books', () => {
      expect(actual).toBe(books);
    });
    it('calls the correct endpoint', () => {
      const params = new HttpParams().set('borrowed', 'true');
      expect(httpClientMock.get).toHaveBeenCalledWith('http://localhost:3001/books', { params });
    });
  });

  describe('.borrowBook()', () => {
    let actual: Book;
    let bookToBorrow: Book;
    beforeEach(async () => {
      bookToBorrow = books[0];
      actual = await bookService.borrowBook(bookToBorrow).toPromise();
    });
    it('returns all books', () => {
      expect(actual).toBe(bookToBorrow);
    });
    it('calls the correct endpoint', () => {
      expect(httpClientMock.put).toHaveBeenCalledWith(`http://localhost:3001/books/${bookToBorrow.id}`, bookToBorrow);
    });
    it('book should be borrowed', () => {
      expect(actual.borrowed).toBe(true);
    });
  });

  describe('.returnBook()', () => {
    let actual: Book;
    let bookToBorrow: Book;
    beforeEach(async () => {
      bookToBorrow = books[0];
      bookToBorrow.borrowed = true;
      actual = await bookService.returnBook(bookToBorrow).toPromise();
    });
    it('returns all books', () => {
      expect(actual).toBe(bookToBorrow);
    });
    it('calls the correct endpoint', () => {
      expect(httpClientMock.put).toHaveBeenCalledWith(`http://localhost:3001/books/${bookToBorrow.id}`, bookToBorrow);
    });
    it('book should be borrowed', () => {
      expect(actual.borrowed).toBe(false);
    });
  });
});
