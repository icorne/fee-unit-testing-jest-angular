import {HttpClient} from '@angular/common/http';
import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

class MockedHttpClient {
  constructor() {}

  public get = jest.fn();
}

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: HttpClient, useClass: MockedHttpClient}],
      imports: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ExampleComponent', () => {
    // This test catches bugs in template logic + non-defined properties
    expect(component).toBeTruthy();
  });

  it('should spy on a mocked httpclient', () => {
    // ARRANGE
    // TestBed provides getter for services
    const mockedHttpClient = TestBed.get(HttpClient);

    // ACT
    component.ngOnInit();

    // ASSERT
    expect(mockedHttpClient.get).toHaveBeenCalledWith('Foo');
  });
});

@Component({
  selector: 'fee2019-example',
  template: ''
})
class ExampleComponent implements OnInit {

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get('Foo');
  }
}
