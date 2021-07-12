import { LocalStorageService } from './../../shared/services/localStorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { ObjectWithPaging, ResponseDataCRM, ResponseDataCRMWithObjectData, ResponseDataCRMWithPaging } from 'src/app/shared/models/responseDataCRM.model';
import { environment } from 'src/environments/environment';
import { CustomerTicket, Dashboard, Lead } from './dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    userId: string;
    constructor(private http: HttpClient,
        private localStorageService: LocalStorageService) {
        this.userId = this.localStorageService.userLocalStorage.crmUserId;
    }

    getDashborad() {
        return this.http
            .get<ResponseDataCRMWithObjectData<Dashboard>>(
                environment.apiUrl + `Profile/GetDashBoard?CrmUserId=${this.userId}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getLastLead(pageSize: number = 10, page: number = 1) {
        return this.http
            .get<ResponseDataCRMWithPaging<Lead>>(
                environment.apiUrl +
                `Lead/Get?id=${this.userId}&pageSize=${pageSize}&Page=${page}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getLastTicket(pageSize:number= 10,pageNumber:number= 1) {
        return this.http
            .get<ResponseDataCRM<CustomerTicket>>(
                environment.apiUrl +
                `CustomerTicket/GetTickets_M?userId=${this.userId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
}