import { IndividualContractReq } from './../../../shared/models/individualContractReq.model';
import { IndOrdersService } from './../ind-orders.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { IndividualContract } from 'src/app/shared/models/individualContract.model';


@Injectable({ providedIn: 'root' })
export class IndOrdersDetailsResolverService implements Resolve<IndividualContractReq> {
  constructor(
    private indOrdersService: IndOrdersService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
      return this.indOrdersService.getIndContractReqById(''+route.params['id']);
    
  }
}
