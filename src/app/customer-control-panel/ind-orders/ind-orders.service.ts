import { IndividualContractReq } from './../../shared/models/individualContractReq.model';
import { LocalStorageService } from './../../shared/services/localStorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ResponseDataCRMWithDeleting, ResponseDataCRMWithObjectData, ResponseDataCRMWithPaging } from 'src/app/shared/models/responseDataCRM.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IndOrdersService {
    private userId: string;
    constructor(private http: HttpClient,
        private localStorageService: LocalStorageService) {
        this.userId = this.localStorageService.userLocalStorage.crmUserId;
    }

    getAllIndRequests(pageNumber: number, pageSize: number) {
        return this.http
            .get<ResponseDataCRMWithPaging<IndividualContractReq>>(
                environment.apiUrl +
                `IndividualContractRequest/GetAll?UserId=${this.userId}&PageNumber=${pageNumber}&PageSize=${pageSize}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getIndContractReqById(contractId: string) {
        return this.http
            .get<ResponseDataCRMWithObjectData<IndividualContractReq>>(
                environment.apiUrl +
                `IndividualContractRequest/Get/${contractId}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }

    cancelRequest(requestId: string) {
        debugger;
        return this.http
            .get<ResponseDataCRMWithDeleting>(
                environment.apiUrl +
                `IndividualContractRequest/CancelRequest?RequestId=${requestId}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
}