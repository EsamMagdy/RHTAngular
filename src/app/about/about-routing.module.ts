import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

@NgModule({
    imports:[
        RouterModule.forChild([{
            path:'',
            component:AboutComponent
        }])
    ],
    exports:[RouterModule]
})
export class AboutRoutingModule{

}