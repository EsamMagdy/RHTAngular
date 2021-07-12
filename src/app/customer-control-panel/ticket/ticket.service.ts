import { BaseQuickLookup } from './../../shared/models/baseQuickLookup.model';
import { LocalStorageService } from './../../shared/services/localStorage.service';
import { CustomerTicket, RecordSource } from './../dashboard/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ResponseDataCRM, ResponseDataCRMWithObjectData, ResponseDataCRMWithPaging } from 'src/app/shared/models/responseDataCRM.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TicketService {
    userId: string;
    constructor(private http: HttpClient,
        private localStorageService: LocalStorageService) {
        this.userId = this.localStorageService.userLocalStorage.crmUserId;
    }

    getAllTickets(pageNumber: number = 1, pageSize: number = 10) {
        return this.http
            .get<ResponseDataCRM<CustomerTicket>>(
                environment.apiUrl +
                `CustomerTicket/GetTickets_M?userId=${this.userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
            );
    }
    getSectorType() {
        return this.http
            .get<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl +
                `CustomerTicket/Options/SectorList`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getActiveContracts() {
        return this.http
            .get<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl +
                `CustomerTicket/ActiveContracts?userId=${this.userId}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getTicketTypeGroup() {
        return this.http
            .get<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl +
                `CustomerTicket/TicketTypeGroup`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getTicketTypeItems(sectorType: string,ticketGroupId: string) {
        return this.http
            .get<ResponseDataCRM<BaseQuickLookup>>(
                environment.apiUrl +
                `CustomerTicket/TicketTypeItems?ticketGroupId=${ticketGroupId}&sectorType=${sectorType}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    createCustomerTicket(ticket: CustomerTicket) {
        ticket.source = RecordSource.Web;
        ticket.contactId = this.userId;

        return this.http
            .post<ResponseDataCRMWithObjectData<CustomerTicket>>(
                environment.apiUrl +
                `CustomerTicket/Create_M`,
                ticket
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }

}