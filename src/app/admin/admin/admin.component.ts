import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'fee2018-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subForm: FormGroup;
  subSubForm: FormGroup;

  readonly titleFormName: string = 'title';
  readonly title2FormName: string = 'title2';
  readonly authorFormName: string = 'author';
  readonly isbnFormName: string = 'isbn';
  readonly amountOfPagesFormName: string = 'amountOfPages';

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.createForm();
  }

  createForm(): void {
    this.subSubForm = this.fb.group({
      [this.amountOfPagesFormName]: ['', Validators.required]
    });

    this.subForm = this.fb.group({
      [this.authorFormName]: ['', Validators.required],
      [this.isbnFormName]: ['', Validators.required],
      subSubForm: this.subSubForm
    });

    this.form = this.fb.group({
      [this.titleFormName]: ['', Validators.required],
      [this.title2FormName]: [''],
      subForm: this.subForm
    });
  }

  ngOnInit(): void {
    this.form.get(this.titleFormName).valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.subForm.reset());

    this.subForm.get(this.isbnFormName).valueChanges
      .pipe(
        takeUntil(this.destroy$),
        switchMap((isbn: string) => isbn ? this.adminService.getAmountOfPages(isbn) : of(null)))
      .subscribe((amount: number) => this.subSubForm.get(this.amountOfPagesFormName).setValue(amount));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
