import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { carouselItems, productBasicInfo, responseBackend } from 'src/app/models/general.interfaces';
import { HomePageService } from '../services/home-page.service';
import {CartService} from "../../cart/services/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(
    private homePageService: HomePageService,
    private router: Router,
    private routerActivated: ActivatedRoute,
    private cart: CartService,
    private snackBar: MatSnackBar,
  ) {
  }

  products: any = [];
  productsCarousel: productBasicInfo[] = [];
  productsCart: productBasicInfo[] = [];
   ngOnInit() {
    this.homePageService.getProductsFromBackend().subscribe((res:responseBackend) =>{
      this.products = res.products;
      this.productsCarousel = this.products.slice(0, 12);
      this.productsCart=this.cart.getCart();
    })
  }

  productInformationShow(value?: any) {
    this.redirectTo('/product-info', value.id);
  }
  searchButton(): void {
    this.redirectTo('/product-list', "");
  }
  redirectTo(uri: string, additionalInfo?: any) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri], {queryParams: {title: additionalInfo}}));
  }
    getImage(item:any){
       if (item.image != ""){
           return item.image;
       }
       else{
           return 'default.jpg'
       }
}
productCartAdd(value: any, sel:number=1) {
    value.selection=sel;
    let lista = this.productsCart.filter(item => item.id != value.id)

    if (JSON.stringify(lista)!=JSON.stringify(this.productsCart)){
        this.snackBar.open("El producto ya esta en la cesta", "Ok")
    }
  else{
    this.productsCart.push(value);
    this.cart.updateProduct(this.productsCart);
  }
  this.redirectTo('/cart', value?.id);
}
}
