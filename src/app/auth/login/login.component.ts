import { LoginResData } from './../../shared/models/loginData.model';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  error: string = null;
  submitted = false;
  returnUrl: string;
  success: boolean;
  static TimeOutErrorMessage = 'Auth.TimeOutErrorMessage';
  @ViewChild('logInForm') logInForm: NgForm;
  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private individualContractService: IndividualContractService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }
  Login() {
    this.submitted = true;
    if (!this.logInForm.valid) return;
    this.success = false;
    this.authService
      .login(this.logInForm.value.email, this.logInForm.value.password)
      .subscribe(
        (resData) => {
          debugger;
          if (!resData.state && resData.message && resData.message[0].code == 101) {
            this.router.navigate(['/auth/verify-code']);
            return;

          }

          if (!resData.state && resData.message) {
            this.error = resData.message[0].value;
            return;
          }

          this.error = '';
          let phoneConfirmed = resData.data.user.phoneNumberConfirmed;
          let code = resData.data.code;

          if ((phoneConfirmed || !phoneConfirmed) && code)
            this.router.navigate(['/auth/verify-code']);

          // if (phoneConfirmed && !code && this.returnUrl) {
          //   this.router.navigate(['/services/' + this.returnUrl], { queryParams: { stepId: this.individualContractService.individualContractReq.stepId } });
          //   this.authService.user.setTokenData(resData.data.token);
          //   this.authService.handleAuth(resData.data.user);
          // }
          // if (phoneConfirmed && !code && !this.returnUrl) {
          //   this.authService.user.setTokenData(resData.data.token);
          //   this.authService.handleAuth(resData.data.user);
          //   this.router.navigate(['/']);
          // }

          if (phoneConfirmed && !code)
            this.LoginWithCheckReturnURL(resData.data);

        });
  }

  private LoginWithCheckReturnURL(data: LoginResData) {
    this.authService.user.setTokenData(data.token);
    this.authService.handleAuth(data.user);

    if (this.returnUrl)
      this.router
        .navigate(
          ['/services/' + this.returnUrl],
          {
            queryParams: {
              stepId: this.individualContractService.individualContractReq.stepId
            }
          });
    else
      this.router.navigate(['/']);
  }

}
