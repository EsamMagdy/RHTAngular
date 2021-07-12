import { UploadAttachmentsComponent } from './ind-orders/ind-orders-details/upload-attachments/upload-attachments.component';
import { ContractPaymentRenwalComponent } from './contracts/contract-renewal/contract-renewal-payment/contract-renewal-payment.component';
import { PricingChoosingComponent } from './contracts/contract-renewal/pricing-choosing/pricing-choosing.component';
import { ContractRenewalResolverService } from './contracts/contract-renewal/contract-renewal.resolver.service';
import { ContractRenewalPricingDetailsComponent } from './contracts/contract-renewal/pricing-details/pricing-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { CustomerControlPanelComponent } from './customer-control-panel.component';
import { TicketComponent } from './ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { ContractsComponent } from './contracts/contracts.component';
import { IndOrdersComponent } from './ind-orders/ind-orders.component';
import { OtherOrdersComponent } from './other-orders/other-orders.component';
import { AuthGurad } from '../auth/auth.guard';
import { ContractRenewalComponent } from './contracts/contract-renewal/contract-renewal.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerControlPanelComponent,
        canActivate: [AuthGurad],
        children: [
            { path: '', component: DashboardComponent },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'contracts',
                component: ContractsComponent,
                loadChildren: () => import('./contracts/contracts.module').then(m => m.ContractsModule)
            },
            {
                path: 'ind-orders',
                component: IndOrdersComponent,
                loadChildren: () => import('./ind-orders/ind-orders.module').then(m => m.IndOrdersModule)
            },
            {
                path: 'ticket',
                component: TicketComponent,
                loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
            },
            {
                path: 'other-orders',
                component: OtherOrdersComponent,
                loadChildren: () => import('./other-orders/other-orders.module').then(m => m.OtherOrdersModule)
            }
        ]
    },
    {
        path: 'contract-renewal',
        component: ContractRenewalComponent,
        resolve: { indivContract: ContractRenewalResolverService },
        children: [
            {
                path: ':id',
                component: PricingChoosingComponent
            },
            {
                path: ':id/pricing-details',
                component: ContractRenewalPricingDetailsComponent
            },
            {
                path: ':id/payment',
                component: ContractPaymentRenwalComponent
            }
        ]
    },
    {
        path: 'upload-attachments',
        component: UploadAttachmentsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerControlPanelRoutingModule { }