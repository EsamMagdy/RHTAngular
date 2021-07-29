import { Subject } from 'rxjs';
import { StringKeyValuePairs } from 'src/app/shared/models/keyValuePairs.model';
import {
  LocalStorageKeys,
  StepDataLocalStorage,
} from './../models/localStorage.model';
import { User } from './../models/user.model';
import {
  ContractStepsEnum,
  IndividualContractAttachment,
  StepTypeEnum,
} from './../models/individualContractReq.model';
import { StepData } from './../models/StepDataVm.model';
import { environment } from './../../../environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// import { LocationFormData } from 'src/app/location/locationForm.model';
import { Guid } from '../models/guid.model';
import { ContactPreviousLocation } from '../models/contactPreviousLocation.model';
import { IndividualContractReq } from '../models/individualContractReq.model';
import { IndvReqContact } from '../models/individualContractReqContact.model';
import { KeyValuePairs } from '../models/keyValuePairs.model';
import { NationalityWithEmpAvailableNumber } from '../models/nationalityWithEmpAvailableNumber.model';
import { MapperFactory } from '@dboneslabs/mpr/mapper-factory';
import { MapSetup } from 'src/app/shared/models/mapSetup.model';

import {
  ResponseDataCRMForContractTemplate,
  ResponseDataCRMWithDeleting,
  ResponseDataCRMWithObjectData,
} from '../models/responseDataCRM.model';
import { Router } from '@angular/router';
import { IndividualLaborStock } from '../models/individualLaborStock.model';
import { EmployeePickSourceEnum } from '../models/employeePickSourceEnum.model';
import { LocalStorageService } from './localStorage.service';
import { AttachmentsFieldName } from '../models/attachments.model';

@Injectable({ providedIn: 'root' })
export class IndividualContractService {
  individualContractReq = new IndividualContractReq();
  totalEmployeeCount = new Subject<number>();
  indContReqCreated: IndividualContractReq;
  professionName = new Subject<string[]>();
  step = new Subject<number>();
  isAuthenticated: boolean;
  isFirstTime = false;
  userDataCompleted = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.step.next(1);

    // this.individualContractReq.stepId = Guid.newGuid();
    // this.individualContractReq.contactId =
    //   'E0076C58-816F-EB11-A81E-000D3A47A306';
  }

  get indivContractReq() {
    let stepId =
      this.individualContractReq.stepId ??
      this.localStorageService.indivContractReqLocalStorage.stepId;
    let indiv = new IndividualContractReq();
    this.getStepDetails(stepId).subscribe((stepData) => {
      indiv = JSON.parse(stepData.data) as IndividualContractReq;
      return indiv;
    });
    return indiv;
  }
  getStepDetails(stepId: string) {
    // let stepId = stepId ?? this.localStorageService.indivContractReqLocalStorage.stepId;
    return this.http
      .get<ResponseDataCRMWithObjectData<StepData>>(
        environment.apiUrl +
          `IndividualContractRequest/GetStepById?id=${stepId}`
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  createStep() {
    // let stepData = { stepType: StepTypeEnum.Next, currentStep: 0 };
    this.individualContractReq.stepType = StepTypeEnum.Next;
    this.individualContractReq.currentStep = 0;
    this.individualContractReq.stepId = Guid.newGuid();
    // let stepData = this.individualContractReq { stepType: StepTypeEnum.Next, currentStep: 0 };

    // let data = JSON.stringify(this.individualContractReq);
    // localStorage.setItem(LocalStorageKeys.indvContractReq, data);

    this.localStorageService.indivContractReqLocalStorage =
      this.individualContractReq;

    let newStepData = new StepData();
    newStepData.id = this.individualContractReq.stepId;
    newStepData.data = JSON.stringify(
      this.localStorageService.indivContractReqLocalStorage
    );
    this.addStepData(newStepData).subscribe();
  }
  updateStepData(currentStep: ContractStepsEnum, stepType: StepTypeEnum) {
    this.individualContractReq.currentStep = currentStep;
    this.individualContractReq.stepType = stepType;

    // let data = JSON.stringify(this.individualContractReq);
    // localStorage.setItem(LocalStorageKeys.indvContractReq, data);
    this.localStorageService.indivContractReqLocalStorage =
      this.individualContractReq;

    let newData =
      this.individualContractReq ??
      (JSON.parse(
        localStorage.getItem(LocalStorageKeys.indvContractReq)
      ) as IndividualContractReq);

    // let data = JSON.parse(localStorage.getItem(LocalStorageKeys.StepData)) as StepDataLocalStorage;
    this.getStepDetails(newData.stepId).subscribe((stepData) => {
      stepData.data = JSON.stringify(
        this.localStorageService.indivContractReqLocalStorage
      );
      return this.http
        .post<number>(
          environment.apiUrl + `IndividualContractRequest/UpdateStepData`,
          stepData
        )
        .subscribe();
    });
    // return this.http.post<number>(environment.apiUrl + `IndividualContractRequest/UpdateStepData`
    //   , stepData);
  }
  addStepData(stepData: StepData) {
    return this.http.post<ResponseDataCRMWithObjectData<StepData>>(
      environment.apiUrl + `IndividualContractRequest/AddStepData`,
      stepData
    );
  }

  async completeIndivReq(indivContRequstID: string) {
    let indivContRequst = await this.getIdivContDetails(
      indivContRequstID
    ).toPromise();
  }
  getIdivContDetails(id: string) {
    return this.http
      .get<ResponseDataCRMWithObjectData<IndividualContractReq>>(
        environment.apiUrl + `IndividualContractRequest/GetDetails?id=${id}`
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  checkAvailableLabor(nationalityId: string, professionId: string) {
    return this.http
      .get<ResponseDataCRMWithObjectData<IndividualLaborStock>>(
        environment.apiUrl +
          `IndividualContractRequest/CheckAvailableLabor?nationalityId=${nationalityId}&professionId=${professionId}`
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  setLoactionData(location: any) {
    this.individualContractReq.address = location.addressNotes;
    this.individualContractReq.partmentNumber = location.apartmentNumber;
    this.individualContractReq.houseNo = location.houseNumber;
    this.individualContractReq.floorNo =
      location.floorNumber.value == null ? 0 : location.floorNumber.key;
    this.individualContractReq.houseType =
      location.houseType.value == null ? 0 : location.houseType.key;
    this.individualContractReq.cityId = location.city.cityId;
    this.individualContractReq.city = location.city;

    this.individualContractReq.districtId = location.district.districtId;
    this.individualContractReq.district = location.district;
    this.individualContractReq.selectedLocationId =
      location.contactPreviouslocationId;

    this.individualContractReq.latitude = location.mLatitude;
    this.individualContractReq.longitude = location.mLongitude;
    // let mapperFactory = new MapperFactory();
    // mapperFactory.addSetup(new MapSetup());
    // let mapper = mapperFactory.createMapper();

    // location.$type = 'models.contactPreviousLocation';
    // Object.assign(
    //   this.individualContractReq,
    //   mapper.map(location, IndividualContractReq)
    // );
  }
  getContactWithPreviousLocation(userId: string) {
    return this.http
      .get<ResponseDataCRMWithObjectData<IndvReqContact>>(
        environment.apiUrl +
          `IndividualContractRequest/GetWithPreviousLocation?userId=${userId}`
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  setProfessionAndNationality(
    profession: StringKeyValuePairs,
    nationality: NationalityWithEmpAvailableNumber
  ) {
    this.individualContractReq.professionId = '' + profession.key;
    this.individualContractReq.professionName = profession.value;
    this.individualContractReq.nationalityId = nationality.nationalityId;
    this.individualContractReq.nationalityName = nationality.nationalityName;
    this.professionName.next([profession.value, nationality.nationalityId]);
  }
  createNewContractRequest() {
    let indConReq = { ...this.individualContractReq };
    delete indConReq.employee;
    delete indConReq.employeFilteringData;
    delete indConReq.pricing;
    delete indConReq.stepId;
    delete indConReq.recieveEmployeeFromHousing;

    indConReq.contactId = this.localStorageService.userLocalStorage.crmUserId;
    indConReq.pricingId = this.individualContractReq.pricing.id;
    console.log(indConReq);
    debugger;
    return this.http
      .post<ResponseDataCRMWithObjectData<IndividualContractReq>>(
        environment.apiUrl + 'IndividualContractRequest/Create',
        indConReq
        // ,
        // {
        //   headers: new HttpHeaders({ source: '3' }),
        // }
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  async getContractTemplate() {
    debugger;
    let indConReq = await this.createNewContractRequest().toPromise();
    this.indContReqCreated = { ...indConReq };

    return this.http
      .post<ResponseDataCRMForContractTemplate<string>>(
        environment.apiUrl + 'IndividualContractRequest/RequestTemplate',
        indConReq
      )
      .pipe(
        map((resData) => {
          debugger;
          this.localStorageService.indivContractCreatedLocalStorage = true;
          this.localStorageService.indivContractReqLocalStorage = null;
          console.log(resData);
          
          return resData.data;
        })
      );
  }

  getContractTemplateWithIndContReq(indConReq: IndividualContractReq) {
    this.http
      .post<ResponseDataCRMForContractTemplate<string>>(
        environment.apiUrl + 'IndividualContractRequest/RequestTemplate',
        indConReq
      )
      .pipe(
        map((resData) => {
          return resData.data;
        })
      );
  }
  uploadAttachments(fieldName: string, imageBase: string, name: string) {
    let contractId = this.indContReqCreated.individualContractRequestId;
    return this.http.post<ResponseDataCRMForContractTemplate<string>>(
      environment.apiUrl + 'IndividualContractRequest/UploadAttachments',
      {
        Id: contractId,
        ImageBase: imageBase,
        Name: name,
        FieldName: fieldName,
      }
    );
  }

  isUserDataCompleted(userId: string) {
    return this.http.get<ResponseDataCRMWithDeleting>(
      environment.apiUrl + `contact/IsProfileCompleted_M/${userId}`
    );
  }
}
