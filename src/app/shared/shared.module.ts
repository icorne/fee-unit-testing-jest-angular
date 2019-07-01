import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { BooksComponent } from './books/books.component';
import { BookService } from './services/book.service';
import { LanguageService } from './services/language.service';
import { MessageService } from './services/message.service';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [BooksComponent],
  exports: [
    MatCardModule,
    MatButtonModule,
    TranslateModule,
    ReactiveFormsModule,
    BooksComponent
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
