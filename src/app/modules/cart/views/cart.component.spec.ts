import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import {RouterTestingModule} from "@angular/router/testing";
import {cartStatusModule} from "../cart.module";
import {MatSnackBar} from "@angular/material/snack-bar";
import {productBasicInfo} from "../../../models/general.interfaces";

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let snackBar: MatSnackBar;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          cartStatusModule,
        ],
        declarations: [ ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(CartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      snackBar = TestBed.inject(MatSnackBar);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show message snackbar', () => {
      let spySnackBar = spyOn(snackBar, 'open');
      component.confirmarCompra();
      expect(spySnackBar).toHaveBeenCalled();
    });

    it('should show message snackbar 2', () => {
      let spySnackBar = spyOn(snackBar, 'open');
      component.confirmarCompra(true);
      expect(spySnackBar).toHaveBeenCalled();
    });
    it('should make dialog visible', () => {
      let spySnackBar = spyOn(snackBar, 'open');
      component.confirmarCompra(true,true);
      expect(component.visible).toBe(true);
    });

    it('should delete all', () => {
      component.removeAll();
      expect(component.total).toBe(0);
      expect(component.total_price).toBe(0);
  });
    it('should add and delete 1 item', () => {
      let post: productBasicInfo = {
                id: 1,
                selection:1,
                price:10
                }
      component.productsCart.push(post)
      component.updateTotal()
      expect(component.total).toBe(1);
      expect(component.total_price).toBe(10);
      component.removeItem(1)
      component.updateTotal()
      expect(component.total).toBe(0);
      expect(component.total_price).toBe(0);
  });
    it('should modify 1 item', () => {
      let post: productBasicInfo = {
                id: 1,
                selection:1,
                price:10
                }
      component.productsCart.push(post)
      component.updateTotal()
      component.updateSelection(3,1)
      component.updateTotal()
      expect(component.total).toBe(3);
      expect(component.total_price).toBe(30);
  });
    it('should get image', () => {
        expect(component.getImage({image:""})).toBe("default.jpg");
        expect(component.getImage({image:"lol"})).toBe("lol");
  });
});
