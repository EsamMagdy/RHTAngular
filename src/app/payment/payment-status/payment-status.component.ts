import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/company-services/payment-landing-page/payment-landing-page.service';
import { IndividualContractReq } from 'src/app/shared/models/individualContractReq.model';
import { FooterLoaderService } from 'src/app/shared/services/footerLoaderAfterView.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  checkOutId: string;
  requestCheckoutStatus: any;
  indContReq: IndividualContractReq;
  deservedAmount: number;

  constructor(private paymentService: PaymentService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private footerLoaderService: FooterLoaderService,) { }

  ngOnInit() {
    this.footerLoaderService.footer.emit();
    this.indContReq = this.localStorageService.indivContractCreatedLocalStorage;

    this.deservedAmount =
      Math.round(this.indContReq?.finalPrice ?? 0) +
      Math.round(this.indContReq?.deliveryCost ?? 0);

    this.route.queryParams.subscribe(data => {
      debugger;
      this.checkOutId = data['id'];
      console.log(this.checkOutId);


      this.paymentService.requestCheckoutStatus("VISA",
        this.localStorageService.indivContractCreatedLocalStorage.individualContractRequestId,
        true,
        3,
        this.checkOutId,
        true
      ).subscribe(resData => {
        this.requestCheckoutStatus = resData;
      });
    });
  }



}
