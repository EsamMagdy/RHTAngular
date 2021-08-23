import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SharedModule } from '../shared/modules/shared.module';
import { PaymentCardComponent } from "./payment-card/payment-card.component";
import { PaymentRoutingModule } from "./payment-routing.module";
import { PaymentStatusComponent } from "./payment-status/payment-status.component";
import { PaymentComponent } from "./payment.component";


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
@NgModule({
    declarations: [
        PaymentComponent,
        PaymentCardComponent,
        PaymentStatusComponent
    ],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            },
            isolate: true
          }),
        SharedModule
    ]
})
export class PaymentModule {
}