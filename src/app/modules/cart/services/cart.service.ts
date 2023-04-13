import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericResponse, productBasicInfo, order } from 'src/app/models/general.interfaces';
import {url} from "src/app/models/general.interfaces";

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private productsInit: productBasicInfo[] = [];
    private productsCart = new BehaviorSubject(this.productsInit); // set default status
    private orderList: order[] = [];


    constructor(private http: HttpClient){}

    updateProduct(value?: any){
        this.productsCart.next(value);
    }

    getCart(){
        return this.productsCart.getValue();
    }

    postOrder(username:string, formValue:order): Observable<any>{
        const uri = url+'order/'+username
        return this.http.post(uri,formValue)
    }
}
