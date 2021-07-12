import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { CustomerControlPanelService } from 'src/app/customer-control-panel/customer-control-panel.service';
import { IndividualContractProcedure } from 'src/app/shared/models/individualContractProcedure.model';
import { ContractStepsEnum, StepTypeEnum } from 'src/app/shared/models/individualContractReq.model';
import { CrmEntityState, IndividualPricing } from 'src/app/shared/models/individualPricing.model';
import { ContractRenewalService } from '../contract-renewal.service';
@Component({
    selector: 'app-pricing-chossing',
    styleUrls: ['./pricing-choosing.component.css'],
    templateUrl: './pricing-choosing.component.html'
})
export class PricingChoosingComponent implements OnInit {
    individualContractProcedure: IndividualContractProcedure;
    CrmEntityState = CrmEntityState;
    allPricing: IndividualPricing[];
    oldPricingId: string;
    newContractStartDate: Date;
    contractId: string;
    constructor(private contractRenewalService: ContractRenewalService,
        private customerControlPanelService: CustomerControlPanelService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            let stepData = data['indivContract'];
            if (stepData) {
                let individualContractProcedure = JSON.parse(stepData.data) as IndividualContractProcedure;
                this.contractRenewalService.individualContractProcedure = individualContractProcedure;
                //   this.contractRenewalService.step.next(indvContReq.currentStep);

            }
            else {
                this.contractRenewalService.createStepForContract();
            }
        });
        this.route.params.subscribe((params: Params) => {
            this.contractId = params['id'];
            this.contractRenewalService.contractId = params['id'];
            this.contractRenewalService
                .getRenewProcedureObject(this.contractId)
                .subscribe(data => {
                    this.individualContractProcedure = data;
                    this.contractRenewalService.individualContractProcedure = data;
                    this.oldPricingId = data.oldPricingId;
                    this.newContractStartDate = data.newContractStartDate;
                    this.getAllPricing(data.professionId, data.nationalityId, data.pricingId, data.newContractStartDate);
                });

        });


    }
    getAllPricing(professionId: string, nationalityId: string, pricingId: string, startDate: Date) {
        this.contractRenewalService
            .getAllPricing(professionId, nationalityId, pricingId, startDate)
            .subscribe(data => this.allPricing = data);
    }
    pricingDetailsPage() {
        this.contractRenewalService.updateStepData(ContractStepsEnum.SecondStep, StepTypeEnum.Next);
        this.router.navigate(['/dashboard/contract-renewal/' + this.contractId + '/pricing-details/'], {
            queryParams: {
                stepId: this.contractRenewalService.individualContractProcedure.stepId
            },
        });



    }
}