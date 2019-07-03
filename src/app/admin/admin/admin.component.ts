import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'fee2019-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subForm: FormGroup;

  readonly titleFormName: string = 'title';
  readonly authorFormName: string = 'author';
  readonly isbnFormName: string = 'isbn';
  readonly amountOfPagesFormName: string = 'amountOfPages';

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.createForm();
  }

  createForm(): void {
    this.subForm = this.fb.group({
      [this.authorFormName]: [null],
      [this.amountOfPagesFormName]: [null],
    });

    this.form = this.fb.group({
      [this.titleFormName]: [null, Validators.required],
      [this.isbnFormName]: [null, Validators.required],
      subForm: this.subForm
    });
  }

  ngOnInit(): void {
    this.form.get(this.isbnFormName).valueChanges
      .pipe(
        takeUntil(this.destroy$),
        switchMap((isbn: string) => isbn ? this.adminService.getAmountOfPages(isbn) : of(null))
      )
      .subscribe((amount: number) => this.subForm.get(this.amountOfPagesFormName).setValue(amount));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
