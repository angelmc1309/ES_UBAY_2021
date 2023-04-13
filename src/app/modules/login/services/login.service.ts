import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from 'src/app/models/general.interfaces';
import {Image} from '../models/login-inerfaces'
import {url} from "src/app/models/general.interfaces";

@Injectable()
export class LoginService {

    constructor(private http: HttpClient){}

    getUser(formValue: any): Observable<any> {
        return this.http.get(url+"account/"+formValue.username);
    }
}
