import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../shared/services/localStorage.service';

@Injectable({ providedIn: 'root' })
export class CompanyServiceGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    debugger;
    let indContract = this.localStorageService.indivContractCreatedLocalStorage;

    if (!indContract) return true;
    else return this.router.createUrlTree(['/']);
  }
}
