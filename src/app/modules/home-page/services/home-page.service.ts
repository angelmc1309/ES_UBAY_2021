import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {url} from "../../../models/general.interfaces";

@Injectable()
export class HomePageService {

    constructor(private http: HttpClient){}

	getProductsFromBackend(): Observable<any>{
        return this.http.get(url+'products');
    }
    getAccount(username:string): Observable<any> {
        return this.http.get(url+'account/'+username)
    }
}
