import { Observable, of } from 'rxjs';

import { Book } from '../src/app/shared/domain/book.model';

export class BookServiceStub {

  getMyBooks(): Observable<Book[]> {
    return of([] as Book[]);
  }

  getAllBooks(): Observable<Book[]> {
    return of([] as Book[]);
  }

  returnBook(book: Book): Observable<Book> {
    book.borrowed = false;
    return of(book);
  }

  borrowBook(book: Book): Observable<Book> {
    book.borrowed = true;
    return of(book);
  }
}
