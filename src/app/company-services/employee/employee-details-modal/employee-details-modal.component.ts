import { Employee } from 'src/app/shared/models/employeFilteringData.model';
import { EmployeeService } from '../employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { ContractStepsEnum, StepTypeEnum } from 'src/app/shared/models/individualContractReq.model';

@Component({
    selector: 'app-employee-details-modal',
    templateUrl: './employee-details-modal.component.html',
    styleUrls: ['./employee-details-modal.component.css']
})
export class EmployeeDetailsModalComponent implements OnInit {
    employee: Employee;
    displayModal = false;
    constructor(private employeeService: EmployeeService,
        private router: Router,
        private individualContractService: IndividualContractService) { }
    ngOnInit(): void {
        this.employeeService.EmployeeDetails.subscribe(employee => {
            if (employee) {
                this.employee = employee;
                this.displayModal = true;
            }
        });
    }
    detailsPage() {

        this.router.navigate(['/services/details'], { queryParams: { stepId: this.individualContractService.individualContractReq.stepId } });
        this.individualContractService.updateStepData(ContractStepsEnum.FifthStep, StepTypeEnum.Next);
        this.individualContractService.step.next(ContractStepsEnum.FifthStep);
    }

}