import { LocalStorageService } from './../../../shared/services/localStorage.service';
import { Employee } from './../../../shared/models/employeFilteringData.model';
import { Component, OnInit } from '@angular/core';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
    employee: Employee;

    constructor(private individualContractService: IndividualContractService,
        private localStorageService: LocalStorageService) { }

    ngOnInit(): void {
        this.employee = this.localStorageService.indivContractReqLocalStorage.employee;

    }

}
