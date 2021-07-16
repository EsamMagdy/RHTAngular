import { BaseQuickLookup } from './baseQuickLookup.model';
import { ContactPreviousLocation } from './contactPreviousLocation.model';
import { ContractLocation } from './contractLocation.model';
import { DynamicTemplateParts } from './dynamicTemplateParts.model';
import { EmployeePickSourceEnum } from './employeePickSourceEnum.model';
import {
  Collection,
  Employee,
  EmployeFilteringData,
} from './employeFilteringData.model';
import { IndvReqContact } from './individualContractReqContact.model';
import { IndividualPricing } from './individualPricing.model';
import { IndividualPricingWeb } from './individualPricingWeb.model';
import { NationalityWithEmpAvailableNumber } from './nationalityWithEmpAvailableNumber.model';
import { mapClass } from '@dboneslabs/mpr/annotations/map-class';
import { mapProperty } from '@dboneslabs/mpr/annotations/map-property';
import { Types } from '@dboneslabs/mpr/core/types';
import { City } from './city.model';
import { LocationFormData } from 'src/app/company-services/location/locationForm.model';
import { District } from './district.model';

// @mapClass('models.individualContractReq')
export class IndividualContractReq {
  companyKnownBy: number;
  contactDetails: IndvReqContact;
  nationalityId: string;
  professionId: string;
  responsibleEmployee: string;
  //for payment not configured
  acceptTerms: boolean;
  attachments: IndividualContractAttachment;
  // @mapProperty()
  cityId: string;
  // @mapProperty()
  city: City;
  contactId: string;
  contactPreviousLocations: ContactPreviousLocation[];
  // @mapProperty()
  districtId: string;
  // @mapProperty()
  district: District;
  employeFilteringData: EmployeFilteringData;
  employeeId: string;
  employeePickSource: EmployeePickSourceEnum;
  firstPay: number;
  // @mapProperty()
  floorNo: number;
  // @mapProperty()
  houseNo: string;
  // @mapProperty(Types.number)
  houseType: number;
  individualContractRequestId: string;
  individualLaborStockId: string;
  individualPricing: IndividualPricing[];
  individualPricingWeb: IndividualPricingWeb[];
  insuranceAmount: number;
  insurancePaymentMethod: number;
  isContactDetailsSaved: boolean;
  isRequestCreated: boolean;
  // @mapProperty()
  latitude: string;
  // @mapProperty()
  location: string;
  // @mapProperty()
  longitude: string;
  monthlyPaid: number;
  nationalities: NationalityWithEmpAvailableNumber[];
  // @mapProperty()
  partmentNumber: string;
  paymentUrl: string;
  prePaid: number;
  previousLocations: ContractLocation[];
  pricingId: string;
  pricingName: string;
  professions: BaseQuickLookup[];
  sanadTemplate: DynamicTemplateParts;
  // @mapProperty()
  selectedLocationId: string;
  template: DynamicTemplateParts;
  vatGroupId: string;
  vatRate: number;
  // SignatureImage: HttpPostedFileBase;
  contractStepId: string;
  createdOn: Date;
  housingBuildings: HousingBuilding[];
  isLocationCustomer: boolean;
  isLocationSaved: boolean;
  requestDate: Date;
  requestDuration: string;
  requestDurationName: string;
  signature: string;
  statusCode: StatusCodeIndContractReq;
  statusCodeName: string;
  // #region Steps Proprties
  activationAmount: number;
  // @mapProperty()
  address: string;
  availableLaborCount: number;
  canPaid: boolean;
  collections: Collection[];
  contactAttachments: ContactAttachments;
  contactName: string;
  contractRequestNumber: string;
  currentStep: ContractStepsEnum;
  customerLocationUrl: string;
  deliveryCost: number;
  employee: Employee;
  errorMessage: string;
  finalPrice: number;
  howtoReceiveWorker: number;
  individualContract: string;
  isLocationSentToCustomer: boolean;
  isPaymentUrlSentToCustomer: boolean;
  isSignContractUrlSentToCustomer: boolean;
  nationalityName: string;
  nextSequence: string;
  pricing: IndividualPricing;
  professionName: string;
  recieptVouchers: RecieptVoucherCRM;
  recieveEmployeeFromHousing: string;
  recieveWorkerType: RecieveWorkerType;
  signContractUrl: string;
  stepId: string;
  stepType: StepTypeEnum;
  successMessage: string;
  totalPrice: number;
  vatAmount: number;
  vatGroup: VatGroup;
  totalWithDeliveryCosts:number;
}
export class IndividualContractAttachment {
  identificationCardImage: any;
  familyCardImage: any;
  workCardImage: any;
  carInsuranceImage: any;
  carDocumentImage: any;
  contractWithSignatureImage: any;
  amrSanadImage: any;
  nationalAddressImage: any;
  salaryDefinition: any;
  customerSalaryImage: any;
  identificationCardImageName: string;
  familyCardImageName: string;
  workCardImageName: string;
  carInsuranceImageName: string;
  carDocumentImageName: string;
  signatureImageName: string;
  contractWithSignatureImageName: string;
  amrSanadImageName: string;
  nationalAddressImageName: string;
  salaryDefinitionName: string;
  customerSalaryImageName: string;
}
export enum HousingType {
  Villa = 0,
  Apartment = 1,
}
export interface HousingBuilding {
  housingBuildingId: string;
  name: string;
  branchName: string;
  cityId: string;
  mapUrl: string;
  address: string;
  gender: number;
  isSelected: boolean;
}
export enum ContractStepsEnum {
  FirstStep = 1,
  SecondStep = 2,
  ThirdStep = 3,
  ForthStep = 4,
  FifthStep = 5,
  SixthStep = 6,
  SeventhStep = 7,
  EighthStep = 8,
}
export enum StepTypeEnum {
  Next = 1,
  Previous = 0,
}
interface RecieptVoucherCRM {
  Id: string;
  Amount: number;
  ContactId: string;
  ContractId: string;
  FlexContractId: string;
  Note: string;
  PaymentNote: string;
  PaymentType: number;
  PointOfReciept: number;
  ReceiptDate: Date;
  PaymentCode: string;
  Source: number;
  CarSource: string;
  FinalPrice: number;
  VatAmount: string;
  VateRate: number;
  VatGroupId: string;
  TransactionId: string;
  TransactionDesc: string;
  type: PaymentType;
  PaymentTypeName: string;
  IndividualContractProcedureId: string;
  IndividualContractProcedureName: string;
  OwnerId: string;
  InsuranceAmount: number;
  TotalPrice: number;
  IBAN: string;
  IsInsuranceTransfer: boolean;
  HousingBuildingId: string;
  Discount: number;
  AmountBeforeDiscount: number;
  CustomerBalance: number;
  PaidVouchers: RecieptVoucherCRM[];
  PaidAmount: number;
  RemainingAmount: number;
  ActivationAmount: number;
  UsedBalance: number;
  WalletBalance: number;
  AccountNumber: string;
  CheckNumber: string;
  IndividualContractRequestId: string;
  IndividualContractId: string;
  PaymentAmount: number;
  CardBrand: string;
  CardHolder: string;
  CardBinCountry: string;
  ReceiptVoucherImageName: string;
  EntityName: string;
  IndividualContractRequest: IndividualContractReq;
  VoucherNumber: string;
  TotalAmount: number;
  FinancialRequestId: string;
  PriceWithoutDiscount: number;
  PaymentPosting: number;
  CollectionCreated: number;
}
interface ContactAttachments {
  //     HttpPostedFileBase IdentificationCardImage
  // HttpPostedFileBase FamilyCardImage
  // HttpPostedFileBase WorkCardImage
  // HttpPostedFileBase CarInsuranceImage
  // HttpPostedFileBase CarDocumentImage
  // HttpPostedFileBase ContractWithSignatureImage
  // HttpPostedFileBase AmrSanadImage
  // HttpPostedFileBase NationalAddressImage
  IdentificationCardImageName: string;
  FamilyCardImageName: string;
  WorkCardImageName: string;
  CarInsuranceImageName: string;
  CarDocumentImageName: string;
  SignatureImageName: string;
  ContractWithSignatureImageName: string;
  AmrSanadImageName: string;
  NationalAddressImageName: string;
}
export enum RecieveWorkerType {
  DeliveryOnly = 0,
  FromHousingOnly = 1,
  DeliveryAndFromHousing = 2,
}
interface VatGroup {
  Id: string;
  Code: string;
  DescriptionAr: string;
  DescriptionEn: string;
  Rate: number;
}
enum PaymentType {
  HourlyContract = 1,
  FlexibleService = 2,
  IndividualContractRequest = 3,
  IndividualContract = 4,
  RenewIndividualContract = 5,
  FinancialRequest = 6,
  Points = 20,
}
export enum HowToRecieveWorker {
  Delivery = 1,
  FromBranch = 2,
}
export enum StatusCodeIndContractReq {
  New = 1,
  Approved = 100000000,
  Canceled = 100000001,
  ConfirmedByFinance = 100000004,
  PaymentIsPendingConfirmation = 100000006
}

