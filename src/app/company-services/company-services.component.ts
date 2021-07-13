import { LocalStorageService } from './../shared/services/localStorage.service';
import { LocalStorageKeys } from './../shared/models/localStorage.model';
import { IndvReqContact } from './../shared/models/individualContractReqContact.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { IndividualContractReq } from './../shared/models/individualContractReq.model';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { FooterLoaderService } from '../shared/services/footerLoaderAfterView.service';

@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.css']
})
export class CompanyServicesComponent implements OnInit {
  stepId: string;
  individualContractReq: IndividualContractReq;
  constructor(private individualContractService: IndividualContractService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private footerLoaderService: FooterLoaderService) {
    this.footerLoaderService.footer.emit();
  }

  ngOnInit(): void {
    this.setIndivContractReq();
    this.checkIfUserDataCompleted();

    this.route.data.subscribe((data: Data) => {
      let stepData = data['indivContract'];
      if (stepData) {
        let indvContReq = JSON.parse(stepData.data) as IndividualContractReq;
        this.localStorageService.indivContractReqLocalStorage = indvContReq;
        this.individualContractService.individualContractReq = indvContReq;
        this.individualContractService.step.next(indvContReq.currentStep);

      }
      else {
        this.individualContractService.createStep();
      }

    });

  }

  setIndivContractReq() {
    this.individualContractReq = this.localStorageService.indivContractReqLocalStorage;
    // let indvContractReq = JSON.parse(localStorage.getItem(LocalStorageKeys.indvContractReq)) as IndividualContractReq;
    let indvContractReq = this.localStorageService.indivContractReqLocalStorage;
    this.individualContractService.individualContractReq = indvContractReq ?? new IndividualContractReq();
  }

  checkIfUserDataCompleted() {
    let userId = this.localStorageService?.userLocalStorage?.crmUserId;

    if (!userId) return;


    this.individualContractService
      .isUserDataCompleted(userId)
      .subscribe(resData => {
        if (resData.data.value)
          this.individualContractService.userDataCompleted.next(true);
        else
          this.individualContractService.userDataCompleted.next(false);
      });
  }

}
