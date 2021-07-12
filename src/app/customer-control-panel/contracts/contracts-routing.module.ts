import { ContractRenewalComponent } from './contract-renewal/contract-renewal.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { ContractCreationComponent } from './contract-creation/contract-creation.component';
import { ContractDetailsResolverService } from './contract-details/contract-details-resolver.service';
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ContractListComponent
            },
            {
                path: 'contract-creation',
                component: ContractCreationComponent
            },
            {
                path: 'contract-details/:id',
                component: ContractDetailsComponent,
                resolve: { details: ContractDetailsResolverService }
            },
            {
                path: 'contract-list',
                component: ContractListComponent
            },
            // {
            //     path: 'contract-renewal/:id',
            //     component: ContractRenewalComponent,
            // },
            

        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ContractsRoutingModule { }


