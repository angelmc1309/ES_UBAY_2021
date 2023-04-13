import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {CardModule} from 'primeng/card';
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";
import { DataViewModule } from "primeng/dataview";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CarouselModule} from 'primeng/carousel';
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./views/profile.component";
import { DockModule } from "primeng/dock";
import {SidebarModule} from 'primeng/sidebar';
import {TabMenuModule} from 'primeng/tabmenu';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthenticationService } from "src/app/services/authentication.service";
import {ProfileService} from "./services/profile.service";
import {RouterModule} from "@angular/router";
import {InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from "primeng/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        CarouselModule,
        MatSnackBarModule,
        RatingModule,
        TabMenuModule,
        MatTabsModule,
        SidebarModule,
        ReactiveFormsModule,
        FormsModule,
        DockModule,
        DataViewModule,
        ButtonModule,
        CardModule,
        FormsModule,
        ProfileRoutingModule,
        HttpClientModule,
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
    providers: [AuthenticationService, ProfileService, RouterModule]
})
export class profileStatusModule {
    // constructor(protected translateService: TranslateService) {
    //     const currentLang = translateService.currentLang || "es";
    //     translateService.currentLang = "";
    //     translateService.use(currentLang);
    // }
}
