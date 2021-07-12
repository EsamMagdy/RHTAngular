import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { NgModule } from "@angular/core";
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
    declarations:[AboutComponent],
    imports:[
        CommonModule,
        AboutRoutingModule,
        SharedModule
    ]
})
export class AboutModule{

}