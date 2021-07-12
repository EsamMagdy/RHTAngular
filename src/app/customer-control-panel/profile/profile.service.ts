import { District } from 'src/app/shared/models/district.model';
import { ResponseDataCRM } from './../../shared/models/responseDataCRM.model';
import { BaseQuickLookup } from './../../shared/models/baseQuickLookup.model';
import { Contact } from './../dashboard/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ResponseDataCRMWithObjectData } from 'src/app/shared/models/responseDataCRM.model';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    userId: string;
    constructor(private http: HttpClient,
        private localStorageService: LocalStorageService) {
        this.userId = this.localStorageService.userLocalStorage.crmUserId;
    }

    getDetails() {
        return this.http
            .get<ResponseDataCRMWithObjectData<Contact>>(
                environment.apiUrl + `Contact/GetDetails/${this.userId}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getCities() {

        return this.http
            .get<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl + `City/QuickAll`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getNationalities() {

        return this.http
            .get<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl + `Nationality/QuickAll`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getGender() {
        return this.http
            .get<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl + `Contact/Genders`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getAllRegions(cityId:string) {
        return this.http
            .get<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl + `Profile/GetAllRegions`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    updateProfile(contact: Contact) {
        return this.http
            .post<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl + `contact/UpdateProfile_M`,
                contact
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
}