import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HttpClientStub } from '../../../stubs/http-client.stub';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      schemas: [],
      providers: [{provide: HttpClient, useClass: HttpClientStub}],
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
    spyOn(mockedHttpClient, 'get').and.returnValue(of([]));

    // ACT
    component.ngOnInit();

    // ASSERT
    expect(mockedHttpClient.get).toHaveBeenCalledWith('Foo');
  });
});

@Component({
  selector: 'fee2018-example',
  template: ''
})
class ExampleComponent implements OnInit {

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get('Foo');
  }
}
