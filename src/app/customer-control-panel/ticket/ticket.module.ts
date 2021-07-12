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

@NgModule({
    declarations:[
        TicketComponent,
        TicketCreationComponent,
        TicketFilterComponent,
        TicketListComponent,
        TicketItemComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        TicketRoutingModule,
        CustomerControlPanelSharedModule
    ]
})
export class TicketModule{}