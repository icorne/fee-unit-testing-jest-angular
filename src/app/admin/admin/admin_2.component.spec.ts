import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';

import {AdminComponent} from './admin.component';
import {AdminService} from '../../shared/services/admin.service';
import {AdminServiceStub} from '../../shared/stubs/admin.service.stub';

describe('AdminComponent2', () => {
    let component: AdminComponent;
    let fixture: ComponentFixture<AdminComponent>;

    const oldResetTestingModule = TestBed.resetTestingModule;

    beforeAll((done) => (async () => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            declarations: [AdminComponent],
            providers: [FormBuilder, {provide: AdminService, useClass: AdminServiceStub}],
            imports: [ReactiveFormsModule]
        });

        await TestBed.compileComponents();

        // prevent Angular from resetting testing module
        TestBed.resetTestingModule = () => TestBed;
    })().then(done).catch(done.fail));

    afterAll(() => {
        TestBed.resetTestingModule = () => oldResetTestingModule();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminComponent);
        component = fixture.componentInstance;
        component.ngAfterViewInit();
        fixture.detectChanges();
    });

    it('should create the AdminComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to set the values on the form', () => {
        // ARRANGE

        // ACT
        component.form.get('title').setValue('TITLE');
        component.form.get('title2').setValue('TITLE2');
        component.subForm.get('isbn').setValue('ISBN');
        component.subForm.get('author').setValue('AUTHOR');
        component.subSubForm.get('amountOfPages').setValue(5);

        // ASSERT
        expect(component.form.get('title').value).toEqual('TITLE');
        expect(component.form.get('title2').value).toEqual('TITLE2');
        expect(component.subForm.get('isbn').value).toEqual('ISBN');
        expect(component.subForm.get('author').value).toEqual('AUTHOR');
        expect(component.subSubForm.get('amountOfPages').value).toEqual(5);
    });

    it('should reset the sub and sub sub forms when the title changes', () => {
        // ARRANGE
        component.form.get('title').setValue('TITLE');
        component.form.get('title2').setValue('TITLE2');
        component.subForm.get('isbn').setValue('ISBN');
        component.subForm.get('author').setValue('AUTHOR');
        component.subSubForm.get('amountOfPages').setValue(5);

        // ACT
        component.form.get('title').setValue('RESET');

        // ASSERT
        expect(component.form.get('title').value).toEqual('RESET');
        expect(component.form.get('title2').value).toEqual('TITLE2');
        expect(component.subForm.get('isbn').value).toEqual(null);
        expect(component.subForm.get('author').value).toEqual(null);
        expect(component.subSubForm.get('amountOfPages').value).toEqual(null);
    });

    it('should set the amount of pages when the isbn changes', () => {
        // ARRANGE

        // ACT
        component.subForm.get('isbn').setValue('ISBN');

        // ASSERT
        expect(component.subSubForm.get('amountOfPages').value).toEqual(55);
    });

    it('should get the amount of pages when the isbn changes', () => {
        // ARRANGE
        const mockedAdminService = TestBed.get(AdminService);
        spyOn(mockedAdminService, 'getAmountOfPages').and.returnValue(of(10));

        // ACT
        component.subForm.get('isbn').setValue('ISBN2');

        // ASSERT
        expect(component.subSubForm.get('amountOfPages').value).toEqual(10);
        expect(mockedAdminService.getAmountOfPages).toHaveBeenCalledWith('ISBN2');
    });

    it('should set the sub sub form to valid when all required fields are filled', () => {
        // ARRANGE
        component.subSubForm.get('amountOfPages').setValue(5);

        // ACT
        component.subSubForm.updateValueAndValidity();

        // ASSERT
        expect(component.subSubForm.valid).toEqual(true);
    });

    it('should set the sub sub form to invalid when not all required fields are filled', () => {
        // ARRANGE

        // ACT
        component.subSubForm.updateValueAndValidity();

        // ASSERT
        expect(component.subSubForm.valid).toEqual(false);
    });

    it('should set the sub form to valid when all required fields are filled', () => {
        // ARRANGE
        component.subForm.get('author').setValue('AUTHOR');
        component.subForm.get('isbn').setValue('ISBN');
        component.subSubForm.get('amountOfPages').setValue(5);

        // ACT
        component.subForm.updateValueAndValidity();

        // ASSERT
        expect(component.subForm.valid).toEqual(true);
    });

    it('should set the sub form to invalid when not all required fields are filled', () => {
        // ARRANGE
        component.subForm.get('isbn').setValue('ISBN');

        // ACT
        component.subForm.updateValueAndValidity();

        // ASSERT
        expect(component.subForm.valid).toEqual(false);
    });

    it('should set the form to valid when all required fields are filled', () => {
        // ARRANGE
        component.form.get('title').setValue('TITLE');
        component.subForm.get('author').setValue('AUTHOR');
        component.subForm.get('isbn').setValue('ISBN');
        component.subSubForm.get('amountOfPages').setValue(5);

        // ACT
        component.form.updateValueAndValidity();

        // ASSERT
        expect(component.form.valid).toEqual(true);
    });

    it('should set the form to invalid when not all required fields are filled', () => {
        // ARRANGE
        component.form.get('title2').setValue('TITLE2');
        component.subForm.get('author').setValue('AUTHOR');
        component.subForm.get('isbn').setValue('ISBN');
        component.subSubForm.get('amountOfPages').setValue(5);

        // ACT
        component.form.updateValueAndValidity();

        // ASSERT
        expect(component.form.valid).toEqual(false);
    });
});
