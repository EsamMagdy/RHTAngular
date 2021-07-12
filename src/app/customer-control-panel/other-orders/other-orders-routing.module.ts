import { OtherOrdersDetailsResolverService } from './other-orders-details/other-orders-details.resolver';
import { OtherOrdersDetailsComponent } from './other-orders-details/other-orders-details.component';
import { OtherOrdersListComponent } from './other-orders-list/other-orders-list.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { OtherOrdersCreationComponent } from './other-orders-creation/other-orders-creation.component';

const routes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: OtherOrdersListComponent
        },
        {
            path: 'other-orders-creation',
            component: OtherOrdersCreationComponent
        },
        {
            path:'other-orders-details/:id',
            component:OtherOrdersDetailsComponent,
            resolve:{ details: OtherOrdersDetailsResolverService }
        }
    ]
}];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class OtherOrdersRoutingModule { }