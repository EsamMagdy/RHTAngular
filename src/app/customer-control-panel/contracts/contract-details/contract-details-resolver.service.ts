import { ContractsService } from './../contracts.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { IndividualContract } from 'src/app/shared/models/individualContract.model';


@Injectable({ providedIn: 'root' })
export class ContractDetailsResolverService implements Resolve<IndividualContract> {
  constructor(
    private contractsService: ContractsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log('resolver');
      
    const individualContract = this.contractsService.individualContract;

    if (!individualContract) {
      return this.contractsService.getContractById(''+route.params['id']);
    } else {
      return individualContract;
    }
  }
}
