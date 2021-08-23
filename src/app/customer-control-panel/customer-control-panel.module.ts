import { UserMenuComponent } from './user-menu/user-menu.component';
import { CustomerControlPanelSharedModule } from './customer-control-panel.shared.module';
import { SharedModule } from './../shared/modules/shared.module';
import { SupportTicketsComponent } from './dashboard/support-tickets/support-tickets.component';
import { LastRequestsComponent } from './dashboard/last-requests/last-requests.component';
import { LastContractsComponent } from './dashboard/last-contracts/last-contracts.component';
import { DashboardInfoComponent } from './dashboard/dashboard-info/dashboard-info.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CustomerControlPanelRoutingModule } from './customer-control-panel-routing.module';
import { CustomerControlPanelComponent } from './customer-control-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OtherOrdersComponent } from './other-orders/other-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketComponent } from './ticket/ticket.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { MobileUserMenuComponent } from './mobile-user-menu/mobile-user-menu.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
      {prefix: "./assets/i18n/customer-panel/", suffix: ".json"},
      {prefix: "./assets/i18n/shared/", suffix: ".json"},
  ]);
}
// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
//   }
@NgModule({
    declarations: [
        CustomerControlPanelComponent,
       
        // ProfileComponent,
        UserMenuComponent,
        MobileUserMenuComponent
        
    ],
    imports: [
        CommonModule,
        CustomerControlPanelRoutingModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            },
            isolate: true
          }),
        SharedModule,
        // CustomerControlPanelSharedModule
    ]
})
export class CustomerPanelModule { }