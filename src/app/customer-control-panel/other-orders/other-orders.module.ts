import { OtherOrdersDetailsComponent } from './other-orders-details/other-orders-details.component';
import { CustomerControlPanelSharedModule } from './../customer-control-panel.shared.module';
import { OtherOrdersRoutingModule } from './other-orders-routing.module';
import { SharedModule } from './../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { OtherOrdersItemComponent } from './other-orders-list/other-orders-item/other-orders-item.component';
import { OtherOrdersListComponent } from './other-orders-list/other-orders-list.component';
import { OtherOrdersComponent } from './other-orders.component';
import { NgModule } from "@angular/core";
import { OtherOrdersCreationComponent } from './other-orders-creation/other-orders-creation.component';
import { OtherOrdersFilterComponent } from './other-orders-filter/other-orders-filter.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
@NgModule({
    declarations: [
        OtherOrdersComponent,
        OtherOrdersListComponent,
        OtherOrdersItemComponent,
        OtherOrdersCreationComponent,
        OtherOrdersFilterComponent,
        OtherOrdersDetailsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        OtherOrdersRoutingModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            },
            isolate: true
          }),
        CustomerControlPanelSharedModule
    ]
})
export class OtherOrdersModule { }