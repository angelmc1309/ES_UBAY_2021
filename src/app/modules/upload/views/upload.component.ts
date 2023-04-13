import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UploadService} from '../services/upload.service'
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {order} from "../../../models/general.interfaces";
import {productBasicInfo} from "src/app/models/general.interfaces";
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  newProdForm!: FormGroup;
  productBasicInfo:any ={
    name:"",
    description:"",
    price:0,
    quantity:0,
    category:"",
    rating:0
};
  constructor(
      private uploadService: UploadService,
      private authenticationService: AuthenticationService,
      private fb: FormBuilder,
      private routerActivated: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.initFilterForm();
  }
  initFilterForm(): void {
    this.newProdForm = this.fb.group({
      name: ["", Validators.required],
      quantity: ["", Validators.required],
      price: ["", Validators.required],
      category: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  uploadButton(): void {
    if(this.newProdForm.valid){
      this.getFilterValues();
      this.uploadProd(this.productBasicInfo);
    }
    else this.showMsgError();
  }
  getFilterValues(): void {
    Object.keys(this.productBasicInfo).forEach((item:string)=> {
      this.productBasicInfo[item] = this.newProdForm.get(item)?.value;
    })
  }
  async uploadProd(item:any){
    const username = this.authenticationService.currentUserValue.account.username;
    let id = await this.uploadService.postNewItem(item).toPromise();
    id = id.message.split("[")[1];
    id = id.split("]")[0];
    const message = await this.uploadService.associateItemToUser(Number(id),username).toPromise();
    this.snackBar.open(message.message, 'Ok').afterDismissed().subscribe(res=> {
      this.redirectTo('/profile')
    });
  }
  showMsgError(): void {
    this.snackBar.open("Los campos no son correctos", 'Ok');
  }
  closeSnackBar(): void {
    this.snackBar.dismiss();
  }
  redirectTo(uri: string, additionalInfo?: any) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri], {queryParams: {title: additionalInfo}}));
  }
}