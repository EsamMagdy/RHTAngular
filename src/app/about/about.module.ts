import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { NgModule } from "@angular/core";
import { AboutRoutingModule } from './about-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
@NgModule({
    declarations:[AboutComponent],
    imports:[
        CommonModule,
        AboutRoutingModule,
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
export class AboutModule{

}