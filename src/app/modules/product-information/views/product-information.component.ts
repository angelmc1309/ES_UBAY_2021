import { Component, OnInit } from '@angular/core';
import { carouselItems, productBasicInfo } from 'src/app/models/general.interfaces';
import { ProductInfoService } from '../services/product-information.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from '../../home-page/services/home-page.service';
import {CartService} from '../../cart/services/cart.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit {

  product: any = [];
  productsCart: productBasicInfo[] = [];
  value1: number = 1;
  productsCarousel: any = [];

   constructor(
    private productInfoService: ProductInfoService,
    private cart: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    ) {
  }
  ngOnInit() {
    let value = this.route.snapshot.queryParams['title'];
    this.productInfoService.getProduct(value).subscribe(res => {
      this.product = res.product;
      //console.log(this.product)
    })
    this.productInfoService.getAllProducts().subscribe(res => {
      this.productsCarousel = res.products.slice(0,12)
    })
    this.productsCart=this.cart.getCart();
}
redirectTo(uri: string, additionalInfo?: any) {
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
  this.router.navigate([uri], {queryParams: {title: additionalInfo}}));
}
productInformationShow(value?: any) {
  this.redirectTo('/product-info', value?.id);
}
productCartAdd(value: any, sel:number) {
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

inStock(value: string){
     if (value=="OUTOFSTOCK"){
       return 'bg-red';
     }
     else if (value=="INSTOCK"){
       return 'bg-green';
     }
    else{
      return 'bg-yellow';
     }
}

inStockButton(value: string){
     if (value=="OUTOFSTOCK"){
       return 'addToCartDisabled';
     }
    else{
      return 'addToCart';
     }

}
inStockButtonString(value: string){
     if (value=="OUTOFSTOCK"){
       return 'OUT OF STOCK';
     }
    else{
      return 'ADD TO CART';
     }

}

getImage(item:any){
       if (item.image != ""){
           return item.image;
       }
       else{
           return 'default.jpg'
       }
}

}
