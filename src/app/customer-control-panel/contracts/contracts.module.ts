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
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/customer-panel/ind-contracts/", suffix: ".json" },
    { prefix: "./assets/i18n/shared/", suffix: ".json" },
  ]);
}
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
      // apiKey: 'AIzaSyDbwcRdDylRg2IoZhU9_LmWa7dD6YL85Xk'
      apiKey: environment.googleMapKey

    }),
    CustomerControlPanelSharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    ScrollPanelModule
  ],
})
export class ContractsModule {

}