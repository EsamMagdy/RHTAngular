import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Employee,
  EmployeFilteringData,
} from 'src/app/shared/models/employeFilteringData.model';
import {
  ObjectWithPaging,
  ResponseDataCRMWithPaging,
  ResponseDataCRMWithObjectData,
} from 'src/app/shared/models/responseDataCRM.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  employeesFilteredList = new Subject<ObjectWithPaging<Employee>>();
  showEmployeeList = new Subject<boolean>();
  showAllEmployee = new Subject<boolean>();
  EmployeeDetails = new Subject<Employee>();
  constructor(private http: HttpClient) {}

  getAvaialableEmployees(
    nationalityId: string,
    professionId: string,
    pageSize: number
  ) {
    return this.http
      .get<ResponseDataCRMWithPaging<Employee>>(
        environment.apiUrl +
          `IndividualContractRequest/AvailableEmployee?nationalityId=${nationalityId}&professionId=${professionId}&pageSize=${pageSize}`
      )
      .pipe(
        map((resData) => {
          resData.data.model.forEach((s) => (s.isSelected = false));
          return resData.data;
        })
      );
  }
  getEmployeeById(employeeId: string) {
    return this.http
      .get<ResponseDataCRMWithObjectData<Employee>>(
        environment.apiUrl + `Employee/Get/${employeeId}`
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  getemplyeeFilter(employeeFilteringdata: EmployeFilteringData) {
    return this.http
      .post<ResponseDataCRMWithPaging<Employee>>(
        environment.apiUrl + `IndividualContractRequest/FilterEmployee`,
        employeeFilteringdata
      )
      .pipe(
        map((resData) => {
          this.employeesFilteredList.next(resData.data);
          return resData.data;
        })
      );
  }
}
