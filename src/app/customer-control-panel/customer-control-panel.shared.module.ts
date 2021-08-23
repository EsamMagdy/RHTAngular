import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { MobileUserMenuComponent } from './mobile-user-menu/mobile-user-menu.component';
import { NgModule } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
@NgModule({
    declarations:[
        // MobileUserMenuComponent
    ],
    imports:[
        CommonModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            },
            isolate: true
          }),
        SharedModule
    ],
    exports:[
        // MobileUserMenuComponent
    ]
})
export class CustomerControlPanelSharedModule{}