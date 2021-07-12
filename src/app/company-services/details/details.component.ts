import { DetailsService } from './details.service';
import { LocalStorageService } from './../../shared/services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeePickSourceEnum } from 'src/app/shared/models/employeePickSourceEnum.model';
import { Employee } from 'src/app/shared/models/employeFilteringData.model';
import { ContractStepsEnum, HowToRecieveWorker, IndividualContractReq, StepTypeEnum } from 'src/app/shared/models/individualContractReq.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  individualContractReq: IndividualContractReq;
  employee: Employee;
  EmployeePickSource = EmployeePickSourceEnum;
  HowToRecieveWorker = HowToRecieveWorker;
  constructor(
    private router: Router,
    private individualContractService: IndividualContractService,
    private localStorageService: LocalStorageService,
    private detailsService: DetailsService
  ) { }

  ngOnInit(): void {
    this.individualContractReq = this.localStorageService.indivContractReqLocalStorage;
    this.employee = this.individualContractReq.employee;
  }
  workerPage() {
    if (
      this.individualContractReq
        .employeePickSource === EmployeePickSourceEnum.Website &&
      this.individualContractReq
        .howtoReceiveWorker === HowToRecieveWorker.Delivery
    ) {
      this.router.navigate(['/services/employee'], {
        queryParams: {
          stepId: this.individualContractReq.stepId,
        },
      });
      this.individualContractService.updateStepData(ContractStepsEnum.ForthStep, StepTypeEnum.Previous);
      this.individualContractService.step.next(ContractStepsEnum.ForthStep);
    }
    if (
      this.individualContractReq
        .employeePickSource === EmployeePickSourceEnum.Company ||
      this.individualContractReq
        .howtoReceiveWorker === HowToRecieveWorker.FromBranch
    ) {
      this.router.navigate(['/services/pricing'], {
        queryParams: {
          stepId: this.individualContractReq.stepId,
        },
      });

      this.individualContractService.updateStepData(ContractStepsEnum.ThirdStep, StepTypeEnum.Previous);
      this.individualContractService.step.next(ContractStepsEnum.ThirdStep);
    }
  }
  completingDataOrcontractPage() {
    this.detailsService
      .isUserDataCompleted()
      .subscribe(data => {
        if (data.data.value)
          this.navigateToContractPage();
        else
          this.navigateToCompletingDataPage();
      });


  }

  private navigateToContractPage() {
    this.router.navigate(['/services/contract'], {
      queryParams: {
        stepId: this.individualContractReq.stepId,
      },
    });
    this.individualContractService.updateStepData(ContractStepsEnum.SeventhStep, StepTypeEnum.Next);
    this.individualContractService.step.next(ContractStepsEnum.SeventhStep);
  }
  navigateToCompletingDataPage() {
    this.router.navigate(['/services/complete-data'], {
      queryParams: {
        stepId: this.individualContractReq.stepId,
      },
    });
    this.individualContractService.updateStepData(ContractStepsEnum.SixthStep, StepTypeEnum.Next);
    this.individualContractService.step.next(ContractStepsEnum.SixthStep);
   }
}
