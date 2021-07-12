import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IndividualContractService } from '../shared/services/individualContractReq.service';

@Injectable({ providedIn: 'root' })
export class CustomerControlPanelService {
    constructor(private http: HttpClient,
        private individualContractService: IndividualContractService) { }

    getDashBoard() {
        // return this.http.get(environment.apiUrl+`Profile/GetDashBoard?CrmUserId=${this.individualContractService.individualContractReq.contactId}`);
    }
}