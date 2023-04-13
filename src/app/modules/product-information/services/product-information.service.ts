import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse, productBasicInfo } from 'src/app/models/general.interfaces';
import {url} from "src/app/models/general.interfaces";

@Injectable()
export class ProductInfoService {

    constructor(private http: HttpClient){}

    getProduct(value: any): Observable<any>{
        const uri = url+'product/'+value;
        return this.http.get(uri);
    }
    getAllProducts(): Observable<any>{
        return this.http.get(url+'products');
    }

}