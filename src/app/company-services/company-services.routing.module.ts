import { CompanyServiceResolverService } from './company-service-resolver';
import { AttachmentsComponent } from './attachments/attachments.component';
import { DetailsComponent } from './details/details.component';
import { EmployeeComponent } from './employee/employee.component';
import { CompanyServicesComponent } from './company-services.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LocationComponent } from './location/location.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContractComponent } from './contract/contract.component';
import { NewLocationComponent } from './location/new-location/new-location.component';
import { SavedLocationComponent } from './location/saved-location/saved-location.component';
import { AuthGurad } from '../auth/auth.guard';
import { CompletingDataComponent } from './completing-data/completing-data.component';
import { CompanyServiceGuard } from './company-service.guard';
import { PaymentLandingPageComponent } from './payment-landing-page/payment-landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyServicesComponent,
    resolve: { indivContract: CompanyServiceResolverService },
    children: [
      {
        path: '',
        component: LocationComponent,
      },
      {
        path: 'new-location',
        component: NewLocationComponent,
        // canActivate: [CompanyServiceGuard],
      },
      {
        path: 'saved-location',
        component: SavedLocationComponent,
        // canActivate: [CompanyServiceGuard],
      },
      {
        path: 'pricing',
        component: PricingComponent,
        // canActivate: [CompanyServiceGuard],
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        canActivate: [AuthGurad],
        // canActivate: [AuthGurad, CompanyServiceGuard],
      },
      {
        path: 'details',
        component: DetailsComponent,
        canActivate: [AuthGurad],
        // canActivate: [AuthGurad, CompanyServiceGuard],
      },
      {
        path: 'complete-data',
        component: CompletingDataComponent,
        canActivate: [AuthGurad],
        // canActivate: [AuthGurad, CompanyServiceGuard],
      },
      {
        path: 'contract',
        component: ContractComponent,
        canActivate: [AuthGurad],
      },
      {
        path: 'attachment',
        component: AttachmentsComponent,
        canActivate: [AuthGurad],
      },
      {
        path: 'payment-landing-page',
        component: PaymentLandingPageComponent,
        canActivate: [AuthGurad,],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyServicesRoutingModule {}
