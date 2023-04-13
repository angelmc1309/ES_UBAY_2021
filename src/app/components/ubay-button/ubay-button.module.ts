import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UbayButtonComponent } from "./ubay-button.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [UbayButtonComponent],
    exports: [UbayButtonComponent],
})

export class UbayButtonModule {}