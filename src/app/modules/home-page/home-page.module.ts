import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import { HomePageComponent } from "./views/home-page.component";
import { homePageRoutingModule } from "./home-page-routing.module";
import { UbayButtonModule } from "src/app/components/ubay-button/ubay-button.module";
import { RatingModule } from "primeng/rating";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import {CarouselModule} from 'primeng/carousel';
import {BadgeModule} from 'primeng/badge';
import { InputTextModule } from "primeng/inputtext";
import {CardModule} from "primeng/card"
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import { HomePageService } from "./services/home-page.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {CartService} from "../cart/services/cart.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
@NgModule({
    declarations: [HomePageComponent],
    imports: [
        CommonModule,
        ButtonModule,
        CarouselModule,
        BadgeModule,
        UbayButtonModule,
        DataViewModule,
        HttpClientModule,
        homePageRoutingModule,
        InputTextModule,
        RatingModule,
        DropdownModule,
        CardModule,
        ToastModule,
        TabViewModule,
        FormsModule,
        MatSnackBarModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: HttpLoaderFactory,
        //         deps: [HttpClient]
        //     }
        // })
    ],
    providers: [HomePageService, RouterModule]
})
export class homePageStatusModule {
    // constructor(protected translateService: TranslateService) {
    //     const currentLang = translateService.currentLang || "es";
    //     translateService.currentLang = "";
    //     translateService.use(currentLang);
    // }
}