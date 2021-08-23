import { SendMessageComponent } from './send-message/send-message.component';
import { ContactUsInfoComponent } from './contact-us-info/contact-us-info.component';
import { SharedModule } from './../shared/modules/shared.module';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { NgModule } from "@angular/core";
import { BranchesComponent } from './branches/branches.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
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
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            },
            isolate: true
          }),
        SharedModule
    ]
})
export class ContactUsModule { }