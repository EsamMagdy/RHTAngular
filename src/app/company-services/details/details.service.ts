import { LocalStorageService } from './../../shared/services/localStorage.service';
import { ResponseDataCRMWithDeleting } from './../../shared/models/responseDataCRM.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DetailsService {
    constructor(private http: HttpClient,
                private localStorageService:LocalStorageService) { }

    isUserDataCompleted() {
        let userId=this.localStorageService.userLocalStorage.crmUserId;
        return this.http
            .get<ResponseDataCRMWithDeleting>(
                environment.apiUrl + `contact/IsProfileCompleted_M/${userId}`,

            );
    }
}