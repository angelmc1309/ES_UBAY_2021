import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home-page/views/home-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home-page',
    pathMatch: 'full'
  },
  {
    path: 'home-page',
    loadChildren: () =>
      import(
        './modules/home-page/home-page.module'
      ).then( m => m.homePageStatusModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import(
        './modules/login/login.module'
      ).then( m => m.loginStatusModule),
  },
  {
    path: 'product-info',
    loadChildren: () =>
      import(
        './modules/product-information/product-information.module'
      ).then((m) => m.productInformationStatusModule),
  },
  {
    path: 'product-list',
    loadChildren: () =>
      import(
        './modules/product-list/product-list.module'
      ).then((m) => m.productListStatusModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import(
        './modules/cart/cart.module'
      ).then( m => m.cartStatusModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import(
        './modules/profile/profile.module'
      ).then((m) => m.profileStatusModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import(
        './modules/register/register.module'
      ).then((m) => m.RegisterStatusModule),
  },
  {
    path: 'upload',
    loadChildren: () =>
      import(
        './modules/upload/upload.module'
      ).then( m => m.uploadStatusModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
