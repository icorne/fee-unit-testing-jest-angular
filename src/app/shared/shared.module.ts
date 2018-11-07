import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books/books.component';
import { BookService } from './services/book.service';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './services/message.service';
import { LanguageService } from './services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule
  ],
  declarations: [BooksComponent],
  exports: [
    BooksComponent,
    TranslateModule
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        BookService,
        MessageService,
        LanguageService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    };
  }
}


