import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {of, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';

import {AdminService} from '../../shared/services/admin.service';

@Component({
  selector: 'fee2018-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit, OnDestroy {

  form: FormGroup;
  subForm: FormGroup;
  subSubForm: FormGroup;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.createForm();
  }

  createForm(): void {
    this.subSubForm = this.fb.group({
      amountOfPages: [null, Validators.required]
    });

    this.subForm = this.fb.group({
      author: [null, Validators.required],
      isbn: [null, Validators.required],
      subSubForm: this.subSubForm
    });

    this.form = this.fb.group({
      title: [null, Validators.required],
      title2: [null],
      subForm: this.subForm
    });
  }

  ngAfterViewInit() {
    this.form.get('title').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.subForm.reset());

    this.subForm.get('isbn').valueChanges
      .pipe(
        takeUntil(this.destroy$),
        switchMap((isbn: string) => isbn ? this.adminService.getAmountOfPages(isbn) : of(null)))
      .subscribe((amount: number) => this.subSubForm.get('amountOfPages').setValue(amount));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
