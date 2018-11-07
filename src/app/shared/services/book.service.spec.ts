import {BookService} from './book.service';
import {HttpClientStub} from '../stubs/http-client.stub';
import {HttpClient} from '@angular/common/http';
import {Book} from '../domain/book.model';
import {of} from 'rxjs';

describe('BookService', () => {
  let service: BookService;
  let stubbedService: HttpClientStub;

  beforeEach(() => {
    stubbedService = new HttpClientStub();
    service = new BookService(stubbedService as HttpClient);
  });

  it('should create the BookService', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get all the books', () => {
    // ARRANGE
    spyOn(stubbedService, 'get').and.returnValue(of([{id: 1}]));

    // ACT
    service.getAllBooks().subscribe((books: Book[]) => {
      // ASSERT
      expect(books).toEqual([{id: 1}] as Book[]);
    });
  });

  it('should be able to get my books', () => {
    // ARRANGE
    spyOn(stubbedService, 'get').and.returnValue(of([{id: 1}, {id: 2}] as Book[]));

    // ACT
    service.getMyBooks().subscribe((books: Book[]) => {
      // ASSERT
      expect(books).toEqual([{id: 1}, {id: 2}] as Book[]);
    });
  });

  it('should be able to borrow books', () => {
    // ARRANGE
    // ACT
    service.borrowBook({id: 3} as Book).subscribe((book: Book) => {
      // ASSERT
      expect(book).toEqual({id: 3, borrowed: true} as Book);
    });
  });

  it('should be able to return books', () => {
    // ARRANGE
    const returnBook = {id: 5} as Book;

    // ACT
    service.returnBook(returnBook).subscribe((book: Book) => {
      // ASSERT
      expect(book).toEqual({id: 5, borrowed: false} as Book);
    });
  });
});
