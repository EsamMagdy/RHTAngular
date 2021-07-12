import { IndividualContractReq } from 'src/app/shared/models/individualContractReq.model';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../shared/services/localStorage.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { ResponseDataCRM, ResponseDataCRMWithObjectData, ResponseDataCRMWithPaging } from 'src/app/shared/models/responseDataCRM.model';
import { IndividualContract } from 'src/app/shared/models/individualContract.model';
@Injectable({ providedIn: 'root' })
export class ContractsService {
    userId: string;
    individualContract: IndividualContract;

    constructor(private http: HttpClient,
        private localStorageService: LocalStorageService) {
        this.userId = this.localStorageService.userLocalStorage.crmUserId;
    }

    getAllContracts(pageNumber: number = 1, pageSize: number = 10) {
        return this.http
            .get<ResponseDataCRMWithPaging<IndividualContract>>(
                environment.apiUrl +
                `IndividualContract/GetAll?UserId=${this.userId}&PageNumber=${pageNumber}&PageSize=${pageSize}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getContractById(contractId: string) {
        return this.http
            .get<ResponseDataCRMWithObjectData<IndividualContract>>(
                environment.apiUrl +
                `IndividualContract/GetContractDetails?id=${contractId}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                }),
                tap(resData => {
                    this.individualContract = resData;
                })
            );
    }
}