import { IndividualContractProcedure } from './../../../../shared/models/individualContractProcedure.model';
import { ContractRenewalService } from './../contract-renewal.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-contract-renewal-payment',
    styleUrls: ['./contract-renewal-payment.component.css'],
    templateUrl: './contract-renewal-payment.component.html'
})
export class ContractPaymentRenwalComponent implements OnInit {
    indivContractProcedure: IndividualContractProcedure;
    constructor(private contractRenewalService: ContractRenewalService) { }
    ngOnInit(): void {
        this.contractRenewalService.renewContract().subscribe(data => {
            this.indivContractProcedure = data;
        });
    }
}