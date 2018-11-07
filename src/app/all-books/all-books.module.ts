import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBooksComponent } from './all-books/all-books.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [AllBooksComponent],
  exports: [
    AllBooksComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AllBooksModule { }
