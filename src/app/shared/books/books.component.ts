import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Book } from '../domain/book.model';

@Component({
  selector: 'fee2019-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {

  @Input() books: Book[] = [];
  @Input() actionLabel: string;

  @Output() clicked = new EventEmitter<Book>();

  bookClicked(book: Book): void {
    this.clicked.emit(book);
  }
}
