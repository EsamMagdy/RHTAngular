import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { VerificationCodeComponent } from './verify-code/verify-code.component';
import { RecoverPassword } from './recover-password/recover-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "auth",
                redirectTo: "auth/login"
            },
            {
                path: 'auth',
                component: AuthComponent,
                children: [
                    {
                        path: 'login',
                        component: LoginComponent,
                    },
                    {
                        path: 'sign-up',
                        component: SignUpComponent
                    },
                    {
                        path: 'recover-password',
                        component: RecoverPassword
                    },
                    {
                        path:'verify-code',
                        component:VerificationCodeComponent
                    },
                    {
                        path:'set-new-password',
                        component:SetNewPasswordComponent
                    }
                ]
            }])
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }