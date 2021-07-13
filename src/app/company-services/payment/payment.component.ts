import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import {
  ContractStepsEnum,
  IndividualContractReq,
  StepTypeEnum,
} from 'src/app/shared/models/individualContractReq.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { PaymentMethod, paymentMethodMobileList } from './payment.model';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  indContReq: IndividualContractReq;
  deservedAmount: number;
  paymentMethods: paymentMethodMobileList[];
  checkoutId: string;

  constructor(
    private individualContractService: IndividualContractService,
    private router: Router,
    private paymentService: PaymentService,
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit(): void {
    console.log(this.individualContractService.indContReqCreated);

    this.indContReq = this.individualContractService.indContReqCreated;
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
        'D5099303-81A0-4E0F-A9F1-875E559D6098',
        // this.indContReq.individualContractRequestId,
        3,
        true
      )
      .subscribe((resData) => {
        debugger;
        this.checkoutId = resData.data.data;
        this.loadHyperPayScript();
      });
  }
  attachmentPage() {
    this.individualContractService.updateStepData(
      ContractStepsEnum.SeventhStep,
      StepTypeEnum.Previous
    );
    this.individualContractService.step.next(ContractStepsEnum.SeventhStep);
    this.router.navigate(['/services/attachments']);
  }
  loadHyperPayScript(){
    debugger;
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://test.oppwa.com/v1/paymentWidgets.js?checkoutId="+this.checkoutId;
    window.document.body.appendChild(s);
  }
  statusPayment(){
    console.log('success');
    
  }
}
