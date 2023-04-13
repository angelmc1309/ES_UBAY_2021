import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { homePageStatusModule } from '../home-page.module';

import { HomePageComponent } from './home-page.component';
import {productBasicInfo} from "../../../models/general.interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        homePageStatusModule,
        RouterTestingModule
      ],
      declarations: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should search button', () => {
    let spySearchButton = spyOn(component, 'redirectTo');
    component.searchButton();
    expect(spySearchButton).toHaveBeenCalled();
  });
  it('should product information', () => {
    let spySearchButton = spyOn(component, 'redirectTo');
    component.productInformationShow({id: "2"});
    expect(spySearchButton).toHaveBeenCalled();
  });
  it('should get image', () => {
    expect(component.getImage({image:""})).toBe("default.jpg");
    expect(component.getImage({image:"lol"})).toBe("lol");
  });

  it('should call snackbar', () => {
    let spySnackBar = spyOn(snackBar, 'open');
    let post: productBasicInfo = {
                id: 1,
                price:10
                }
    component.productCartAdd(post);
    component.productCartAdd(post);
    expect(spySnackBar).toHaveBeenCalled();
  });

});
