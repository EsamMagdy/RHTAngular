import { FaqsComponent } from './faqs.component';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

@NgModule({
    imports:[RouterModule.forChild([{
        path:'',
        component:FaqsComponent
    }])],
    exports:[RouterModule]
})
export class FaqsRoutingModule{

}