import { UploadAttachmentsComponent } from './ind-orders-details/upload-attachments/upload-attachments.component';
import { CustomerControlPanelSharedModule } from './../customer-control-panel.shared.module';
import { IndOrdersFilterComponent } from './ind-orders-filter/ind-orders-filter.component';
import { IndOrdersDetailsComponent } from './ind-orders-details/ind-orders-details.component';
import { IndOrdersItemComponent } from './ind-orders-list/ind-orders-item/ind-orders-item.component';
import { IndOrdersComponent } from './ind-orders.component';
import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/modules/shared.module";
import { IndOrdersRoutingModule } from "./ind-orders-routing.module";
import { IndOrdersListComponent } from './ind-orders-list/ind-orders-list.component';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
      {prefix: "./assets/i18n/ticket/", suffix: ".json"},
      {prefix: "./assets/i18n/shared/", suffix: ".json"},
  ]);
}

// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
//   }
@NgModule({
    declarations: [
        IndOrdersComponent,
        IndOrdersListComponent,
        IndOrdersItemComponent,
        IndOrdersDetailsComponent,
        IndOrdersFilterComponent,
        UploadAttachmentsComponent
    ],
    imports: [
        CommonModule,
        IndOrdersRoutingModule,
        SharedModule,
        AgmCoreModule.forRoot({
            // apiKey: 'AIzaSyDbwcRdDylRg2IoZhU9_LmWa7dD6YL85Xk'
            apiKey: environment.googleMapKey

        }),
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            },
            isolate: true
          }),
        CustomerControlPanelSharedModule
    ],
})
export class IndOrdersModule {

}