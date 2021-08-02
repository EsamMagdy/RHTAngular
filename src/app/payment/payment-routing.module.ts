import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PaymentStatusComponent } from "./payment-status/payment-status.component";
import { PaymentComponent } from "./payment.component";

@NgModule({
    imports: [RouterModule.forChild([{
        path: '',
        component: PaymentComponent
    },
    {
        path:'payment-status',
        component:PaymentStatusComponent
    }])],
    exports: [RouterModule]
})
export class PaymentRoutingModule { }