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
        CustomerControlPanelSharedModule
    ]
})
export class OtherOrdersModule { }