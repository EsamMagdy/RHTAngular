import { StepTypeEnum } from './../../shared/models/individualContractReq.model';
import { ContractStepsEnum } from "src/app/shared/models/individualContractReq.model";

export class Dashboard {
    contractCount: ContractCount;
    complainsCount: ComplainsCount;
    leadCount: number;
    lastFlexibleContract: FlexibleServicePerHour
    lastLead: Lead
    lastTicket: CustomerTicket
}

export class ContractCount {
    currentContracts: number;
    cancelledContracts: number;
    almostOverContracts: number;
    remainingVisits: number;
}
export class ComplainsCount {
    complains: number;
    closedComplains: number;
    openedComplains: number;
}
export class FlexibleServicePerHour {
    contractId: string;
    cityId: string;
    city: string;
    agreeOnConditions: boolean
    contractPeriod: number;
    contractNumber: string;
    contractSource: number;
    startDate: Date;
    startDateString: string;
    createdOn: string;
    deliveringTimeNotes: string;
    districtId: string;
    district: string;
    employeeNumber: number;
    employeeSkill: number;
    finalPrice: number;
    shift: DayShifts;
    shiftName: string;
    shiftNameAr: string;
    houseType: number;
    houseNo: string;
    floorNo: number;
    customer: string;
    customerId: string;
    mapUrl: string;
    partmentNo: string;
    latitude: string;
    longitude: string;
    nationalityId: string;
    nationality: string;
    contractDate: Date
    addressNotes: string;
    paymentAmount: number;
    supervisorNumber: number;
    totalPrice: number;
    vatAmount: number;
    vatRate: number;
    statusCode: string;
    statusName: string;
    evaluation: number;
    numOfHours: number;
    customerMobilePhone: string;
    flexiblePricingId: string;
    flexibleServicePricingName: string;
    buttons: string;
    currentStep: ContractStepsEnum
    stepType: StepTypeEnum
    isProfileCompleted: boolean;
    acceptTerms: boolean;
    recaptchaStatus: boolean;
    contactDetails: Contact;
    flexiblePricingPackages: FlexiblePricing[];
    isPricingPackageAvaliable: boolean;
}
enum DayShifts {
    Morning = 0,
    Evening = 1,
}
export class FlexiblePricing {
    flexiblePricingId: string;
    name: string;
    englishName: string;
    shift: boolean
    hoursNumber: number
    isAvailable: number
    price: string;
    supervisors: number;
    workerNumber: number;
    workerSkills: number;
    discount: string;
    shifts: DayShifts
}
export enum SectorsTypeEnum
{
    Business = 2,
    Individuals = 3,
    HeadOffice = 1
}
export enum RecordSource
    {
        CRMPortal = 3,
        Mobile = 1,
        Web = 2,
        Plugin = 12,
        CRM = 0
    }
export class Contact {
    id: string;
    fName: string;
    lastName: string;
    fullName: string;
    email: string;
    mobilePhone: string;
    otherMobilePhone: string;
    jobTitle: string;
    cityId: string;
    tempNationalityId: string;
    nationalityId: string;
    nationalityName: string;
    identificationNo: string;
    regionId: string;
    genderId: number;
    genderName: string;
    workSector: number;
    workSectorName: string;
    platformSource: number;
    isIdNoExist: boolean;
    blackList: boolean;
    blackListReason: string;
    blackListStatus: number;
    hadRenewDiscount: boolean;
    cityName: string;
    longitude: number;
    latitude: number;
    contactAddress: string;
    companyKnownBy: number;
    workAddress: string;
    workPlace: string;
    collections: Collection[]
}

export class Lead {
    description: string;
    lastName: string;
    mobilePhone: string;
    cityId: string;
    region: string;
    preferredTime: number;
    callCenterSource: number;
    recordSource: number;
    districtId: string;
    contactId: string;
    nationalityId: string;
    preferredProfession: string;
    nationality: string;
    id: string;
    statusCode: string;
    statusName: string;
    buttons: string;
    code: string;
    sector: number;
    createdOn: Date;
    companyName: string;
    emailAddress: string;
    campaignId: string;


    Latitude: string;

    Longitude: string;

    FromNonAvailableCity: boolean;

}
export class CustomerTicket {
    clientClosedCode: string;
    ticketNumber: string;
    problemDetails: string;
    id: string;
    contactId: string;
    contact: string;
    problemTypeName: string;
    problemType: number;
    sectorTypeName: string;
    sectorType: number;
    statusName: string;
    status: number;
    contractId: string;
    contract: string;
    employeeId: string;
    employeeName: string;
    createdOn: Date;
    callNumber: string;
    callerName: string;
    ticketingTypeId: string;
    ticketingTypeNameAr: string;
    ticketingTypeNameEn: string;
    ticketingGroupId: string;
    ticketingGroupNameAr: string;
    ticketingGroupNameEn: string;
    source: number;
    // TicketingType TicketingType 
    // TicketingType TicketingGroup 

}
export class Collection {
    CollectionId: string;
    Name: string;
    PointNotes: string;
    PointNotesEN: string;
    Amount: number;
    WalletAmount: number;
    IndividualProcedureId: string;
    HourlyContractId: string;
    IndividualContractRequestId: string;
    PaymentMethod: number;
    PaymentType: number;
    IsWalletBalance: number;
    PaymentDate: Date;
    ContactId: string;
    EntityId: string;
    EntityName: string;
    CreatedOn: Date;
    Points: number;
    CreatedOnString: string;
}