import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';

describe('Books Component', () => {

  it('renders empty list', async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksComponent, StubbedTranslatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    const fixture = TestBed.createComponent(BooksComponent);

    expect(fixture).toMatchSnapshot();
  });

  it('renders single item list', async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksComponent, StubbedTranslatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    const fixture = TestBed.createComponent(BooksComponent);

    fixture.componentInstance.books = [{
      id: 42,
      title: `The Hitchiker's guide to the galaxy`,
      description: 'Sci-fi absurdism',
      author: 'Douglas Adams',
      isbn: 'book-42',
      amountOfPages: 42,
      releaseDate: new Date(2019, 10, 27),
      borrowed: true
    }];

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

});

@Pipe({ name: 'translate' })
class StubbedTranslatePipe implements PipeTransform {
  transform(x) {
    return x;
  }
}
