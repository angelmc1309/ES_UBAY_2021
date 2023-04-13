import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import {RouterTestingModule} from "@angular/router/testing";
import {profileStatusModule} from "../profile.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          RouterTestingModule,
          profileStatusModule,
          BrowserAnimationsModule
      ],
      declarations: [],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.testingData();
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should redirect', () => {
    let spyRedirect = spyOn(component, 'redirectTo');
    component.addNewItem();
    expect(spyRedirect).toHaveBeenCalled();
  });

   it('should get image', () => {
    expect(component.getImage({image:""})).toBe("default.jpg");
    expect(component.getImage({image:"lol"})).toBe("lol");
  });
   it('should get item amount is bigger than 0', () => {
    expect(component.getItemAmount()).toBe(0);
    expect( component.biggerThanZero(component.getItemAmount())).toBe(false);
  });
   it('should toggle profile edition', () => {
       let spyForm = spyOn(component, 'initForm');
       component.editProfileToggle();
       expect(component.modify).toBe(false);
       expect(spyForm).toHaveBeenCalled();
  });
   it('should redirect to info', () => {
       let spyRedirect = spyOn(component, 'redirectTo');
       component.productInformationShow({id: "2"});
       expect(spyRedirect).toHaveBeenCalled();
  });
  it('should make password visible', () => {
       component.changeVisible();
       expect(component.visible).toBe(true);
  });
   it('should edit profile', () => {
       let spyRedirect = spyOn(component, 'redirectTo');
       component.newUserForm.get("password")?.setValue("test")
       component.newUserForm.get("passwordRepeat")?.setValue("test")
       component.editProfile();
       expect(component.newUser['name']).toBe("Testing");
       expect(spyRedirect).toHaveBeenCalled();
  });
    it('should not edit profile', () => {
       let spySnack = spyOn(snackBar, 'open');
       component.newUserForm.get("password")?.setValue("testA")
       component.newUserForm.get("passwordRepeat")?.setValue("test")
       component.editProfile();
       expect(spySnack).toHaveBeenCalled();
  });


});
