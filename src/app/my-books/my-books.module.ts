import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MyBooksComponent } from './my-books/my-books.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [MyBooksComponent],
  exports: [MyBooksComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyBooksModule {
}
