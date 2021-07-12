import { IndividualContractProcedure } from 'src/app/shared/models/individualContractProcedure.model';
import { Data, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContractRenewalService } from './contract-renewal.service';
import { Component, OnInit } from "@angular/core";
import { CrmEntityState, IndividualPricing } from 'src/app/shared/models/individualPricing.model';
import { CustomerControlPanelService } from '../../customer-control-panel.service';

@Component({
    selector: 'app-contract-renewal',
    templateUrl: './contract-renewal.component.html',
    styleUrls: ['./contract-renewal.component.css']
})
export class ContractRenewalComponent implements OnInit {
    individualContractProcedure: IndividualContractProcedure;
    CrmEntityState = CrmEntityState;
    allPricing: IndividualPricing[];
    oldPricingId: string;
    newContractStartDate: Date;
    constructor(private contractRenewalService: ContractRenewalService,
        private customerControlPanelService: CustomerControlPanelService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            let stepData = data['indivContract'];
            if (stepData) {
              let individualContractProcedure = JSON.parse(stepData.data) as IndividualContractProcedure;
              this.contractRenewalService.individualContractProcedure=individualContractProcedure;
            //   this.contractRenewalService.step.next(indvContReq.currentStep);
      
            }
            else{
              this.contractRenewalService.createStepForContract();
            }
        });
      


    }
   

}
