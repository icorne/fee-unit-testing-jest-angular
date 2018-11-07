import {Injectable} from '@angular/core';
import {Book} from '../domain/book.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {
  }

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>('http://localhost:3001/books');
  }

  getMyBooks(): Observable<Book[]> {
    const params = new HttpParams().set('borrowed', 'true');
    return this.httpClient.get<Book[]>('http://localhost:3001/books', {params: params});
  }

  borrowBook(book: Book): Observable<Book> {
    book.borrowed = true;
    return this.httpClient.put<Book>('http://localhost:3001/books/' + book.id, book);
  }

  returnBook(book: Book): Observable<Book> {
    book.borrowed = false;
    return this.httpClient.put<Book>('http://localhost:3001/books/' + book.id, book);
  }
}
