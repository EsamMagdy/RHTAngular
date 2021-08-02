import { Component, OnInit } from '@angular/core';
import { paymentMethodMobileList } from '../company-services/payment-landing-page/payment-landing-page.model';
import { PaymentService } from '../company-services/payment-landing-page/payment-landing-page.service';
import { IndividualContractReq } from '../shared/models/individualContractReq.model';
import { FooterLoaderService } from '../shared/services/footerLoaderAfterView.service';
import { LocalStorageService } from '../shared/services/localStorage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentMethods: paymentMethodMobileList[];
  responseCheckOutIdData: { value: boolean; data: string; };
  checkoutId: string;
  requestCheckoutStatus: any;
  indContReq: IndividualContractReq;
  deservedAmount: number;
  paymentMethod: string;

  constructor(private paymentService: PaymentService,
    private localStorageService: LocalStorageService,
    private footerLoaderService: FooterLoaderService) { }

  ngOnInit(): void {
    this.footerLoaderService.footer.emit();
    let indContReq = this.localStorageService.indivContractCreatedLocalStorage;

    this.indContReq = this.localStorageService.indivContractCreatedLocalStorage;

    this.deservedAmount =
      Math.round(this.indContReq?.finalPrice ?? 0) +
      Math.round(this.indContReq?.deliveryCost ?? 0);

    this.paymentService.getPaymentCardsAndMethodData().subscribe((resData) => {
      debugger;
      this.paymentMethods = resData.paymentMethodMobileList;
    });

    this.paymentService
      .getCheckoutId(
        'VISA',
        indContReq.individualContractRequestId,
        3,
        true
      )
      .subscribe((resData) => {
        this.responseCheckOutIdData = resData.data;
        if (resData.data.value) {
          this.checkoutId = resData.data.data;
          // this.loadHyperPayScript();
        }
      });
  }
  loadHyperPayScript() {
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=" + this.checkoutId;
    window.document.body.appendChild(s);
  }
  statusPayment() {
    console.log('success');

  }
  paymentMethodClick(paymentMethod: string) {
    debugger;
    console.log(paymentMethod);

    this.paymentMethod = paymentMethod;
    var element = document.getElementById("stripe-script");
    if (element)
      element.parentNode.removeChild(element);
    this.loadHyperPayScript();
  }

}
