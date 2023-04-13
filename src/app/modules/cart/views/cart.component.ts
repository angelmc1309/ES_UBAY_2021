import { Component, OnInit } from "@angular/core";
import { MenuItem, PrimeNGConfig } from "primeng/api";
import { CartService } from "../services/cart.service";
import { ActivatedRoute, Router } from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { AuthenticationService } from "../../../services/authentication.service";

import {
  productBasicInfo,
} from "../../../models/general.interfaces";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  dockBasicItems: MenuItem[] = [];
  currentUser: any;
  constructor(private cart: CartService,
              private snackBar: MatSnackBar,
              private authenticationService: AuthenticationService) {  }
  productsCart: productBasicInfo[] = [];
  total_price: number = 0;
  total: number = 0;
  visible: boolean=false;

  async ngOnInit() {
    this.updateTotal();
    this.authenticationService.currentUser.subscribe(res => {
      this.currentUser = res.account.username
    });
  }

  updateTotal() {
    this.total_price = 0;
    this.total = 0;
    this.productsCart = this.cart.getCart();
    this.productsCart.forEach((element:any) => {
      this.total_price += element.price * element.selection;
      this.total += element.selection;
    });
  }

  removeItem(id: any) {
    this.productsCart = this.productsCart.filter(item => item.id != id)
    this.cart.updateProduct(this.productsCart);
    this.updateTotal();
  }

  updateSelection(e: any, id: any) {
    this.productsCart[this.productsCart.indexOf(this.productsCart.find((item:any) => item.id === id)!)].selection = e;
    this.cart.updateProduct(this.productsCart);
    this.updateTotal();
  }
  removeAll() {
    this.productsCart = [];
    this.cart.updateProduct(this.productsCart);
    this.updateTotal();
  }

  confirmarCompra(testingValue1=false, testingValue2=false){
    if (this.total==0 && !testingValue1){
      this.snackBar.open("Cesta vacia", "Ok")
    }
    else{
      if (this.currentUser==null && !testingValue2){
        this.snackBar.open("No estas logged, por favor logueate para poder continuar", "Ok")
      }
      else{
        this.visible=true;
      }
  }
  }

  async pay() {
    console.log(this.currentUser)
    await this.productsCart.forEach(element => {
      this.cart.postOrder(this.currentUser,{id_product:element.id,quantity:element.selection}).subscribe(res=> console.log(res))
    });
    this.removeAll();
    this.visible=false;
    this.snackBar.open("Has comprado los productos!", "Ok")
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
