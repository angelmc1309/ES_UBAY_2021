import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import {CardModule} from "primeng/card"
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from "./views/login.component";
import { CarouselModule } from "primeng/carousel";
import {GalleriaModule} from "primeng/galleria";
import { LoginService } from "./services/login.service";
import { LoginRoutingModule } from "./login-routing.module";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthenticationService } from "src/app/services/authentication.service";
import { AlertService } from "src/app/services/alert.service";
@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        ButtonModule,
        HttpClientModule,
        DataViewModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        GalleriaModule,
        CardModule,
        LoginRoutingModule,
        MatSnackBarModule,
        CarouselModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: HttpLoaderFactory,
        //         deps: [HttpClient]
        //     }
        // })
    ],
    providers: [LoginService, AuthenticationService, AlertService],
    exports: [LoginComponent]
})
export class loginStatusModule {
    // constructor(protected translateService: TranslateService) {
    //     const currentLang = translateService.currentLang || "es";
    //     translateService.currentLang = "";
    //     translateService.use(currentLang);
    // }
}