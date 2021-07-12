import { UserData } from './../../shared/models/userData.model';
import { Contact, Lead, SectorsTypeEnum } from './../dashboard/dashboard.model';
import { LocalStorageService } from './../../shared/services/localStorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ResponseDataCRM, ResponseDataCRMWithObjectData, ResponseDataCRMWithPaging } from 'src/app/shared/models/responseDataCRM.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BaseQuickLookup } from 'src/app/shared/models/baseQuickLookup.model';

@Injectable({ providedIn: 'root' })
export class OtherOrdersService {
    userId: string;
    user: UserData;
    constructor(private http: HttpClient,
        private localStorageService: LocalStorageService) {
        this.user = this.localStorageService.userLocalStorage;
        this.userId = this.user.crmUserId;
    }

    getAllLeads(pageNumber: number, pageSize: number) {
        return this.http
            .get<ResponseDataCRMWithPaging<Lead>>(
                environment.apiUrl +
                `Lead/Get?id=${this.userId}&Page=${pageNumber}&pageSize=${pageSize}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getLeadById(id: string) {
        return this.http
            .get<ResponseDataCRMWithObjectData<Lead>>(
                environment.apiUrl +
                `Lead/Get/${id}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getCitiesQuickAllHour() {
        return this.http
            .get<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl + `city/QuickAllHour`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getNationalityIndvSector() {
        return this.http
            .get<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl + `Lead/GetNationalityIndvSector`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getProfessionsForBusinessSector() {
        return this.http
            .get<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl + `Lead/GetProfessionsForBusinessSector`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    createOtherOrders(lead: Lead) {
        lead.sector = SectorsTypeEnum.Individuals;
        lead.contactId = this.userId;

        return this.http
            .post<ResponseDataCRMWithObjectData<Lead>>(
                environment.apiUrl + `Lead/Create`,
                lead
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getContactByPhone(mobile: string) {
        return this.http
            .get<ResponseDataCRMWithObjectData<Contact>>(
                environment.apiUrl + `Lead/GetProfessionsForBusinessSector`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
}