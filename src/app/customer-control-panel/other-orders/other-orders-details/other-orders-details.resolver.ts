import { Lead } from './../../dashboard/dashboard.model';
import { OtherOrdersService } from './../other-orders.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';


@Injectable({ providedIn: 'root' })
export class OtherOrdersDetailsResolverService implements Resolve<Lead> {
  constructor(
    private otherOrdersService: OtherOrdersService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
      return this.otherOrdersService.getLeadById(''+route.params['id']);
    
  }
}
