import { filter } from 'rxjs/operators';
import { LocalStorageService } from './../../../shared/services/localStorage.service';
import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee, EmployeFilteringData } from 'src/app/shared/models/employeFilteringData.model';
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
    pageNumber = 1;
    pageSize = 3;
    filterData = false;
    employeeList: Employee[] = [];
    totalCount = 0;
    totalCountInPages = 0;
    employeFilteringData: EmployeFilteringData;


    constructor(private individualContractService: IndividualContractService,
        private employeeService: EmployeeService,
        private localStorageService: LocalStorageService) { 
            console.log('employee filter');
            
        }

    ngOnInit(): void {

        this.individualContractReq = this.localStorageService.indivContractReqLocalStorage;


        let professionName = this.individualContractReq.professionName;

        if (!professionName) this.showDriver = false;
        else (professionName.toLowerCase().includes('driver') || professionName.toLowerCase().includes('سائق'))
        this.showDriver = true;

    }
    onFilterData() {
        debugger;
        this.filterData = true; // flag to check if click filter employee 
        this.employeeList = [];
        this.employeFilteringData = new EmployeFilteringData();
        let professionId = this.individualContractReq.professionId;
        let nationalityId = this.individualContractReq.nationalityId;
        let professionName = this.individualContractReq.professionName;

        // let filterData = new EmployeFilteringData();
        let formValue = { ...this.filterDataForm.value };

        for (let prop in formValue)
            if (!formValue[prop])
                delete formValue[prop];

        this.employeFilteringData = Object.assign(<EmployeFilteringData>formValue, this.employeFilteringData);


        let newAge = "";
        (<[]>this.filterDataForm.value.age).forEach(d => {
            newAge += d + ";";
        });
        newAge = newAge.slice(0, -1);

        // if (!this.filterDataForm.value.pageSize)
        //     filterData.pageSize = 10;
        this.employeFilteringData.pageSize = this.pageSize;
        this.pageNumber = 1;
        this.employeFilteringData.pageIndex = this.pageNumber;
        this.employeFilteringData.age = newAge;
        this.employeFilteringData.nationalityId = nationalityId;
        this.employeFilteringData.professionId = professionId;
        this.employeFilteringData.professionName = professionName;

        // this.employeeService.showEmployeeList.next(true);
        // document.getElementById('headerClass').scrollIntoView();
        this.employeeService.getemplyeeFilter(this.employeFilteringData).subscribe(resData => {
            this.totalCountInPages = resData.totalCountInPages;
            console.log(resData);

            if (!this.totalCountInPages) {
                this.employeeList = [];
                this.totalCount = 0;
            } else {
                this.employeeList.push(...resData.model);
                this.totalCount = this.employeeList.length;
            }
            this.employeeService.employeesFilteredList.next({
                model: this.employeeList,
                totalCount: this.totalCount,
                totalCountInPages: this.totalCountInPages
            });
        });
    }
    onClearForm() {
        this.filterDataForm.reset();
        this.age = [18, 50];
        this.maxNumberToDisplay = 3;
        this.employeeList = [];
        this.filterData = false;
        this.pageNumber = 1;
        this.employeeService.showAllEmployeeOnClearFilter.next(true);
        // this.employeeService.getemplyeeFilter(filterData).subscribe();
    }

    @HostListener('window:scroll', [])
    onScroll(): void {
        debugger;


        // if (!this.scrollData || this.totalCount == this.totalCountInPages) return; // not scroll if all employees returned 
        if (this.totalCountInPages == 0 || (this.totalCount == this.totalCountInPages)) return; // not scroll if no employee or all employees returned 

        if (this.bottomReached() && this.filterData) {
            this.pageNumber += 1;
            this.employeFilteringData.pageIndex = this.pageNumber;
            this.employeeService.getemplyeeFilter(this.employeFilteringData).subscribe(resData => {
                this.totalCountInPages = resData.totalCountInPages;
                console.log('resData ', resData);

                if (!this.totalCountInPages) {
                    this.employeeList = [];
                    this.totalCount = 0;
                } else {

                    this.employeeList.push(...resData.model);
                    this.totalCount = this.employeeList.length;
                }
                this.employeeService.employeesFilteredList.next({
                    model: this.employeeList,
                    totalCount: this.totalCount,
                    totalCountInPages: this.totalCountInPages
                });
            });

        }
    }

    bottomReached(): boolean {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight;
    }


}
