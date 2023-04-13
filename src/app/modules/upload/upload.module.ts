import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { UploadRoutingModule } from "./upload-routing.module";
import { UploadComponent } from "./views/upload.component";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {RouterModule} from "@angular/router";
import {UploadService} from "./services/upload.service";
import {AuthenticationService} from "../../services/authentication.service";

@NgModule({
    declarations: [UploadComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ButtonModule,
        DataViewModule,
        InputTextModule,
        ReactiveFormsModule ,
        FormsModule,
        MatSnackBarModule,
        ButtonModule,
        RouterModule,
        UploadRoutingModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: HttpLoaderFactory,
        //         deps: [HttpClient]
        //     }
        // })
    ],
    providers: [AuthenticationService, UploadService]
})
export class uploadStatusModule {
    // constructor(protected translateService: TranslateService) {
    //     const currentLang = translateService.currentLang || "es";
    //     translateService.currentLang = "";
    //     translateService.use(currentLang);
    // }
}