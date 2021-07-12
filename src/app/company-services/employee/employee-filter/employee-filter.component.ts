import { filter } from 'rxjs/operators';
import { LocalStorageService } from './../../../shared/services/localStorage.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeFilteringData } from 'src/app/shared/models/employeFilteringData.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { EmployeeService } from '../employee.service';
import { Options } from '@angular-slider/ngx-slider';
import { IndividualContractReq } from 'src/app/shared/models/individualContractReq.model';

@Component({
    selector: 'app-employee-filter',
    templateUrl: './employee-filter.component.html',
    styleUrls: ['./employee-filter.component.css']
})
export class EmployeeFilterComponent implements OnInit {
    @ViewChild('filterDataForm') filterDataForm: NgForm;
    age: number[] = [18, 50];
    maxNumberToDisplay: number = 5;
    selectedRelegion: number[] = [];
    selectedMaritalStatus: number[] = [];
    selectedExpreience: number[] = [];
    showDriver = false;
    selectedCities: string[] = [];
    rangeValues: number[] = [18, 50];
    val1: number;
    maritalStatus: number;
    experience: number;
    religion: number;
    individualContractReq: IndividualContractReq;
    constructor(private individualContractService: IndividualContractService,
        private employeeService: EmployeeService,
        private localStorageService: LocalStorageService) { }

    ngOnInit(): void {

        this.individualContractReq = this.localStorageService.indivContractReqLocalStorage;


        let professionName = this.individualContractReq.professionName;

        if (!professionName) this.showDriver = false;
        else (professionName.toLowerCase().includes('driver') || professionName.toLowerCase().includes('سائق'))
        this.showDriver = true;

    }
    onFilterData() {
        let professionId = this.individualContractReq.professionId;
        let nationalityId = this.individualContractReq.nationalityId;
        let professionName = this.individualContractReq.professionName;

        let filterData = new EmployeFilteringData();
        let formValue = { ...this.filterDataForm.value };

        for (let prop in formValue)
            if (!formValue[prop])
                delete formValue[prop];

        filterData = Object.assign(<EmployeFilteringData>formValue, filterData);


        let newAge = "";
        (<[]>this.filterDataForm.value.age).forEach(d => {
            newAge += d + ";";
        });
        newAge = newAge.slice(0, -1);

        if (!this.filterDataForm.value.pageSize)
            filterData.pageSize = 10;

        filterData.age = newAge;
        filterData.nationalityId = nationalityId;
        filterData.professionId = professionId;
        filterData.professionName = professionName;
        filterData.pageIndex = 1;

        this.employeeService.showEmployeeList.next(true);
        // document.getElementById('headerClass').scrollIntoView();
        this.employeeService.getemplyeeFilter(filterData).subscribe();
    }
    onClearForm() {
        this.filterDataForm.reset();
        this.age = [18, 50];
        this.maxNumberToDisplay = 5;
        this.employeeService.showAllEmployee.next(true);
        // this.employeeService.getemplyeeFilter(filterData).subscribe();
    }


}
