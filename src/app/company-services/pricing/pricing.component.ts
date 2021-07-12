import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './../../shared/services/localStorage.service';
import { LocalStorageKeys } from './../../shared/models/localStorage.model';
import {
  ContractStepsEnum,
  StepTypeEnum,
  IndividualContractReq,
} from './../../shared/models/individualContractReq.model';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeePickSource } from 'src/app/shared/models/application/employeePickSource.model';
import { FilterPackageData } from 'src/app/shared/models/application/filterPackageData.model';
import { EmployeePickSourceEnum } from 'src/app/shared/models/employeePickSourceEnum.model';
import { HowToRecieveWorker } from 'src/app/shared/models/individualContractReq.model';
import { IndividualPricing } from 'src/app/shared/models/individualPricing.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { PackageService } from './pricing.service';
declare let $: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.less'],
})
export class PricingComponent implements OnInit, AfterViewInit {
  @ViewChild('errorMessages') errorMessages: ElementRef;
  errorMessage: Message[] = [];
  error: Message[] = [];
  errors: Message[];
  filterData: FilterPackageData;
  pricing: IndividualPricing;
  pricings: IndividualPricing[];
  EmployeePickSource = EmployeePickSourceEnum;
  HowToRecievHowrker: HowToRecieveWorker;
  employeePickSource: EmployeePickSource;
  individualContractReq: IndividualContractReq;
  constructor(
    private individualContractService: IndividualContractService,
    private packageService: PackageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) { }
  ngAfterViewInit(): void {
    // $('#myModal').modal('show');
  }

  ngOnInit(): void {
    this.setPricingData();
    // let stepData = JSON.parse(localStorage.getItem(LocalStorageKeys.stepData));
    // let currentStep = stepData['currentStep'];

    if (
      this.individualContractReq.currentStep >= 0 &&
      this.individualContractReq.currentStep <= 2
    ) {
      this.router.navigate(['services']);
      return;
    }

    this.packageService.filteringData.subscribe((data) => {
      this.filterData = data;
      this.individualContractService.individualContractReq.professionId =
        '' + this.filterData.profession.key;
      this.individualContractService.individualContractReq.professionName =
        this.filterData.profession.value;
      this.individualContractService.individualContractReq.nationalityId =
        this.filterData.nationality.nationalityId;
      this.individualContractService.individualContractReq.nationalityName =
        this.filterData.nationality.nationalityName;
    });

    this.packageService.packageChoosed.subscribe((data) => {
      this.pricing = data;
      this.individualContractService.individualContractReq.pricing =
        this.pricing;
    });
    this.packageService.packages.subscribe((data) => {
      this.pricings = data;
    });
    this.packageService.employeePickSource.subscribe((data) => {
      this.employeePickSource = data;
      this.individualContractService.individualContractReq.employeePickSource =
        this.employeePickSource.employeePickSource;
      this.individualContractService.individualContractReq.howtoReceiveWorker =
        this.employeePickSource.howtoReceiveWorker;
      this.individualContractService.individualContractReq.recieveEmployeeFromHousing =
        this.employeePickSource.recieveEmployeeFromHousing;
    });
  }
  setPricingData() {
    this.individualContractReq =
      this.localStorageService.indivContractReqLocalStorage;

    this.pricing = this.individualContractReq.pricing;
    this.employeePickSource = {
      employeePickSource: this.individualContractReq.employeePickSource,
      howtoReceiveWorker: this.individualContractReq.howtoReceiveWorker,
      recieveEmployeeFromHousing:
        this.individualContractReq.recieveEmployeeFromHousing,
    };

    // this.individualContractService.individualContractReq.professionId =
    //   this.individualContractReq.professionId;
    // this.individualContractService.individualContractReq.professionName = this.individualContractReq.professionName;
    // this.individualContractService.individualContractReq.nationalityId = this.individualContractReq.nationalityId;
    // this.individualContractService.individualContractReq.nationalityName = this.individualContractReq.nationalityName;
    // this.individualContractService.individualContractReq.pricing = this.individualContractReq.pricing;
    // this.individualContractService.individualContractReq.employeePickSource = this.individualContractReq.employeePickSource;
    // this.individualContractService.individualContractReq.howtoReceiveWorker = this.individualContractReq.howtoReceiveWorker;
    // this.individualContractService.individualContractReq.recieveEmployeeFromHousing = this.individualContractReq.recieveEmployeeFromHousing;
  }
  locationPage() {
    this.individualContractService.updateStepData(
      ContractStepsEnum.SecondStep,
      StepTypeEnum.Previous
    );
    this.individualContractService.step.next(ContractStepsEnum.SecondStep);
    this.router.navigate(['/services'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
  }
  workerPage() {
    this.checkValidation();
    this.errors = this.error;
    this.error = [];
    // this.errorMessages.el.nativeElement;

    if (this.errors.length > 0) return;

    // this.setIndividualContractReqValues();
    let user = this.localStorageService.userLocalStorage;

    if (!user) {
      this.confirmationService.confirm({
        icon: 'pi pi-info-circle',
        accept: () => {
          this.route.url.subscribe((s) => {
            this.individualContractService.updateStepData(
              ContractStepsEnum.ForthStep,
              StepTypeEnum.Next
            );
            this.router.navigate(['/auth'], { queryParams: { returnUrl: s } });
          });
        },
        reject: (type: any) => { },
      });
      return;
    }
    if (
      this.employeePickSource.employeePickSource ===
      EmployeePickSourceEnum.Website &&
      this.employeePickSource.howtoReceiveWorker === HowToRecieveWorker.Delivery
    ) {
      this.router.navigate(['/services/employee'], {
        queryParams: {
          stepId: this.individualContractService.individualContractReq.stepId,
        },
      });
      this.individualContractService.step.next(ContractStepsEnum.ForthStep);
      this.individualContractService.updateStepData(
        ContractStepsEnum.ForthStep,
        StepTypeEnum.Next
      );
    }
    if (
      this.employeePickSource.employeePickSource ===
      EmployeePickSourceEnum.Company ||
      this.employeePickSource.howtoReceiveWorker ===
      HowToRecieveWorker.FromBranch
    ) {
      this.router.navigate(['/services/details'], {
        queryParams: {
          stepId: this.individualContractService.individualContractReq.stepId,
        },
      });
      this.individualContractService.step.next(ContractStepsEnum.FifthStep);
      this.individualContractService.updateStepData(
        ContractStepsEnum.FifthStep,
        StepTypeEnum.Next
      );
    }
  }

  checkValidation() {
    let s: any = [];
    if (!this.pricing) {
      this.translateService
        .get('PricingDetails.ChoosePricing')
        .subscribe((v) => this.error.push(v));
      // s.push('من فضلك اختر الباقة');
    }
    if (!this.employeePickSource) {
      this.translateService
        .get('PricingDetails.ChooseWorker')
        .subscribe((v) => this.error.push(v));
      // s.push('من فضلك اختر طريقة اختيار العاملة');
    }
    if (this.employeePickSource && !this.employeePickSource.employeePickSource) {
      this.translateService
        .get('PricingDetails.WayToRecieveWorker')
        .subscribe((v) => this.error.push(v));
      // s.push('من فضلك اختر طريقة استلام العاملة');
    }
    if (
      this.employeePickSource &&
      this.employeePickSource.employeePickSource ==
      this.EmployeePickSource.Website
    ) {
      if (!this.employeePickSource.howtoReceiveWorker) {
        this.translateService
          .get('PricingDetails.ChooseDeliveryMethod')
          .subscribe((v) => this.error.push(v));
        // s.push('من فضلك اختر طريقة التوصيل');
      }
      if (
        this.employeePickSource.howtoReceiveWorker ===
        HowToRecieveWorker.FromBranch &&
        !this.employeePickSource.recieveEmployeeFromHousing
      ) {
        this.translateService
          .get('PricingDetails.ChooseCompanyBranch')
          .subscribe((v) => this.error.push(v));
        // s.push('من فضلك اختر فرع الشركة');
      }
    }
    if (
      this.employeePickSource &&
      this.employeePickSource.employeePickSource ==
      this.EmployeePickSource.Company &&
      !this.employeePickSource.recieveEmployeeFromHousing
    ) {
      this.translateService
      .get('PricingDetails.ChooseCompanyBranch')
      .subscribe((v) => this.error.push(v));
      // s.push('من فضلك اختر فرع الشركة');
    }

    this.errorMessage = this.error;
    // if (!this.pricing)
    //   this.error.push({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: 'Please Choose Package',
    //   });
    // if (!this.employeePickSource)
    //   this.error.push({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: `Please Choose How To ${this.filterData.profession.value}`,
    //   });
    // if (this.employeePickSource && !this.employeePickSource.employeePickSource)
    //   this.error.push({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: `Please Choose How To ${this.filterData.profession.value}`,
    //   });
    // if (
    //   this.employeePickSource &&
    //   this.employeePickSource.employeePickSource ==
    //   this.EmployeePickSource.Website
    // ) {
    //   if (!this.employeePickSource.howtoReceiveWorker)
    //     this.error.push({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Please choose a delivery method',
    //     });
    //   if (
    //     this.employeePickSource.howtoReceiveWorker ===
    //     HowToRecieveWorker.FromBranch &&
    //     !this.employeePickSource.recieveEmployeeFromHousing
    //   )
    //     this.error.push({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Please choose a housing building',
    //     });
    // }
    // if (
    //   this.employeePickSource &&
    //   this.employeePickSource.employeePickSource ==
    //   this.EmployeePickSource.Company &&
    //   !this.employeePickSource.recieveEmployeeFromHousing
    // )
    //   this.error.push({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: 'Please choose a housing building',
    //   });
  }
  setIndividualContractReqValues() {
    // this.individualContractService.individualContractReq.professionId =
    //   '' + this.filterData.profession.key;
    // this.individualContractService.individualContractReq.professionName = this.filterData.profession.value;
    // this.individualContractService.individualContractReq.nationalityId = this.filterData.nationality.nationalityId;
    // this.individualContractService.individualContractReq.nationalityId ==
    //   this.filterData.nationality.nationalityName;
    // this.individualContractService.individualContractReq.pricing = this.pricing;
    // this.individualContractService.individualContractReq.employeePickSource = this.employeePickSource.employeePickSource;
    // this.individualContractService.individualContractReq.howtoReceiveWorker = this.employeePickSource.howtoReceiveWorker;
    // this.individualContractService.individualContractReq.recieveEmployeeFromHousing = this.employeePickSource.recieveEmployeeFromHousing;
  }
}
