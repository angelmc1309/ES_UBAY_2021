import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {url} from "../../../models/general.interfaces";

@Injectable()
export class RegisterService {

    constructor(private http: HttpClient){}

	getAccounts(username:string, formValue: any): Observable<any> {
        const uri = url+'account/'+username
        return this.http.post(uri, formValue);
    }
}
