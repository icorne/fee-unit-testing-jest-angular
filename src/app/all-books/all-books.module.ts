import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AllBooksComponent } from './all-books/all-books.component';

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
export class AllBooksModule {
}
