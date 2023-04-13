import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./views/register.component";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterService } from "./services/register.service";

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        RegisterRoutingModule,
        ButtonModule,
        DataViewModule,
        InputTextModule,
        ReactiveFormsModule ,
        FormsModule,
        MatSnackBarModule,
        ButtonModule,

        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: HttpLoaderFactory,
        //         deps: [HttpClient]
        //     }
        // })
    ],
    providers: [RegisterService]
})
export class RegisterStatusModule {
    // constructor(protected translateService: TranslateService) {
    //     const currentLang = translateService.currentLang || "es";
    //     translateService.currentLang = "";
    //     translateService.use(currentLang);
    // }
}