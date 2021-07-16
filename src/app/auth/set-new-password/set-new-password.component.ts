import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseDataCRMWithObjectData } from 'src/app/shared/models/responseDataCRM.model';
import { ReGenrateCode } from 'src/app/shared/models/reGenrateCode.model';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css'],
})
export class SetNewPasswordComponent {
  @ViewChild('passResetForm') passResetForm: NgForm;
  submitted = false;
  errorCode = '';
  resendCodeButton = true;
  counter = 10;
  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  setNewPassword() {
    this.submitted = true;
    if (!this.passResetForm.valid) return;

    let vm = { ...this.passResetForm.value };
    this.authService.resetPassword(vm).subscribe((resData) => {
      this.errorCode = '';
      if (resData.state && resData.data) this.router.navigate(['/auth/login']);

      if (!resData.state && resData.message)
        this.errorCode =
          resData.message[0].code == 100 ? resData.message[0].value : '';
    });
  }
  resendCode() {
    let phoneNumber = this.localStorageService.phoneNumberLocalStorage;

    let authServiceObs: Observable<
      ResponseDataCRMWithObjectData<ReGenrateCode>
    >;
    authServiceObs = this.authService.resendCode(phoneNumber);

    authServiceObs.subscribe((resData) => {
      //   if (!resData.state && resData.message) {
      //     this.error = resData.message[0].value;
      //     return;
      //   }
      this.resendCodeButton = false;
      this.counter = 10;
      setInterval(() => {
        this.counter--;
        if (this.counter == 0) {
          this.resendCodeButton = true;
          return;
        }
      }, 1000);
      //   setTimeout(() => {
      //     this.resendCodeButton = false;
      //   }, 10000);
    });
  }
}
