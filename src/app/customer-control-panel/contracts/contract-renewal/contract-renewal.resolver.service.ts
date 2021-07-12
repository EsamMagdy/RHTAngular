import { StepData } from './../../../shared/models/StepDataVm.model';
import { ContractRenewalService } from './contract-renewal.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({providedIn:'root'})
export class ContractRenewalResolverService implements Resolve<StepData>{
    constructor(private contractRenewalService:ContractRenewalService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let stepId = route.queryParams['stepId'];
        if (stepId)
            return this.contractRenewalService.getStepDetails(stepId);
        else
            return null;
        //  this.individualContractService.getInivByStep('' + stepId);

    }

}