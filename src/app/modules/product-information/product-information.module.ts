import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import {CardModule} from 'primeng/card';
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";
import { DataViewModule } from "primeng/dataview";
import { FormsModule } from "@angular/forms";
import { ProductInformationComponent } from "./views/product-information.component";
import { productInformationRoutingModule } from "./product-information-routing.module";
import {CarouselModule} from 'primeng/carousel';
import { ProductInfoService } from "./services/product-information.service";
import { InputNumberModule } from "primeng/inputnumber";
import { HomePageService } from "../home-page/services/home-page.service";
import {CartService} from "../cart/services/cart.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
    declarations: [ProductInformationComponent],
    imports: [
        CommonModule,
        CarouselModule,
        RatingModule,
        DataViewModule,
        ButtonModule,
        CardModule,
        InputNumberModule,
        FormsModule,
        productInformationRoutingModule,
        HttpClientModule,
        MatSnackBarModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: HttpLoaderFactory,
        //         deps: [HttpClient]
        //     }
        // })
    ],
    providers: [ProductInfoService, HomePageService]
})
export class productInformationStatusModule {
    // constructor(protected translateService: TranslateService) {
    //     const currentLang = translateService.currentLang || "es";
    //     translateService.currentLang = "";
    //     translateService.use(currentLang);
    // }
}