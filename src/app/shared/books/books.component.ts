import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../domain/book.model';

@Component({
  selector: 'fee2018-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  @Input()
  books: Book[];

  @Input()
  actionLabel: string;

  @Output()
  clicked = new EventEmitter<Book>();

  constructor() { }

  ngOnInit() {
  }

  bookClicked (book: Book): void {
    this.clicked.emit(book);
  }

}
