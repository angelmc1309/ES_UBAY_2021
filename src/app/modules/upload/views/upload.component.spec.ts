import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import {uploadStatusModule} from "../upload.module";
import {RouterTestingModule} from "@angular/router/testing";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        uploadStatusModule,
        RouterTestingModule
      ],
      declarations: [ ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    snackBar = TestBed.inject(MatSnackBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT register button', () => {
    let spyNotValidProd = spyOn(component, 'showMsgError');
    component.uploadButton();
    expect(spyNotValidProd).toHaveBeenCalled();

  });

  it('should register button', () => {
    component.newProdForm.get("name")?.setValue("test")
    component.newProdForm.get("quantity")?.setValue(2);
    component.newProdForm.get("price")?.setValue(25);
    component.newProdForm.get("category")?.setValue("test");
    component.newProdForm.get("description")?.setValue("test");
    component.newProdForm.get("image")?.setValue("test");
    let spyAddNewProd = spyOn(component, 'uploadProd');
    component.uploadButton();
    expect(spyAddNewProd).toHaveBeenCalled();
  });

  it('should show message snackbar', () => {
    let spySnackBar = spyOn(snackBar, 'open');
    component.showMsgError();
    expect(spySnackBar).toHaveBeenCalled();
  });

  it('should close snackbar', () => {
    let spySnackBar = spyOn(snackBar, 'dismiss');
    component.closeSnackBar();
    expect(spySnackBar).toHaveBeenCalled();
  });
});
