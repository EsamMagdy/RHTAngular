import { SendMessageComponent } from './send-message/send-message.component';
import { ContactUsInfoComponent } from './contact-us-info/contact-us-info.component';
import { SharedModule } from './../shared/modules/shared.module';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { NgModule } from "@angular/core";
import { BranchesComponent } from './branches/branches.component';

@NgModule({
    declarations: [
        ContactUsComponent,
        BranchesComponent,
        ContactUsInfoComponent,
        SendMessageComponent
    ],
    imports: [
        CommonModule,
        ContactUsRoutingModule,
        SharedModule
    ]
})
export class ContactUsModule { }