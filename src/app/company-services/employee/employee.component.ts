import { IndividualContractService } from './../../shared/services/individualContractReq.service';
import { LocalStorageService } from './../../shared/services/localStorage.service';
import {
  ContractStepsEnum,
  IndividualContractReq,
  StepTypeEnum,
} from './../../shared/models/individualContractReq.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less'],
})
export class EmployeeComponent implements OnInit {
  error: Message[] = [];
  errors: Message[];
  errorMessage: string;
  employeesCount: number;

  constructor(
    private individualContractService: IndividualContractService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    // this.getEmployeeData();

    // this.getAvaialableEmployees(
    //   this.nationalityId,
    //   this.professionId,
    //   this.pageSize
    // );

    // this.employeeService.showAllEmployee.subscribe(() => {
    //   this.getAvaialableEmployees(
    //     this.nationalityId,
    //     this.professionId,
    //     this.pageSize
    //   );
    // });

    // this.employeeService.employeesFilteredList.subscribe((empList) => {
    //   this.scrollData = false;
    //   this.employees = empList.model;
    //   this.totalCount = empList.totalCount;
    //   this.individualContractService.individualContractReq.employeFilteringData =
    //     new EmployeFilteringData();
    //   this.individualContractService.individualContractReq.employeFilteringData.employees =
    //     empList.model;
    // });

    this.individualContractService.totalEmployeeCount.subscribe(
      (employeeCount) => {
        this.employeesCount = employeeCount;
      }
    );
  }

  requestDetailPage() {
    let employeeId =
      this.individualContractService.individualContractReq.employeeId;

    if (employeeId || this.employeesCount == 0) {
      this.router.navigate(['/services/details'], {
        queryParams: {
          stepId: this.individualContractService.individualContractReq.stepId,
        },
      });
      this.individualContractService.updateStepData(
        ContractStepsEnum.FifthStep,
        StepTypeEnum.Next
      );
      this.individualContractService.step.next(ContractStepsEnum.FifthStep);
    } else this.errorMessage = 'من فضلك اختر العاملة';
  }
  pricingPage() {
    this.individualContractService.updateStepData(
      ContractStepsEnum.ThirdStep,
      StepTypeEnum.Previous
    );
    this.individualContractService.step.next(ContractStepsEnum.ThirdStep);
    this.router.navigate(['/services/pricing'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
  }

  // getAvaialableEmployees(
  //   nationalityId: string,
  //   professionId: string,
  //   pageSize: number
  // ) {
  //   this.employeeService
  //     .getAvaialableEmployees(nationalityId, professionId, pageSize, 0)
  //     .subscribe((employees) => {
  //       employees.model.forEach((employee) => {
  //         employee.isSelected =
  //           this.employeeId == employee.employeeId ? true : false;
  //       });
  //       this.displayNoEmployeeModal = false;
  //       this.employees = employees.model;
  //       this.totalCount = employees.totalCount;
  //       this.scrollData = true;
  //       // this.showEmployeeList = false;
  //       this.individualContractService.individualContractReq.employeFilteringData =
  //         new EmployeFilteringData();
  //       this.individualContractService.individualContractReq.employeFilteringData.employees =
  //         employees.model;
  //       if (employees.totalCountInPages == 0) {
  //         this.displayNoEmployeeModal = true;
  //         this.scrollData = false;
  //         this.individualContractService.totalEmployeeCount.next(
  //           employees.totalCountInPages
  //         );
  //       }
  //     });
  // }

  // getEmployeeData() {
  //   this.individualContractService.step.next(ContractStepsEnum.ForthStep);
  //   let indContractReq = this.localStorageService.indivContractReqLocalStorage;
  //   this.professionId = indContractReq.professionId;
  //   this.nationalityId = indContractReq.nationalityId;
  //   this.employeeId = indContractReq.employeeId;
  // }
}
