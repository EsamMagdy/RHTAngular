import { EmployeeDetailsModalComponent } from './employee/employee-details-modal/employee-details-modal.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { EmployeeDetailsComponent } from './details/employee-details/employee-details.component';
import { DetailsComponent } from './details/details.component';
import { EmployeeItemComponent } from './employee/employee-list/employee-item/employee-item.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { PricingListComponent } from './pricing/pricing-list/pricing-list.component';
import { PricingFilterComponent } from './pricing/pricing-filter/pricing-filter.component';
import { PricingComponent } from './pricing/pricing.component';
import { EmployeePickSourceComponent } from './pricing/employee-pick-source/employee-pick-source.component';
import { SharedModule } from './../shared/modules/shared.module';
import { StepperComponent } from './stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { CompanyServicesComponent } from './company-services.component';
import { NgModule } from "@angular/core";
import { CompanyServicesRoutingModule } from './company-services.routing.module';
import { LocationComponent } from './location/location.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ContractComponent } from './contract/contract.component';
import { NewLocationComponent } from './location/new-location/new-location.component';
import { SavedLocationComponent } from './location/saved-location/saved-location.component';
import { AgmCoreModule } from '@agm/core';
import { PricingItemComponent } from './pricing/pricing-list/pricing-item/pricing-item.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFilterComponent } from './employee/employee-filter/employee-filter.component';
import { SliderModule } from 'primeng/slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PricingDetailsComponent } from './details/pricing-details/pricing-details.component';
import { NgxPrintModule } from 'ngx-print';
import { NoEmployeeModalComponent } from './employee/no-employee/no-employee.component';
import { CompletingDataComponent } from './completing-data/completing-data.component';
import { environment } from 'src/environments/environment';
import { PaymentLandingPageComponent } from './payment-landing-page/payment-landing-page.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
@NgModule({
    declarations: [
        CompanyServicesComponent,
        StepperComponent,
        LocationComponent,
        ContractComponent,
        NewLocationComponent,
        SavedLocationComponent,
        PricingComponent,
        PricingFilterComponent,
        PricingListComponent,
        PricingItemComponent,
        EmployeePickSourceComponent,
        EmployeeComponent,
        EmployeeFilterComponent,
        EmployeeListComponent,
        EmployeeItemComponent,
        DetailsComponent,
        PricingDetailsComponent,
        EmployeeDetailsComponent,
        AttachmentsComponent,
        PaymentLandingPageComponent,
        EmployeeDetailsModalComponent,
        NoEmployeeModalComponent,
        CompletingDataComponent
    ],
    imports: [
        CommonModule,
        CompanyServicesRoutingModule,
        ScrollPanelModule,
        AgmCoreModule.forRoot({
            // apiKey: 'AIzaSyDbwcRdDylRg2IoZhU9_LmWa7dD6YL85Xk',
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
        SharedModule,
        SliderModule,
        NgxSliderModule,
        NgxPrintModule

    ]
})
export class CompanyServicesModule {

}