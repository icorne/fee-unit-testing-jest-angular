import {Component, OnInit} from '@angular/core';
import {Book} from '../../shared/domain/book.model';
import {BookService} from '../../shared/services/book.service';
import {MessageService} from '../../shared/services/message.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'fee2018-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService, private messageService: MessageService, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe(list => this.books = list);
  }

  borrow(book: Book): void {
    this.bookService.borrowBook(book).subscribe((newBookVersion: Book) => {
      this.books.splice(this.books.indexOf(book), 1);
      this.messageService.showSuccessMessage(this.translateService.instant('SUCCESS'), this.translateService.instant('CHECKED_OUT', {
        'title': newBookVersion.title,
        'author': newBookVersion.author
      }));
    }, err => {
      this.messageService.showErrorMessage(this.translateService.instant('ERROR'), this.translateService.instant('SOMETHING_WENT_WRONG', {
        'message': err.message
      }));
    });
  }

}




