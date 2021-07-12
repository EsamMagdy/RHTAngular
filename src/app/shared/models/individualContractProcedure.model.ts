import { Collection, Contact } from "src/app/customer-control-panel/dashboard/dashboard.model";
import { ContractStepsEnum, IndividualContractReq, StepTypeEnum } from "./individualContractReq.model";
import { IndividualPricing } from "./individualPricing.model";

export class IndividualContractProcedure {
    procedureId: string;
    procedureNumber: string;
    contactId: string;
    contactName: string;
    employeeId: string;
    employeeName: string;
    oldContractId: string;
    oldContractName: string;
    newContractId: string;
    newContractName: string;
    pricingId: string;
    oldPricingId: string;
    oldInsurrance: number;
    pricingName: string;
    oldContractCloseDate: Date;
    oldContractPricingId: string;
    oldContractPricingName: string;
    newContractStartDate: Date;
    statusCode: number;
    isSaudi: boolean;
    isInsuranceTransferred: boolean;
    isChildOfHigherPricing: boolean;
    renewalAmount: number;
    statusCodeName: string;
    ownerId: string;
    nationalityId: string;
    professionId: string;
    pricingType: number;
    isSameOldContractDuration: boolean;
    pricing: IndividualPricing;
    renewDiscount: number;
    periodAmount: number;
    monthlyPayment: number;
    totalAmount: number;
    vatAmount: number;
    advancePayment: number;
    totalAmountWithVat: number;
    cityName: string;
    vatGroup: VatGroup;
    vatGroupId: string;
    vatRate: number;
    oldContractPricing: IndividualPricing;
    contact: Contact;
    recieptVochers: RecieptVoucherCRM[];
    stepId: string;
    currentStep: ContractStepsEnum;
    stepType: StepTypeEnum;
    createdOn: Date;
    collections: Collection[];
    activationAmount: number;

    //  get PaidAmount
    // {


    //         return this.Collections != null ? (this.Collections.length > 0 ? this.Collections.Sum(a => a.Amount) : 0M) + (this.RecieptVochers.Count() > 0 ? this.RecieptVochers.Where(a => a.CollectionCreated != (int)CollectionCreated.Yes).Sum(a => a.PaymentAmount.Value + (a.InsuranceAmount ?? 0M)) : 0M) : 0M;

    // }

    // get UnPaidAmount
    // {

    //     {
    //         return this.RenewalAmount != null ? (this.RenewalAmount.Value - PaidAmount) : 0;
    //     }
    // }
}
export class VatGroup {
    id: string;
    code: string;
    descriptionAr: string;
    descriptionEn: string;
    rate: number;
}
export class RecieptVoucherCRM {
    id: string;
    amount: string;
    contactId: string;
    contractId: string;
    flexContractId: string;
    note: string;
    paymentNote: string;
    paymentType: number;
    pointOfReciept: number;
    receiptDate: Date;
    paymentCode: string;
    source: number;
    carSource: string;
    finalPrice: string;
    vatAmount: string;
    vateRate: number;
    vatGroupId: string;
    transactionId: string;
    transactionDesc: string;
    type: PaymentType;
    paymentTypeName: string;
    individualContractProcedureId: string;
    individualContractProcedureName: string;
    ownerId: string;
    insuranceAmount: number;
    totalPrice: number;
    iBAN: string;
    isInsuranceTransfer: boolean;
    housingBuildingId: string;
    discount: number;
    amountBeforeDiscount: number;
    customerBalance: number;
    paidVouchers: RecieptVoucherCRM;
    paidAmount: number;
    paidInsurrance: number;
    remainingAmount: number;
    activationAmount: number;
    usedBalance: number;
    walletBalance: number;
    accountNumber: string;
    checkNumber: string;
    individualContractRequestId: string;
    individualContractId: string;
    paymentAmount: number;
    cardBrand: string;
    cardHolder: string;
    cardBinCountry: string;
    receiptVoucherImageName: string;
    entityName: string;
    individualContractRequest: IndividualContractReq;
    voucherNumber: string;
    totalAmount: number;
    financialRequestId: string;
    priceWithoutDiscount: number;
    collectionCreated: number;
}
export enum PaymentType {
    hourlyContract = 1,
    flexibleService = 2,
    individualContractRequest = 3,
    individualContract = 4,
    renewIndividualContract = 5,
    financialRequest = 6,
    enterprise = 7,
    indvProcedure = 8,
    points = 20
}