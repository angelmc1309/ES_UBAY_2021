import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ButtonModule } from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import { homePageStatusModule } from './modules/home-page/home-page.module';
import { productInformationStatusModule } from './modules/product-information/product-information.module';
import { productListStatusModule } from './modules/product-list/product-list.module';
import {MenubarModule} from 'primeng/menubar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loginStatusModule } from './modules/login/login.module';
import {DialogModule} from 'primeng/dialog';
import { UbayFooterComponent } from './components/ubay-footer/ubay-footer.component';
import { HomePageService } from './modules/home-page/services/home-page.service';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { JwtInterceptor } from './helpers/jwt.incerceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
@NgModule({
  declarations: [ AppComponent, UbayFooterComponent],
  imports: [
    BrowserModule,
    DialogModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    homePageStatusModule,
    loginStatusModule,
    productInformationStatusModule,
    productListStatusModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    BrowserAnimationsModule,
    RatingModule,
    MenubarModule,
    SplitButtonModule,
    ToolbarModule,
    HttpClientModule,
  //   TranslateModule.forRoot({
  //     defaultLanguage: 'es',
  //     loader: {
  //         provide: TranslateLoader,
  //         useFactory: HttpLoaderFactory,
  //         deps: [HttpClient]
  //     }
  // })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: LocationStrategy, useClass: PathLocationStrategy},
     AuthenticationService, 
     AlertService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
