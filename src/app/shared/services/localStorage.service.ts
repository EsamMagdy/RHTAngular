import { User } from 'src/app/shared/models/user.model';
import { LoginData } from './../models/loginData.model';
import { IndividualContractReq } from './../models/individualContractReq.model';
import { LocalStorageKeys } from './../models/localStorage.model';
import { Injectable } from "@angular/core";
import { UserData } from '../models/userData.model';
import { RegisterData } from '../models/registerData.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    get indivContractReqLocalStorage() {
        return JSON.parse(localStorage.getItem(LocalStorageKeys.indvContractReq));
    }
    set indivContractReqLocalStorage(indivContractReq: IndividualContractReq) {
        localStorage.setItem(LocalStorageKeys.indvContractReq, JSON.stringify(indivContractReq));
    }
    get languageLocalStorage() {
        return localStorage.getItem(LocalStorageKeys.language);
    }
    get userLocalStorage() {
        return JSON.parse(localStorage.getItem(LocalStorageKeys.userData));
    }
    get registrationDataLocalStorage() {
        return JSON.parse(localStorage.getItem(LocalStorageKeys.registerData));
    }
    set registrationDataLocalStorage(user: User) {
        localStorage.setItem(LocalStorageKeys.registerData, JSON.stringify(user));
    }
    get loginDataLocalStorage() {
        return JSON.parse(localStorage.getItem(LocalStorageKeys.loginData));
    }
    set loginDataLocalStorage(user: User) {
        localStorage.setItem(LocalStorageKeys.loginData, JSON.stringify(user));
    }
    get stepIdLocalStorage() {
        return localStorage.getItem(LocalStorageKeys.stepId);
    }
    set stepIdLocalStorage(stepId: string) {
        localStorage.setItem(LocalStorageKeys.stepId, stepId);
    }
    get resetPasswordLocalStorage() {
        return localStorage.getItem(LocalStorageKeys.resetPassword);
    }
    set resetPasswordLocalStorage(phoneNumber: string) {
        localStorage.setItem(LocalStorageKeys.resetPassword, phoneNumber);
    }
}