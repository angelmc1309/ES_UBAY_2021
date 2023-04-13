import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterStatusModule } from '../register.module';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterStatusModule,
        RouterTestingModule
      ],
      declarations: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not register button', () => {
    let spyNotValidUser = spyOn(component, 'showMsgError');
    component.registerButton();
    expect(spyNotValidUser).toHaveBeenCalled();
  });

  it ('should register button', () => {
    let spyAddNewUser = spyOn(component, 'showMsgError');
    component.newUserForm.get("name")?.setValue("test")
    component.newUserForm.get("surname")?.setValue("test");;
    component.newUserForm.get("direction")?.setValue("test");
    component.newUserForm.get("cp")?.setValue("test");
    component.newUserForm.get("poblacion")?.setValue("test");
    component.newUserForm.get("municipio")?.setValue("test");
    component.newUserForm.get("pais")?.setValue("test");
    component.newUserForm.get("email")?.setValue("test");
    component.newUserForm.get("username")?.setValue("test");
    component.newUserForm.get("password")?.setValue("12345678");
    component.newUserForm.get("passwordRepeat")?.setValue("12345678") ;
    component.registerButton();
    expect(spyAddNewUser).toHaveBeenCalled();
  });

  it('should show message snackbar', () => {
    let spySnackBar = spyOn(snackBar, 'open');
    component.showMsgError();
    expect(spySnackBar).toHaveBeenCalled();
  });
 it('should check if password is correct', () => {
    component.newUserForm.get("password")?.setValue("12345678");
    component.newUserForm.get("passwordRepeat")?.setValue("12345678") ;
    expect(component.checkIfCorrectData()).toBe(true);
    component.newUserForm.get("password")?.setValue("12345678");
    component.newUserForm.get("passwordRepeat")?.setValue("123456789") ;
    expect(component.checkIfCorrectData()).toBe(false);
  });

 it('should check if form is initialised', () => {
    component.newUserForm.get("password")?.setValue("12345678");
    component.newUserForm.get("passwordRepeat")?.setValue("12345678") ;
    component.getFilterValues();
    expect(component.newUser["password"]).toBe("12345678");
    expect(component.newUser["password"]).toBe("12345678");
  });

 it('should redirect', () => {
    let spyRedirect = spyOn(component, 'redirectTo');
    component.goToLogin();
    expect(spyRedirect).toHaveBeenCalled();
  });

 it('should show error', () => {
    let spySnackBar = spyOn(snackBar, 'open');
    component.newUserForm.get("password")?.setValue("12345678");
    component.newUserForm.get("passwordRepeat")?.setValue("123456789") ;
    component.addNewUser();
    expect(spySnackBar).toHaveBeenCalled();
  });
});
