import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/modules/shared.module';
import { PaymentCardComponent } from "./payment-card/payment-card.component";
import { PaymentRoutingModule } from "./payment-routing.module";
import { PaymentStatusComponent } from "./payment-status/payment-status.component";
import { PaymentComponent } from "./payment.component";

@NgModule({
    declarations: [
        PaymentComponent,
        PaymentCardComponent,
        PaymentStatusComponent
    ],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        SharedModule
    ]
})
export class PaymentModule {
}