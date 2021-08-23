import { SharedModule } from './../shared/modules/shared.module';
import { FaqsRoutingModule } from './faqs-routing.module';
import { CommonModule } from '@angular/common';
import { FaqsComponent } from './faqs.component';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/faqs/", suffix: ".json" },
    { prefix: "./assets/i18n/shared/", suffix: ".json" },
  ]);
}
@NgModule({
  declarations: [FaqsComponent],
  imports: [
    CommonModule,
    FaqsRoutingModule,
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
export class FaqsModule { }