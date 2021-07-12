import { IndividualPricing } from './../../../../shared/models/individualPricing.model';
import { ContractRenewalService } from './../contract-renewal.service';
import { Component, OnInit } from "@angular/core";
import { IndividualContractProcedure } from 'src/app/shared/models/individualContractProcedure.model';
import { Router } from '@angular/router';
import { ContractStepsEnum, StepTypeEnum } from 'src/app/shared/models/individualContractReq.model';

@Component({
    selector: 'app-pricing-details',
    styleUrls: ['./pricing-details.component.css'],
    templateUrl: './pricing-details.component.html'
})
export class ContractRenewalPricingDetailsComponent implements OnInit {
    indivContractProcedure: IndividualContractProcedure;
    endContractDate: string;
    constructor(private contractRenewalService: ContractRenewalService,
        private router: Router) { }

    ngOnInit(): void {
        this.indivContractProcedure = this.contractRenewalService.individualContractProcedure;
        this.contractRenewalService
            .getNewPricingDetails(this.indivContractProcedure)
            .subscribe(data => {
                // this.pricing = data;
                this.contractRenewalService.individualContractProcedure.pricing = data;
                this.contractRenewalService.individualContractProcedure.renewalAmount = data.renewalAmount;
                let date = this.contractRenewalService.individualContractProcedure.newContractStartDate.toString();
                var parts = date.split('/');
                let newDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                let endContDate = new Date(newDate
                    .setMonth(newDate.getMonth() + data.contractMonths));

                this.endContractDate = this.formattedDate(endContDate);


                // this.endContractDate = new Date(newDate
                //     .setMonth(newDate.getMonth() + data.contractMonths))
                //     .toLocaleDateString('ar-EG',
                //         {
                //             weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
                //         });
            });

    }
    formattedDate(d: Date) {
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return `${day}/${month}/${year}`;
    }
    paymentPage() {
        this.contractRenewalService.updateStepData(ContractStepsEnum.SecondStep, StepTypeEnum.Next);
        
        this.router.navigate(['/dashboard/contract-renewal/' + this.contractRenewalService.contractId + '/payment'], {
            queryParams: {
                stepId: this.contractRenewalService.individualContractProcedure.stepId
            },
        });
    }
}