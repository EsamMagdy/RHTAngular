import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import {
  ContractStepsEnum,
  IndividualContractReq,
  StepTypeEnum,
} from 'src/app/shared/models/individualContractReq.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';
import { PaymentService } from './payment-landing-page.service';

@Component({
  selector: 'app-payment-landing-page',
  templateUrl: './payment-landing-page.component.html',
  styleUrls: ['./payment-landing-page.component.css'],
})
export class PaymentLandingPageComponent implements OnInit {
  indContReq: IndividualContractReq;
  deservedAmount: number;

  constructor(
    private individualContractService: IndividualContractService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private paymentService: PaymentService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit(): void {
    this.individualContractService.step.next(ContractStepsEnum.NinthStep);
    console.log(this.individualContractService.indContReqCreated);

    this.indContReq = this.localStorageService.indivContractCreatedLocalStorage;

    this.deservedAmount =
      Math.round(this.indContReq?.finalPrice ?? 0) +
      Math.round(this.indContReq?.deliveryCost ?? 0);


  }
  attachmentPage() {
    this.individualContractService.updateStepData(
      ContractStepsEnum.SeventhStep,
      StepTypeEnum.Previous
    );
    this.individualContractService.step.next(ContractStepsEnum.SeventhStep);
    this.router.navigate(['/services/attachments']);
  }
  loadHyperPayScript() {
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    // s.src = "https://test.oppwa.com/v1/paymentWidgets.js?checkoutId="+this.checkoutId;
    window.document.body.appendChild(s);
  }
  statusPayment() {
    console.log('success');

  }
}
