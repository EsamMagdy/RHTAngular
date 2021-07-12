import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContractStepsEnum, StepTypeEnum } from 'src/app/shared/models/individualContractReq.model';
import { Employee } from 'src/app/shared/models/employeFilteringData.model';
@Component({
    selector: 'app-no-employee-modal',
    styleUrls: ['./no-employee.component.css'],
    templateUrl: './no-employee.component.html'
})
export class NoEmployeeModalComponent implements OnInit {
    employees: Employee[] = [];
    displayModal = false;
    displayNoEmployeeModal: boolean = false;

    constructor(private individualContractService: IndividualContractService,
                private router: Router) { }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
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
}