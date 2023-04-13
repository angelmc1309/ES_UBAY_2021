import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { productInformationStatusModule } from '../product-information.module';

import { ProductInformationComponent } from './product-information.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {productBasicInfo} from "../../../models/general.interfaces";

describe('ProductInformationComponent', () => {
  let component: ProductInformationComponent;
  let fixture: ComponentFixture<ProductInformationComponent>;
  let snackBar: MatSnackBar;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        productInformationStatusModule,
        RouterTestingModule
      ],
      declarations: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInformationComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show product information', () => {
    let spyRedirect = spyOn(component, 'redirectTo');
    component.productInformationShow();
    expect(spyRedirect).toHaveBeenCalled();
  });

  it('should add to cart', () => {
    let spyAddToCartButton = spyOn(component, 'redirectTo');
    let post: productBasicInfo = {
                id: 1,
                price:10
                }
    component.productCartAdd(post,3);
    expect(spyAddToCartButton).toHaveBeenCalled();
  });

  it('should call snackbar', () => {
    let spySnackBar = spyOn(snackBar, 'open');
    let post: productBasicInfo = {
                id: 1,
                price:10
                }
    component.productCartAdd(post,3);
    component.productCartAdd(post,3);
    expect(spySnackBar).toHaveBeenCalled();
  });

  it('stock class check', () => {
    expect(component.inStock("OUTOFSTOCK")).toBe('bg-red');
    expect(component.inStock("LOWSTOCK")).toBe('bg-yellow');
    expect(component.inStock("INSTOCK")).toBe('bg-green');
    expect(component.inStockButton("OUTOFSTOCK")).toBe('addToCartDisabled');
    expect(component.inStockButton("INSTOCK")).toBe('addToCart');
    expect(component.inStockButtonString("OUTOFSTOCK")).toBe('OUT OF STOCK');
    expect(component.inStockButtonString("INSTOCK")).toBe('ADD TO CART');
  });
  it('should get image', () => {
    expect(component.getImage({image:""})).toBe("default.jpg");
    expect(component.getImage({image:"lol"})).toBe("lol");
  });

});
