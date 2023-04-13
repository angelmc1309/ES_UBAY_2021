import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import {loginStatusModule} from "../login.module";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        loginStatusModule,
        RouterTestingModule,
      ],

      declarations: [  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should click button', () => {
    component.loginForm.get("username")?.setValue("testing");
    component.clickButton();
    expect(component.user.username).toBe("testing");
  });
   it('should redirect to register', () => {
   let spyRedirect = spyOn(component, 'redirectTo');
   component.registerUser();
   expect(spyRedirect).toHaveBeenCalled();
  });
});
