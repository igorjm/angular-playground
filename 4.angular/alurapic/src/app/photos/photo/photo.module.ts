import { NgModule } from "@angular/core";

import { PhotoComponent } from "./photo.component";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@NgModule({
    declarations: [ PhotoComponent ],
    imports: [ 
        CommonModule,
        HttpClient
    ],
    exports: [ PhotoComponent ]
})
export class PhotoModule{}