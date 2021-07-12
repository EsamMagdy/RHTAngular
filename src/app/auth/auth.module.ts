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

@NgModule({
    declarations:[
        AuthComponent,
        LoginComponent,
        SignUpComponent,
        RecoverPassword,
        VerificationCodeComponent,
        SetNewPasswordComponent
    ],
    imports:[
        CommonModule,
        AuthRoutingModule,
        SharedModule
    ]
})
export class AuthModule{}