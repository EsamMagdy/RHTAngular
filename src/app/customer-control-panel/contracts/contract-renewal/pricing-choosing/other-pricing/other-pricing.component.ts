import { ContractStepsEnum, StepTypeEnum } from './../../../../../shared/models/individualContractReq.model';
import { ContractRenewalService } from '../../contract-renewal.service';
import { Component, Input, OnInit } from "@angular/core";
import { IndividualPricing } from "src/app/shared/models/individualPricing.model";

@Component({
    selector: 'app-other-pricing',
    templateUrl: './other-pricing.component.html',
    styleUrls: ['./other-pricing.component.css']
})
export class OtherPricingComponent implements OnInit {
    @Input('allPricing') allPricing: IndividualPricing[];
    @Input('oldPricingId') oldPricingId: string;
    @Input('newContractStartDate') newContractStartDate: Date;
    pricingDetails: IndividualPricing;
    displayResponsive = false;
    today: string;
    constructor(private contractRenewalService: ContractRenewalService) {

    }
    ngOnInit(): void {
        this.allPricing?.forEach(s => s.isSelected = false);


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        this.today = mm + '/' + dd + '/' + yyyy;
    }
    getDetails(pricing: IndividualPricing) {
        this.pricingDetails = pricing;
        this.displayResponsive = true;
    }
    selectPricing(pricing: IndividualPricing) {
        this.allPricing.forEach(s => s.isSelected = false);
        pricing.isSelected = true;
        this.contractRenewalService.individualContractProcedure.pricingId = pricing.id;
        this.contractRenewalService.individualContractProcedure.renewDiscount = pricing.renewDiscount??0;
        // this.contractRenewalService.updateStepData(ContractStepsEnum.SecondStep, StepTypeEnum.Next);
    }
    // getDetails(id:string) {
    //     this.contractRenewalService
    //         .getPricingDetailsById(id, this.newContractStartDate)
    //         .subscribe(data=>{
    //             console.log(data);

    //         });
    // }
}