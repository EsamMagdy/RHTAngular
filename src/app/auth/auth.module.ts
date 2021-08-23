import { VerificationCodeComponent } from './verify-code/verify-code.component';
import { SharedModule } from './../shared/modules/shared.module';
import { RecoverPassword } from './recover-password/recover-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//     return new TranslateHttpLoader(http, './assets/i18n/auth/', '.json');
//   }

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/auth/", suffix: ".json" },
    { prefix: "./assets/i18n/shared/", suffix: ".json" },
  ]);
}
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignUpComponent,
    RecoverPassword,
    VerificationCodeComponent,
    SetNewPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
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
export class AuthModule { }