import { SharedModule } from './../shared/modules/shared.module';
import { FaqsRoutingModule } from './faqs-routing.module';
import { CommonModule } from '@angular/common';
import { FaqsComponent } from './faqs.component';
import { NgModule } from '@angular/core';
@NgModule({
    declarations:[FaqsComponent],
    imports:[
        CommonModule,
        FaqsRoutingModule,
        SharedModule
    ]
})
export class FaqsModule{

}