import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MultiTranslateHttpLoader } from "ngx-translate-multi-http-loader";
import { SharedModule } from "src/app/shared/modules/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";


export function HttpLoaderFactory(http: HttpClient) {
    return new MultiTranslateHttpLoader(http, [
        { prefix: "./assets/i18n/customer-panel/profile/", suffix: ".json" },
        { prefix: "./assets/i18n/shared/", suffix: ".json" },
    ]);
}

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: true
        }),
        ProfileRoutingModule
    ]
})
export class ProfileModule { }