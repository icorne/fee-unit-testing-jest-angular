import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Book } from '../../shared/domain/book.model';
import { BookService } from '../../shared/services/book.service';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'fee2019-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {

  bookList: Book[] = [];

  constructor(private bookService: BookService,
              private messageService: MessageService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.bookService.getMyBooks()
      .subscribe((books: Book[]) => this.bookList = books);
  }

  public handIn(book: Book): void {
    this.bookService.returnBook(book)
      .subscribe((newBookVersion: Book) => {
        this.bookList.splice(this.bookList.indexOf(book), 1);
        this.messageService.showSuccessMessage(this.translateService.instant('SUCCESS'), this.translateService.instant('HANDED_IN', {
          title: newBookVersion.title,
          author: newBookVersion.author
        }));
      }, err => {
        this.messageService.showErrorMessage(this.translateService.instant('ERROR'), this.translateService.instant('SOMETHING_WENT_WRONG', {
          message: err.message
        }));
      });
  }
}
