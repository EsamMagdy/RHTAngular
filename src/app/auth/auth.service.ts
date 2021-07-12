import { LocalStorageService } from './../shared/services/localStorage.service';
import { LocalStorage, LocalStorageKeys } from './../shared/models/localStorage.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResData } from '../shared/models/loginData.model';
import { RegisterData } from '../shared/models/registerData.model';
import { ResponseDataCRMWithObjectData, ResponseDataCRMWithObjectDataForLogin } from '../shared/models/responseDataCRM.model';
import { RegisterationData, User } from '../shared/models/user.model';
import { VerificationCode } from '../shared/models/verificationCode.model';
import { VerificationSignInCode } from '../shared/models/verificationSignInCode.model';
import { HandleErrorService } from '../shared/services/handleError.service';
import { ReGenrateCode } from '../shared/models/reGenrateCode.model';
import { ResetPasswordModel } from '../shared/models/resetPassword.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
    private handleErrorService: HandleErrorService) {
  }
  switchToLogin = new Subject<boolean>();
  isRegister = new Subject<boolean>();
  isVerfied = new Subject<boolean>();
  user: User = new User();
  userSb = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  register(registerData: RegisterData) {
    return this.http
      .post<ResponseDataCRMWithObjectData<RegisterationData>>(
        environment.apiUrl + 'Account/Register',
        registerData
      )
      .pipe(
        // catchError(this.handleErrorService.handleError),
        tap((resData) => {
          if (resData.state && resData.data) {
            this.user.phoneNumber = resData.data.phoneNumber;
            this.user.password = resData.data.password;
            this.user.code = resData.data.code;
            this.user.id = resData.data.userId;
            this.user.rememberMe = resData.data.rememberMe;
            this.user.phoneNumberConfirmed = false;

            this.localStorageService.registrationDataLocalStorage = this.user;
            localStorage.removeItem(LocalStorageKeys.loginData);
          }
        })
      );
  }
  verifyCode(code: string) {
    let user = this.localStorageService.registrationDataLocalStorage
      ?? this.localStorageService.loginDataLocalStorage;
    user.code = code;
    return this.http
      .post<ResponseDataCRMWithObjectData<VerificationCode>>(
        environment.apiUrl + 'Account/VerifyCode',
        user
      )
      .pipe(
        // catchError(this.handleErrorService.handleError),
        tap((resData) => {
          if (resData.state && resData.data) {
            this.user.phoneNumberConfirmed = true;
            this.user.setTokenData(resData.data.code);
            this.handleAuth(resData.data.user);
          }
        })
      );
  }
  verifySignInCode(code: string) {
    let user = this.localStorageService.registrationDataLocalStorage
      ?? this.localStorageService.loginDataLocalStorage;
    user.code = code;
    return this.http
      .post<ResponseDataCRMWithObjectData<VerificationCode>>(
        environment.apiUrl + 'Account/VerifySignInCode',
        user
      )
      .pipe(
        // catchError(this.handleErrorService.handleError),
        tap((resData) => {
          if (resData.state && resData.data) {
            this.user.phoneNumberConfirmed = true;
            this.user.setTokenData(resData.data.accessToken);
            this.handleAuth(resData.data.user);
          }
        })
      );
  }
  resendSignInCode() {
    let user = this.localStorageService.loginDataLocalStorage ??
      this.localStorageService.registrationDataLocalStorage;
    return this.http
      .post<ResponseDataCRMWithObjectData<ReGenrateCode>>(
        environment.apiUrl + 'Account/ReGenrateSignInCode',
        user
      )
      .pipe(
        // catchError(this.handleErrorService.handleError),
      );
  }
  resendCode() {
    let user = this.localStorageService.loginDataLocalStorage ??
      this.localStorageService.registrationDataLocalStorage;
    return this.http
      .post<ResponseDataCRMWithObjectData<ReGenrateCode>>(
        environment.apiUrl + 'Account/ReGenrateCode?IsSMSEnabled=true',
        user
      )
      .pipe(
        // catchError(this.handleErrorService.handleError),
        tap((resData) => {
          if (!resData.state && resData.message) {
            this.handleErrorService.handleErrorProjectWithMessage(resData.message);
          }
        })
      );
  }
  forgotPassword(phoneNumber: string) {
    this.localStorageService.resetPasswordLocalStorage = phoneNumber;
    return this.http
      .post<ResponseDataCRMWithObjectData<ReGenrateCode>>(
        environment.apiUrl + 'Account/ForgotPassword?IsSMSEnabled=true', {
        phoneNumber: phoneNumber

      }
      )
      .pipe(
        // catchError(this.handleErrorService.handleError),

      );
  }
  resetPassword(vm: ResetPasswordModel) {
    debugger;
    return this.http
      .post<ResponseDataCRMWithObjectData<ReGenrateCode>>(
        environment.apiUrl + 'Account/ResetPassword', {
        phoneNumber: this.localStorageService.resetPasswordLocalStorage,
        password: vm.password,
        confirmPassword: vm.confirmPassword,
        code: vm.code

      });
  }
  autoLogin() {
    let userData = this.localStorageService.userLocalStorage;

    if (!userData) return;

    const loaderUser = new User(
      userData.userId,
      userData.crmUserId,
      userData.name,
      userData.userName,
      userData.phoneNumber,
      '',
      userData.email,
      '',
      '',
      userData.address,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );

    if (loaderUser.token) {
      loaderUser.phoneNumberConfirmed = true;
      this.userSb.next(loaderUser);

      if (userData.rememberMe) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();

        this.autoLogout(expirationDuration);

      }
      else
        this.autoLogout(0);
    }
  }
  login(userName: string, password: string, rememberMe: boolean = false) {
    debugger;
    LocalStorage.removeAllLocalStorage()
    return this.http
      .post<ResponseDataCRMWithObjectDataForLogin<LoginResData>>(
        environment.apiUrl + 'Account/login',
        {
          userName: userName,
          password: password,
          rememberMe: rememberMe,
        }
      )
      .pipe(
        // catchError(this.handleErrorService.handleError),
        tap((resData) => {
          // if (!resData.state && resData.message) {
          //     this.handleErrorService.handleErrorProjectWithMessage(resData.message as any);

          // } else {
          debugger;
          if (resData.state && resData.data) {
            let userRes = resData.data.user;
            this.user.phoneNumber = userName;
            this.user.password = password;
            this.user.rememberMe = rememberMe;
            this.user.id = userRes.id;
            this.user.phoneNumberConfirmed = userRes.phoneNumberConfirmed;
            this.localStorageService.loginDataLocalStorage = this.user;
            // this.user.setTokenData(resData.data.token);
            // this.handleAuth(resData.data.user);
            localStorage.removeItem(LocalStorageKeys.registerData);
          }

          // }
        })
      );
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();

    }, 2147483647);//2147483647
  }
  logout() {
    this.userSb.next(null);
    this.router.navigate(['/auth']);
    LocalStorage.removeAllLocalStorage();

    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }
  handleAuth(user: User) {
    this.user.email = user.email;
    this.user.name = user.name;
    this.user.userName = user.userName;
    this.user.id = user.id ?? this.user.id;
    this.user.crmUserId = user.crmUserId;
    this.user.phoneNumber = user.phoneNumber;
    this.user.password = user.password ?? this.user.password;
    this.user.phoneNumberConfirmed = user.phoneNumberConfirmed ?? this.user.phoneNumberConfirmed;
    this.userSb.next(this.user);
    if (this.user.expiresIn)
      this.autoLogout(this.user.expiresIn);
    localStorage.setItem('userData', JSON.stringify(this.user));
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

}
