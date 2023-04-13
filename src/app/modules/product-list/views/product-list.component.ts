import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productBasicInfo } from 'src/app/models/general.interfaces';
import { ProductListService } from '../services/product-list.service';
import {CartService} from "../../cart/services/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  searchValue: string = "";
  allProducts: any = [];
  products: any = [];
  productsCart: productBasicInfo[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productListService: ProductListService,
    private cdr: ChangeDetectorRef,
    private cart: CartService,
    private snackBar: MatSnackBar,
  ) {     
  }

  ngOnInit() {
    this.productsCart=this.cart.getCart();
    let value =this.route.snapshot.queryParams['title'];
    if(value) this.searchValue = value
    else value = "";
    this.productListService.getFilteredProducts().subscribe(res => {
      this.products = res.products.filter((element:any) => {
        if(element.name!.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1) {
          return element;
        }
      })
    })
  }
  redirectTo(uri: string, additionalInfo?: any) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri], {queryParams: {title: additionalInfo}}));
  }
  productInformationShow(value?: any) {
    this.redirectTo('/product-info', value?.id);
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
