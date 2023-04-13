import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { productListStatusModule } from '../product-list.module';

import { ProductListComponent } from './product-list.component';
import {productBasicInfo} from "../../../models/general.interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        productListStatusModule,
        RouterTestingModule
      ],
      declarations: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should product info', () => {
    let spyRedirect = spyOn(component, 'redirectTo');
    component.productInformationShow();
    expect(spyRedirect).toHaveBeenCalled()
  });
  it('should product info', () => {
    let spyRedirect = spyOn(component, 'redirectTo');
    component.productInformationShow({id:"test"});
    expect(spyRedirect).toHaveBeenCalled()
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
