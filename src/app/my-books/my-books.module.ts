import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyBooksComponent } from './my-books/my-books.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [MyBooksComponent],
  exports: [MyBooksComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyBooksModule { }





