import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  GenericResponse,
  responseBackend,
} from "src/app/models/general.interfaces";
import { url } from "src/app/models/general.interfaces";

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUserItems(username: any): Observable<any> {
    return this.http.get(url + "account/" + username);
  }
  getAccounts(username: string, formValue: any): Observable<any> {
    const uri = url + "account/" + username;
    //console.log(uri);
    return this.http.put(uri, formValue);
  }
  getBoughtItems(username: any): Observable<any> {
    return this.http.get(url + "order/" + username);
  }
  getItem(id: number): Observable<any> {
    return this.http.get(url + "product/" + id);
  }
  deleteItems(product: any): Observable<any> {
    return this.http.delete(url + "product/" + product.id);
  }
  async getItems(items: []) {
    var result: any[] = [];
    items.forEach(async (element: any) => {
      result.push(this.getItem(element.id_product).toPromise());
    });
    const array = await Promise.all(result);
    return array;
  }
}
