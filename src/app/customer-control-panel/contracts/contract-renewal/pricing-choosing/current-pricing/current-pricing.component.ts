import { ContractRenewalService } from '../../contract-renewal.service';
import { IndividualContractProcedure } from '../../../../../shared/models/individualContractProcedure.model';
import { Component, Input, OnInit } from "@angular/core";
import { CrmEntityState } from 'src/app/shared/models/individualPricing.model';

@Component({
    selector: 'app-current-pricing',
    templateUrl: './current-pricing.component.html',
    styleUrls: ['./current-pricing.component.css']
})
export class CurrentPricingComponent implements OnInit {
    @Input('individualContractProcedure') individualContractProcedure: IndividualContractProcedure;
    CrmEntityState = CrmEntityState;
    displayResponsive: boolean = false;
    today: string;
    
    constructor(private contractRenewalService: ContractRenewalService) { }
    ngOnInit(): void {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        this.today = mm + '/' + dd + '/' + yyyy;
    }
    pricingDetails(individualContractProcedure: IndividualContractProcedure) {

    }
}