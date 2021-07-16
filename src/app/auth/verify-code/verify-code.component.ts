import { LocalStorageService } from 'src/app/shared/services/localStorage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';
import { ResponseDataCRMWithObjectData } from 'src/app/shared/models/responseDataCRM.model';
import { ReGenrateCode } from 'src/app/shared/models/reGenrateCode.model';
import { VerificationCode } from 'src/app/shared/models/verificationCode.model';

@Component({
  selector: 'app-verification-Code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css'],
})
export class VerificationCodeComponent implements OnInit {
  @ViewChild('verificationForm') vForm: NgForm;
  isLastNumber: boolean = true;
  success = false;
  resendCodeSuccess = false;
  error: string = null;
  user: User;
  submitted = false;
  resendCodeButton = true;
  counter = 10;

  ngOnInit(): void {}

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.user =
      this.localStorageService.registrationDataLocalStorage ??
      this.localStorageService.loginDataLocalStorage;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.vForm.valid) return;

    this.success = false;
    let code = this.vForm.value.code;

    let verifyCodeObs: Observable<
      ResponseDataCRMWithObjectData<VerificationCode>
    >;

    if (this.user.phoneNumberConfirmed)
      // this.verifySignInCode(code);
      verifyCodeObs = this.authService.verifySignInCode(code);
    // this.verifyCode(code);
    else verifyCodeObs = this.authService.verifyCode(code);

    verifyCodeObs.subscribe((resData) => {
      if (!resData.state && resData.message) {
        this.error = resData.message[0].value;
        return;
      }

      this.vForm.reset();
      this.submitted = false;
      this.router.navigate(['/']);
    });
  }

  verifyCode(code: string) {
    this.authService.verifyCode(code).subscribe((resData) => {
      if (!resData.state && resData.message) {
        this.error = resData.message[0].value;
        return;
      }

      this.router.navigate(['/']);
    });
  }

  verifySignInCode(code: string) {
    this.authService.verifySignInCode(code).subscribe((resData) => {
      if (!resData.state && resData.message) {
        this.error = resData.message[0].value;
        return;
      }

      this.router.navigate(['/']);
    });
  }

  resendCode() {
    let authServiceObs: Observable<
      ResponseDataCRMWithObjectData<ReGenrateCode>
    >;
    this.resendCodeSuccess = false;
    this.error = null;
    if (this.user.phoneNumberConfirmed)
      authServiceObs = this.authService.resendSignInCode(this.user.phoneNumber);
    else authServiceObs = this.authService.resendCode(this.user.phoneNumber);

    authServiceObs.subscribe((resData) => {
      if (!resData.state && resData.message) {
        this.error = resData.message[0].value;
        return;
      }

      this.resendCodeButton = false;
      this.counter = 10;
      setInterval(() => {
        this.counter--;
        if (this.counter == 0) {
          this.resendCodeButton = true;
          return;
        }
      }, 1000);
      //   this.resendCodeButton = true;
      //   setTimeout(() => {
      //     this.resendCodeButton = false;
      //   }, 10000);
    });
  }
}
