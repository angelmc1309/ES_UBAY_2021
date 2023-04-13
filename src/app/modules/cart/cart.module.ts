import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {CardModule} from 'primeng/card';
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";
import { DataViewModule } from "primeng/dataview";
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CarouselModule} from 'primeng/carousel';
import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./views/cart.component";
import { DockModule } from "primeng/dock";
import {CartService} from "./services/cart.service";
import {InputNumberModule} from "primeng/inputnumber";
import {MatSnackBarModule} from "@angular/material/snack-bar";

import {DialogModule} from "primeng/dialog";
import { AuthenticationService } from "src/app/services/authentication.service";

@NgModule({
    declarations: [CartComponent],
    imports: [
        CommonModule,
        CarouselModule,
        RatingModule,
        DockModule,
        DataViewModule,
        TableModule,
        ButtonModule,
        CardModule,
        FormsModule,
        ReactiveFormsModule,
        CartRoutingModule,
        HttpClientModule,
        MatSnackBarModule,
        InputNumberModule,
        DialogModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: HttpLoaderFactory,
        //         deps: [HttpClient]
        //     }
        // })
    ],
    providers: []
    //He quitado el cartService porque necesito crear la instancia al generar la pagina, por tanto este se crea ahora al iniciar la homepage
    //Update, aparentemente no hace falta si quiera declararlo, asi que no se declara en ningun sitio y funciona igual
})
export class cartStatusModule {
    // constructor(protected translateService: TranslateService) {
    //     const currentLang = translateService.currentLang || "es";
    //     translateService.currentLang = "";
    //     translateService.use(currentLang);
    // }
}
