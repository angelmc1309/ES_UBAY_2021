import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { searchProduct } from './models/general.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from './modules/home-page/services/home-page.service';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ){
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  private _destroy$: Subject<void> = new Subject<void>();
  items: MenuItem[] = [];
  isLogged: boolean = false;
  notFirstTime: boolean = false;
  isOkLogged: boolean = false;
  isRegistering: boolean = false;
  data:string = "";
  filterProductsResult: searchProduct = {
    name: "",
    user: "",
  }
  range:string ="";
  ngOnInit() {
    this.items = [
      {
        label: 'UBAY',
        icon: '',
        routerLink: '/home-page'
    },
  ];
  }
  searchButton(): void{
    this.redirectTo('/product-list', this.data);
  }
  redirectTo(uri:string, additionalInfo?: string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri], { queryParams: { title: additionalInfo}}));
 }
 logOut(): void {
  this.authenticationService.logout();
  //localStorage.removeItem('currentUser');
  this.redirectTo('');
 }
  goToCart(): void {
  this.redirectTo('/cart');
 }
 goToProfile(){
   this.redirectTo('/profile')
 }
 goToLogin() {
  this.redirectTo('/login')
  }
  showNewMenuBar(value: any){
    this.redirectTo('/', value.username);
  }
  ngOnDestroy(){
    this._destroy$.next();
    this._destroy$.complete();
  }
}
