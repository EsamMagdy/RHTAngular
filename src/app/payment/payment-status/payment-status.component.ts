import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndividualContractReq } from 'src/app/shared/models/individualContractReq.model';
import { FooterLoaderService } from 'src/app/shared/services/footerLoaderAfterView.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  checkOutId: string;
  requestCheckoutStatus: any = null;
  indContReq: IndividualContractReq;
  deservedAmount: number;
  paymentSuccess = false;

  constructor(private paymentService: PaymentService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private footerLoaderService: FooterLoaderService,) { }

  ngOnInit() {
    debugger;
    this.footerLoaderService.footer.emit();
    this.indContReq = this.localStorageService.indivContractCreatedLocalStorage;

    this.deservedAmount =
      Math.round(this.indContReq?.finalPrice ?? 0) +
      Math.round(this.indContReq?.deliveryCost ?? 0);

    this.route.queryParams.subscribe(data => {
      debugger;
      this.checkOutId = data['id'];
      let cardBrand = this.paymentService.cardBrand;

      this.paymentService.requestCheckoutStatus(cardBrand,
        this.localStorageService.indivContractCreatedLocalStorage.individualContractRequestId,
        true,
        3,
        this.checkOutId,
        true
      ).subscribe(resData => {
        this.paymentSuccess = resData.state;
        this.requestCheckoutStatus = resData.data;
      });
    });
  }



}
