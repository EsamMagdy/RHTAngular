import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  ResponseDataCRM,
  ResponseDataCRMWithDeleting,
  ResponseDataCRMWithObjectData,
} from 'src/app/shared/models/responseDataCRM.model';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from './payment-landing-page.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  userId: string;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.userId = this.localStorageService.userLocalStorage.crmUserId;
  }

  getPaymentCardsAndMethodData() {
    return this.http
      .post<ResponseDataCRMWithObjectData<PaymentMethod>>(
        environment.apiUrl +
        `InAppPayment/PaymentCardsAndMethodData?CrmUserId=${this.userId}&Mode=true`,
        {}
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }

  getCheckoutId(
    cardBrand: string,
    contractId: string,
    entityType: number,
    isTestPayment: boolean
  ) {
    return this.http
      .post<ResponseDataCRMWithDeleting>(
        environment.apiUrl + `InAppPayment/RequestCheckoutId`,
        {
          cardBrand: cardBrand,
          contractId: contractId,
          entityType: entityType,
          isTestPayment: isTestPayment,
          userId: this.userId,
        }
      )
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }
  requestCheckoutStatus(
    cardBrand: string,
    contractId: string,
    isTestPayment: boolean,
    paymentType: number,
    checkOutId: string,
    mode:boolean
  ) {
    return this.http
      .post<any>(
        environment.apiUrl + `InAppPayment/RequestCheckoutStatus`,
        {
          cardBrand: cardBrand,
          contractId: contractId,
          isTestPayment: isTestPayment,
          userId: this.userId,
          type: paymentType,
          id: checkOutId,
          mode:mode
        }
      )
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }
}
