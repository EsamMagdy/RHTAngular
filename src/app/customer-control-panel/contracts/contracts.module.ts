import { ContractPaymentRenwalComponent } from './contract-renewal/contract-renewal-payment/contract-renewal-payment.component';
import { OtherPricingComponent } from './contract-renewal/pricing-choosing/other-pricing/other-pricing.component';
import { CurrentPricingComponent } from './contract-renewal/pricing-choosing/current-pricing/current-pricing.component';
import { CustomerControlPanelSharedModule } from './../customer-control-panel.shared.module';
import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractRenewalComponent } from './contract-renewal/contract-renewal.component';
import { ContractItemComponent } from './contract-list/contract-item/contract-item.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractsComponent } from './contracts.component';
import { SharedModule } from './../../shared/modules/shared.module';
import { NgModule } from "@angular/core";
import { ContractCreationComponent } from './contract-creation/contract-creation.component';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ContractRenewalPricingDetailsComponent } from './contract-renewal/pricing-details/pricing-details.component';
import { PricingChoosingComponent } from './contract-renewal/pricing-choosing/pricing-choosing.component';

@NgModule({
    declarations: [
        ContractsComponent,
        ContractCreationComponent,
        ContractDetailsComponent,
        ContractListComponent,
        ContractItemComponent,
        ContractRenewalComponent,
        CurrentPricingComponent,
        OtherPricingComponent,
        ContractRenewalPricingDetailsComponent,
        PricingChoosingComponent,
        ContractPaymentRenwalComponent
    ],
    imports: [
        CommonModule,
        ContractsRoutingModule,
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDbwcRdDylRg2IoZhU9_LmWa7dD6YL85Xk',

        }),
        CustomerControlPanelSharedModule ,
        ScrollPanelModule   
    ],
})
export class ContractsModule {

}