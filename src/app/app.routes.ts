import {Routes} from '@angular/router';
import {AllBooksComponent} from './all-books/all-books/all-books.component';
import {MyBooksComponent} from './my-books/my-books/my-books.component';
import {AdminComponent} from './admin/admin/admin.component';

export const routes: Routes = [
  {path: 'all-books', component: AllBooksComponent},
  {path: 'my-books', component: MyBooksComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', redirectTo: '/all-books', pathMatch: 'full'}
];


