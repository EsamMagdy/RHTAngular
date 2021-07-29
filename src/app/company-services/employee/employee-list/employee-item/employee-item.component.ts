import { LocalStorageService } from './../../../../shared/services/localStorage.service';
import { EmployeeService } from './../../employee.service';
import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import {
  Employee,
  EmployeFilteringData,
} from 'src/app/shared/models/employeFilteringData.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import {
  ContractStepsEnum,
  StepTypeEnum,
} from 'src/app/shared/models/individualContractReq.model';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.less'],
})
export class EmployeeItemComponent implements OnInit {
  displayModal = false;
  employees: Employee[] = [];
  employee: Employee;
  pageSize: number = 4;
  pageNumber: number = 1;
  professionId: string;
  nationalityId: string;
  totalCount: number;
  displayNoEmployeeModal: boolean = false;
  scrollData: boolean = false;
  filterDataApply = false;
  // showEmployeeList = true;
  employeeIdDetails: string;
  employeeId: string;
  constructor(
    private workerService: EmployeeService,
    private individualContractService: IndividualContractService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployeeData();

    this.getAvaialableEmployees(
      this.nationalityId,
      this.professionId,
      this.pageSize,
      this.pageNumber
    );

    this.workerService.showAllEmployeeOnClearFilter.subscribe((data) => {
      this.getAvaialableEmployees(
        this.nationalityId,
        this.professionId,
        this.pageSize,
        this.pageNumber
      );
    });

    this.workerService.employeesFilteredList.subscribe((empList) => {
      this.scrollData = false;
      this.employees = empList.model;
      this.totalCount = empList.totalCount;
      this.individualContractService.individualContractReq.employeFilteringData =
        new EmployeFilteringData();
      this.individualContractService.individualContractReq.employeFilteringData.employees =
        empList.model;
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    debugger;
    if (!this.scrollData) return;
    if (this.bottomReached()) {
      this.pageNumber += 1;
      this.getAvaialableEmployees(
        this.nationalityId,
        this.professionId,
        this.pageSize,
        this.pageNumber
      );
      // this.workerService.getAvaialableEmployees(this.nationalityId, this.professionId, this.pageSize)
      //   .subscribe(employees => {
      //     this.employees = employees.model;
      //     this.totalCount = employees.totalCount;
      //     // this.showEmployeeList = false;
      //     this.individualContractService.individualContractReq.employeFilteringData = new EmployeFilteringData();
      //     this.individualContractService.individualContractReq.employeFilteringData.employees = employees.model;
      //   });
    }
  }
  bottomReached(): boolean {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }
  getAvaialableEmployees(
    nationalityId: string,
    professionId: string,
    pageSize: number,
    pageNumber: number
  ) {
    this.workerService
      .getAvaialableEmployees(nationalityId, professionId, pageSize, pageNumber)
      .subscribe((employees) => {
        debugger;
        // this.totalCount = employees.totalCount;
        this.individualContractService.totalEmployeeCount.next(
          employees.totalCountInPages
        );

        if (employees.totalCountInPages == 0) {
          this.displayNoEmployeeModal = true;
          this.totalCount = 0;
          this.scrollData = false;
          return;
        }
        employees.model.forEach((employee) => {
          employee.isSelected =
            this.employeeId == employee.employeeId ? true : false;
        });
        this.displayNoEmployeeModal = false;
        debugger;
        this.employees.push(...employees.model);
        this.totalCount = this.employees.length;
        this.scrollData = true;
        // this.showEmployeeList = false;
        this.individualContractService.individualContractReq.employeFilteringData =
          new EmployeFilteringData();
        this.individualContractService.individualContractReq.employeFilteringData.employees =
          employees.model;
      });
  }
  showModalDialog(employee: Employee) {
    this.employeeIdDetails = employee.employeeId;
    this.employee = employee;
    this.displayModal = true;
    this.workerService.EmployeeDetails.next(employee);
  }
  onChooseEmployee(choosedEmployee: Employee) {
    this.employees.forEach((s) => (s.isSelected = false));

    choosedEmployee.isSelected =
      this.employeeIdDetails == choosedEmployee.employeeId ? false : true;

    this.employeeIdDetails = null;

    this.individualContractService.individualContractReq.employee =
      choosedEmployee;

    this.individualContractService.individualContractReq.employeeId =
      choosedEmployee.employeeId;
  }
  detailsPage() {
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
  }
  getEmployeeData() {
    let indContractReq = this.localStorageService.indivContractReqLocalStorage;
    this.professionId = indContractReq.professionId;
    this.nationalityId = indContractReq.nationalityId;
    this.employeeId = indContractReq.employeeId;
  }
}
