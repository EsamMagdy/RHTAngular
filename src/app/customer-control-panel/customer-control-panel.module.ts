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

@NgModule({
    declarations: [
        CustomerControlPanelComponent,
        DashboardComponent,
        DashboardInfoComponent,
        LastContractsComponent,
        LastRequestsComponent,
        SupportTicketsComponent,
        ProfileComponent,
        UserMenuComponent
        
    ],
    imports: [
        CommonModule,
        CustomerControlPanelRoutingModule,
        SharedModule,
        CustomerControlPanelSharedModule
    ]
})
export class CustomerPanelModule { }