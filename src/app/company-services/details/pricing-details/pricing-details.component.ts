import {
  HowToRecieveWorker,
  IndividualContractReq,
} from './../../../shared/models/individualContractReq.model';
import { Component, OnInit } from '@angular/core';
import { IndividualPricing } from 'src/app/shared/models/individualPricing.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Component({
  selector: 'app-pricing-details',
  templateUrl: './pricing-details.component.html',
  styleUrls: ['./pricing-details.component.css'],
})
export class PricingDetailsComponent implements OnInit {
  HowToRecieveWorker = HowToRecieveWorker;
  pricing: IndividualPricing;
  indivContractReq: IndividualContractReq;
  requestDate: string;
  totalWithDeliveryCosts: number;

  constructor(
    private individualContractService: IndividualContractService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.indivContractReq =
      this.localStorageService.indivContractReqLocalStorage;

    this.pricing = this.indivContractReq.pricing;
    
    this.totalWithDeliveryCosts =
      this.indivContractReq.deliveryCost + this.pricing.contractAmount;
  }
}
