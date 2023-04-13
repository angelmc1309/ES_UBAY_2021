import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse, productBasicInfo, url } from 'src/app/models/general.interfaces';
@Injectable()
export class ProductListService {

    constructor(private http: HttpClient){}

    getFilteredProducts(): Observable<any>{
        return this.http.get(url+'products');
    }
}