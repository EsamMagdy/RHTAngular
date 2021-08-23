import { CustomerControlPanelSharedModule } from './../customer-control-panel.shared.module';
import { TicketItemComponent } from './ticket-list/ticket-item/ticket-item.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';
import { TicketCreationComponent } from './ticket-creation/ticket-creation.component';
import { TicketRoutingModule } from './ticket-routing.module';
import { SharedModule } from './../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { TicketComponent } from './ticket.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/customer-panel/", suffix: ".json" },
    { prefix: "./assets/i18n/shared/", suffix: ".json" },
  ]);
}

@NgModule({
  declarations: [
    TicketComponent,
    TicketCreationComponent,
    TicketFilterComponent,
    TicketListComponent,
    TicketItemComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    SharedModule,
    TicketRoutingModule,
    // CustomerControlPanelSharedModule
  ]
})
export class TicketModule { }