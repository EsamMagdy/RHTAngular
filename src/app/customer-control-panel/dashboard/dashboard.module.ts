import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { MultiTranslateHttpLoader } from "ngx-translate-multi-http-loader";
import { SharedModule } from "src/app/shared/modules/shared.module";
import { DashboardInfoComponent } from "./dashboard-info/dashboard-info.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { LastContractsComponent } from "./last-contracts/last-contracts.component";
import { LastRequestsComponent } from "./last-requests/last-requests.component";
import { SupportTicketsComponent } from "./support-tickets/support-tickets.component";

export function HttpLoaderFactory(http: HttpClient) {
    return new MultiTranslateHttpLoader(http, [
        { prefix: "./assets/i18n/customer-panel/dashboard/", suffix: ".json" },
        { prefix: "./assets/i18n/shared/", suffix: ".json" },
    ]);
}

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardInfoComponent,
        LastContractsComponent,
        LastRequestsComponent,
        SupportTicketsComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: true
        }),
        DashboardRoutingModule,
        SharedModule,
    ]
})
export class DashboardModule { }