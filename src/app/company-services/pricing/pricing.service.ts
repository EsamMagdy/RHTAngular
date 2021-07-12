import { LocalStorageService } from './../../shared/services/localStorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeePickSource } from 'src/app/shared/models/application/employeePickSource.model';
import { FilterPackageData } from 'src/app/shared/models/application/filterPackageData.model';
import { City, RecieveWorkerType } from 'src/app/shared/models/city.model';
import { HousingBuilding } from 'src/app/shared/models/individualContractReq.model';
import { IndividualPricing } from 'src/app/shared/models/individualPricing.model';
import { KeyValuePairs, StringKeyValuePairs } from 'src/app/shared/models/keyValuePairs.model';
import { NationalityWithEmpAvailableNumber } from 'src/app/shared/models/nationalityWithEmpAvailableNumber.model';
import { ResponseDataCRM, ResponseDataCRMWithObjectData } from 'src/app/shared/models/responseDataCRM.model';
import { IndividualContractService } from 'src/app/shared/services/individualContractReq.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PackageService {
  filteringData = new Subject<FilterPackageData>();
  packages = new Subject<IndividualPricing[]>();
  packageChoosed = new Subject<IndividualPricing>();
  employeePickSource = new Subject<EmployeePickSource>();

  constructor(
    private http: HttpClient,
    private individualContractService: IndividualContractService,
    private localStorageSerivce: LocalStorageService
  ) { }

  getProfessions() {
    return this.http
      .get<ResponseDataCRM<StringKeyValuePairs>>(
        environment.apiUrl + 'IndividualContractRequest/AvailableProfession'
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  getNationalitiesByProfession(professionId: string) {
    return this.http
      .get<ResponseDataCRM<NationalityWithEmpAvailableNumber>>(
        environment.apiUrl + `IndividualContractRequest/GetNationalityByProfession?ProfessionId=${professionId}`
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  loadPackages(professionId: string, nationalityId: string) {
    return this.http
      .post<ResponseDataCRM<IndividualPricing>>(
        environment.apiUrl + 'IndividualPricing/GetPricingByProfessionAndNationality',
        {
          professionId: professionId,
          nationalityId: nationalityId,
        }
      )
      .pipe(
        map((resData) => {
          this.packages.next(resData.data);
          return resData.data;
        })
      );
  }
  getCity() {
    // let cityId = this.individualContractService.individualContractReq.locationFormData.city.cityId;
    let cityId = this.individualContractService.individualContractReq.cityId??
    this.localStorageSerivce.indivContractReqLocalStorage.cityId;

    return this.http
      .get<ResponseDataCRMWithObjectData<City>>(
        environment.apiUrl + `city?Id=${cityId}`
      )
      .pipe(
        map((resData) => {
          let city = resData.data;
          city.individualContractDeliveryCost = Math.round(
            city.individualContractDeliveryCost ?? 0.2
          );
          city.recieveWorkerType = <RecieveWorkerType>city.recieveWorkerType;
          this.individualContractService.individualContractReq.deliveryCost =
            city.individualContractDeliveryCost;
          this.individualContractService.individualContractReq.recieveWorkerType =
            city.recieveWorkerType;
          return city;
        })
      );
  }
  getHousingBuildingForIndividualContract() {
    // let cityId = this.individualContractService.individualContractReq.locationFormData.city.cityId;
    let cityId = this.individualContractService.individualContractReq.cityId ??
      this.localStorageSerivce.indivContractReqLocalStorage.cityId;
    return this.http
      .get<ResponseDataCRM<HousingBuilding>>(
        environment.apiUrl + `IndividualContractRequest/GetRecieveEmployeeHousing?CityId=${cityId}`
      )
      .pipe(
        map((resData) => {
          this.individualContractService.individualContractReq.housingBuildings =
            resData.data;
          return resData.data;
        })
      );
  }
}
