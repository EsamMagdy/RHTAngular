import { CheckConnectionService } from './checkConnection.service';
import { Languages } from './../models/languages.model';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HandleErrorService {
    lang: string;
    constructor(private checkConnectionService:CheckConnectionService) { }
    handleError(errorRes: HttpErrorResponse) {
        this.lang = localStorage.getItem('lang');
        let errorMessage =
            this.lang == Languages.arabic ?
                'خطأ فى الاتصال بالانترنت' :
                'An  error on connecting with internet';
        let name = '0';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError({ message: errorMessage, name: name });
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
    handleErrorProjectWithMessage(message: { value: string, code: number }[]) {
        this.lang = localStorage.getItem('lang');
        let errorMessage = '';
        let error = new Error();
        let errors: Error[] = [];
        message.forEach((resError) => {
            switch (resError.code) {
                case 101:
                    error.name = '' + 101;
                    error.message = resError.value;
                    // error.message = this.lang == Languages.arabic
                    //     ? ' وسيتم التحويل تلقائيا بعد 5 ثوانى الى صفحة تاكيد الحساب'
                    //     : ' and this page will transfered after 5 seconds to confirm page';
                    errors.push(error);
                    break;
                case 105:
                    error.name = '' + 105;
                    error.message = resError.value;
                    // error.message = this.lang == Languages.arabic
                    //     ? 'خطأ فى الاسم او الرقم السرى'
                    //     : 'Invalid Username or Password';
                    errors.push(error);
                    break;
                case 107:
                    error.name = '' + 107;
                    error.message = resError.value;
                    errors.push(error);
                    break;
                case 110:
                    error.name = '' + 110;
                    error.message = resError.value;
                    // error.message = this.lang == Languages.arabic
                    //     ? 'خطأ فى الاسم او الرقم السرى'
                    //     : 'Invalid Username or Password';
                    errors.push(error);
                    break;
                case 220:
                    error.name = '' + 220;
                    error.message = resError.value;
                    // error.message = this.lang == Languages.arabic
                    //     ? 'خطأ فى الاسم او الرقم السرى'
                    //     : 'Invalid Username or Password';
                    errors.push(error);
                    break;
                default:
                    errors.push(new Error(resError.value + errorMessage));
                    break;
            }
        });
        throw errors;
    }
}