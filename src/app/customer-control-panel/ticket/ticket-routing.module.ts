import { TicketCreationComponent } from './ticket-creation/ticket-creation.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: TicketListComponent
            },
            {
                path: 'ticket-creation',
                component: TicketCreationComponent
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
export class TicketRoutingModule { }


