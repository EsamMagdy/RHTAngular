import { Component, OnInit } from '@angular/core';
import { paymentMethodMobileList } from 'src/app/company-services/payment-landing-page/payment-landing-page.model';
import { PaymentService } from 'src/app/company-services/payment-landing-page/payment-landing-page.service';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.css']
})
export class PaymentCardComponent implements OnInit {
  paymentMethods: paymentMethodMobileList[];

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.getPaymentCardsAndMethodData().subscribe((resData) => {
      debugger;
      this.paymentMethods = resData.paymentMethodMobileList;
    });
  }

}
