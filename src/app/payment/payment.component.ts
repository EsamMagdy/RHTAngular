import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { paymentMethodMobileList } from '../company-services/payment-landing-page/payment-landing-page.model';
import { IndividualContractReq } from '../shared/models/individualContractReq.model';
import { LocalStorageKeys } from '../shared/models/localStorage.model';
import { FooterLoaderService } from '../shared/services/footerLoaderAfterView.service';
import { LocalStorageService } from '../shared/services/localStorage.service';
import { PaymentService } from './payment.service';

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
  contractCancelErrorMessage: string = null;

  constructor(private paymentService: PaymentService,
    private localStorageService: LocalStorageService,
    private footerLoaderService: FooterLoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService:TranslateService) { }

  ngOnInit(): void {
    this.footerLoaderService.footer.emit();
    let lang = localStorage.getItem(LocalStorageKeys.language);
    this.translateService.use(lang);

    this.indContReq = this.localStorageService.indivContractCreatedLocalStorage;

    this.deservedAmount =
      Math.round(this.indContReq?.finalPrice ?? 0) +
      Math.round(this.indContReq?.deliveryCost ?? 0);

    this.paymentService.getPaymentCardsAndMethodData().subscribe((resData) => {
      debugger;
      this.paymentMethods = resData.paymentMethodMobileList;
    });


  }
  paymentMethodClick(paymentMethod: string) {
    debugger;
    if (this.paymentMethod == paymentMethod) return;
    this.paymentMethod = paymentMethod;
    this.paymentService.cardBrand = paymentMethod;
    this.contractCancelErrorMessage = null;


    this.paymentService
      .getCheckoutId(
        paymentMethod,
        this.indContReq.individualContractRequestId, // for test '69336321-f4b0-4de6-819e-aa112e560251'
        3,
        true
      )
      .subscribe((resData) => {

        if (!resData.data.value) {
          this.contractCancelErrorMessage = resData.data.data;
          return;
        }

        this.checkoutId = resData.data.data;
        var element = document.getElementById("stripe-script");
        var hyperPayForm = document.getElementsByClassName('wpwl-container') as HTMLCollection;
        if (element)
          document.querySelector('script[src^="https://test.oppwa.com"]').remove();

        if (hyperPayForm && hyperPayForm.length)
          document.querySelector('.wpwl-container').remove();

        this.loadHyperPayScript();
        this.loadHyperForm();

      });


  }

  loadHyperPayScript() {
    var hyperPayScript = window.document.createElement("script");
    hyperPayScript.id = "stripe-script";
    hyperPayScript.type = "text/javascript";
    hyperPayScript.src = "https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=" + this.checkoutId;
    window.document.body.appendChild(hyperPayScript);
  }
  loadHyperForm() {
    debugger;
    const parsedUrl = new URL(window.location.href);
    const baseUrl = parsedUrl.origin;

    var f = document.createElement("form");
    f.setAttribute('id', 'hyperPayForm');
    f.setAttribute('class', "paymentWidgets payform");
    f.setAttribute('action', baseUrl + "/#/payment/payment-status");
    f.setAttribute('data-brands', this.paymentMethod);
    document.getElementById('paymentCard').appendChild(f);
  }

}
