import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ProductListComponent } from "./views/product-list.component";
import { ButtonModule } from "primeng/button";
import { DataViewModule } from "primeng/dataview";
import { InputTextModule } from "primeng/inputtext";
import { RatingModule } from "primeng/rating";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { productListRoutingModule } from "./product-list-routing.module";
import { ProductListService } from "./services/product-list.service";
import { HomePageService } from "../home-page/services/home-page.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
    declarations: [ ProductListComponent ],
    imports: [
        CommonModule,
        HttpClientModule,
        CommonModule,
        ButtonModule,
        DataViewModule,
        HttpClientModule,
        DataViewModule,
        ButtonModule,
        DataViewModule,
        InputTextModule,
        RatingModule,
        DropdownModule,
        FormsModule,
        MatSnackBarModule,
        ButtonModule,
        productListRoutingModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: HttpLoaderFactory,
        //         deps: [HttpClient]
        //     }
        // })
    ],
    providers: [ProductListService]
})
export class productListStatusModule {
    // constructor(protected translateService: TranslateService) {
    //     const currentLang = translateService.currentLang || "es";
    //     translateService.currentLang = "";
    //     translateService.use(currentLang);
    // }
}