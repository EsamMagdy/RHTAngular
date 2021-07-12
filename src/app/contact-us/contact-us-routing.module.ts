import { ContactUsComponent } from './contact-us.component';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { BranchesComponent } from './branches/branches.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ContactUsComponent,
            },
            {
                path: 'branches',
                component: BranchesComponent
            },
        ])
    ],
    exports: [RouterModule]
})
export class ContactUsRoutingModule { }