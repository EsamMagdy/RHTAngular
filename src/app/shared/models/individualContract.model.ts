import { Contact } from "src/app/customer-control-panel/dashboard/dashboard.model";
import { DynamicTemplateParts } from "./dynamicTemplateParts.model";
import { Collection } from "./employeFilteringData.model";
import { ContractStepsEnum, StepTypeEnum } from "./individualContractReq.model";
import { IndividualPricing } from "./individualPricing.model";

export class IndividualContract {
    contactId: string;
    contactName: string;
    contractDate: Date;
    contractEndDate: Date;
    contractNumber: string;
    address: string;
    contactAddress: string;
    contractTypeId: string;
    contractTypeName: string;
    finalPrice: number;
    insurance: number;
    floorNo: number;
    houseNo: string;
    houseType: number;
    individualContractId: string;
    isPaid: boolean;
    wantToRenew: boolean;
    latitude: string;
    longitude: string;
    mapUrl: string;
    partmentNumber: string;
    pricingId: string;
    pricingName: string;
    professionId: string;
    professionName: string;
    nationalityId: string;
    nationalityName: string;
    totalAmount: string;
    totalAmountWithVat: number;
    vatAmount: number;
    vatRate: number;
    acceptTerms: boolean;
    promotionCode: string;
    fromSite: boolean;
    contact: Contact
    recaptchaStatus: boolean;
    currentStep: ContractStepsEnum;
    stepType: StepTypeEnum;
    mobileNumber: string;
    notes: string;
    employeeId: string;
    newEmployeeId: string;
    employeeName: string;
    signature: string;
    customerNationalityName: string;
    createdOn: Date;
    isProfileCompleted: boolean;
    contractStopDays: number;
    serviceEndDate: Date;
    iqamaAttachmentId: string;
    familyCardId: string;
    businessCardId: string;
    carInsuranceId: string;
    carLicenseId: string;
    statusCode: number;
    statusCodeName: string;
    renewedFrom: string;
    priceType: number;
    renewedToContract: string;
    oldContractNo: string;
    renewContractAttachment: string;
    template: DynamicTemplateParts;
    pricing: IndividualPricing;
    collection: Collection[];
}