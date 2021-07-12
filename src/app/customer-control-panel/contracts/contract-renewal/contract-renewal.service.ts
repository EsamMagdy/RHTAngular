import { ContractStepsEnum, StepTypeEnum } from './../../../shared/models/individualContractReq.model';
import { IndividualPricing } from 'src/app/shared/models/individualPricing.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { IndividualContractProcedure } from "src/app/shared/models/individualContractProcedure.model";
import { ResponseDataCRM, ResponseDataCRMWithObjectData, ResponseDataCRMWithPaging } from "src/app/shared/models/responseDataCRM.model";
import { environment } from "src/environments/environment";
import { StepData } from 'src/app/shared/models/StepDataVm.model';
import { Guid } from 'src/app/shared/models/guid.model';

@Injectable({ providedIn: 'root' })
export class ContractRenewalService {
    individualContractProcedure = new IndividualContractProcedure();
    stepId: string;
    contractId: string;
    constructor(private http: HttpClient) { }

    getRenewProcedureObject(id: string) {
        return this.http
            .get<ResponseDataCRMWithObjectData<IndividualContractProcedure>>(
                environment.apiUrl +
                `IndividualContract/Renew/${id}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getAllPricing(professionId: string, nationalityId: string, pricingId: string, startDate: Date) {
        return this.http
            .get<ResponseDataCRM<IndividualPricing>>(
                environment.apiUrl +
                `IndividualContract/AllPricing?ProfessionId=${professionId}&NationalityId=${nationalityId}&PricingId=${pricingId}&StartDate=${startDate}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getPricingDetailsById(prcingId: string, startDate: Date) {
        return this.http
            .get<ResponseDataCRMWithObjectData<IndividualPricing>>(
                environment.apiUrl +
                `IndividualContract/PricingDetails?PricingId=${prcingId}&StartDate=${startDate}`
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    getNewPricingDetails(indivContractProc: IndividualContractProcedure) {
        return this.http
            .post<ResponseDataCRMWithObjectData<IndividualPricing>>(
                environment.apiUrl +
                `IndividualContract/PricingDetails`, indivContractProc
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    createStepForContract() {
        this.stepId = Guid.newGuid();
        this.individualContractProcedure.stepId = this.stepId;
        let newStepData = new StepData();
        newStepData.id = this.individualContractProcedure.stepId;
        newStepData.data = JSON.stringify(this.individualContractProcedure);
        this.addStepData(newStepData).subscribe();
        // let indivContractProced = new IndividualContractProcedure();
        // indivContractProced.stepId = stepId;
        // return indivContractProced;
    }
    addStepData(stepData: StepData) {
        return this.http.post<ResponseDataCRMWithObjectData<StepData>>
            (environment.apiUrl + `IndividualContractRequest/AddStepData`,
                stepData);
    }
    getStepDetails(stepId: string) {
        return this.http.get<ResponseDataCRMWithObjectData<StepData>>
            (environment.apiUrl + `IndividualContractRequest/GetStepById?id=${stepId}`).pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
    updateStepData(currentStep: ContractStepsEnum, stepType: StepTypeEnum) {
        this.individualContractProcedure.currentStep = currentStep;
        this.individualContractProcedure.stepType = stepType;
        this.individualContractProcedure.stepId = this.stepId;

        let newData = this.individualContractProcedure;

        this.getStepDetails(newData.stepId).subscribe(stepData => {
            stepData.data = JSON.stringify(newData);
            return this.http.post<number>(environment.apiUrl + `IndividualContractRequest/UpdateStepData`
                , stepData).subscribe();
        });
        // return this.http.post<number>(environment.apiUrl + `IndividualContractRequest/UpdateStepData`
        //   , stepData);
    }
    renewContract() {
        return this.http
            .post<ResponseDataCRMWithObjectData<IndividualContractProcedure>>(
                environment.apiUrl +
                `IndividualContract/Renew`,
                this.individualContractProcedure
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
}
