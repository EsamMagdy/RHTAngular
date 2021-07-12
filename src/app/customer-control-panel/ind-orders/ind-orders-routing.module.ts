import { IndOrdersDetailsComponent } from './ind-orders-details/ind-orders-details.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { IndOrdersListComponent } from './ind-orders-list/ind-orders-list.component';
import { IndOrdersDetailsResolverService } from './ind-orders-details/ind-orders-details-resolver.service';
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: IndOrdersListComponent
            },
            {
                path: 'ind-orders-details/:id',
                component: IndOrdersDetailsComponent,
                resolve: { details: IndOrdersDetailsResolverService }
            }

        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class IndOrdersRoutingModule { }


