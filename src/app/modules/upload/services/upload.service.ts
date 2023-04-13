import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {GenericResponse, responseBackend} from 'src/app/models/general.interfaces';
import {url} from "src/app/models/general.interfaces";

@Injectable()
export class UploadService {

    constructor(private http: HttpClient){}

    postNewItem(item: any):Observable<any>{
        return this.http.post(url+'product/', item)
    }
    associateItemToUser(item:number,username:string):Observable<any>{
        return this.http.post(url+'account/'+username+'/product/'+item, item)
    }

}
