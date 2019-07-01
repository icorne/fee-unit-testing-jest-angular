import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      providers: [],
      imports: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the AdminComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to set the values on the form', () => {
  });

  it('should reset the sub and sub sub forms when the title changes', () => {
  });

  it('should set the amount of pages when the isbn changes', () => {
  });

  it('should get the amount of pages when the isbn changes', () => {
  });

  it('should set the sub sub form to valid when all required fields are filled', () => {
  });

  it('should set the sub sub form to invalid when not all required fields are filled', () => {
  });

  it('should set the sub form to valid when all required fields are filled', () => {
  });

  it('should set the sub form to invalid when not all required fields are filled', () => {
  });

  it('should set the form to valid when all required fields are filled', () => {
  });

  it('should set the form to invalid when not all required fields are filled', () => {
  });
});
