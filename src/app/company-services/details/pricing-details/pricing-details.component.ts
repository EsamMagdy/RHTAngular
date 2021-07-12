import { HowToRecieveWorker, IndividualContractReq } from './../../../shared/models/individualContractReq.model';
import { Component, OnInit } from '@angular/core';
import { IndividualPricing } from 'src/app/shared/models/individualPricing.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Component({
    selector: 'app-pricing-details',
    templateUrl: './pricing-details.component.html',
    styleUrls: ['./pricing-details.component.css']
})
export class PricingDetailsComponent implements OnInit {
    HowToRecieveWorker = HowToRecieveWorker;
    pricing: IndividualPricing;
    indivContractReq: IndividualContractReq;
    requestDate: string;
    constructor(private individualContractService: IndividualContractService,
        private localStorageService: LocalStorageService) { }

    ngOnInit(): void {
        this.indivContractReq = this.localStorageService.indivContractReqLocalStorage;
        this.pricing = this.indivContractReq.pricing;
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        this.requestDate = dd + '/' + mm + '/' + yyyy;
    }

}
