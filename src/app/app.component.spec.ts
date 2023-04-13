import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ],
      declarations: [],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate when searchButton', () => {
    let spyRedirect = spyOn(component, 'redirectTo');
    component.searchButton();
    expect(spyRedirect).toHaveBeenCalled();
  });
  it('should navigate when goToProfile', () => {
    let spyRedirect = spyOn(component, 'redirectTo');
    component.goToProfile();
    expect(spyRedirect).toHaveBeenCalled();
  });

  it('should show menu bar', () => {
    let spyRedirect = spyOn(component, 'redirectTo');
    component.showNewMenuBar("");
    expect(spyRedirect).toHaveBeenCalled();
  });
  it('should navigate when goToCart', () => {
    let spyRedirect = spyOn(component, 'redirectTo');
    component.goToCart();
    expect(spyRedirect).toHaveBeenCalled();
  });
  it('should logout', () => {
    let spyRedirect = spyOn(component, 'redirectTo');
    component.logOut();
    expect(component.currentUser).toBe(null);
    expect(spyRedirect).toHaveBeenCalled();
  });
   it('should navigate to login', () => {
    let spyRedirect = spyOn(component, 'redirectTo');
    component.goToLogin();
    expect(spyRedirect).toHaveBeenCalled();
  });
});
