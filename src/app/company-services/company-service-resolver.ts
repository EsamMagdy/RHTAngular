import { StepData } from './../shared/models/StepDataVm.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { IndividualContract } from 'src/app/shared/models/individualContract.model';


@Injectable({ providedIn: 'root' })
export class CompanyServiceResolverService implements Resolve<StepData> {
    constructor(
        private individualContractService: IndividualContractService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let stepId = route.queryParams['stepId'];
        if (stepId)
            return this.individualContractService.getStepDetails(stepId);
        else
            return null;
        //  this.individualContractService.getInivByStep('' + stepId);

    }
}
