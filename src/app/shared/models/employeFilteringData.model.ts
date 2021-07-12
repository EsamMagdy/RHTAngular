import { IndividualPricing } from "./individualPricing.model";

export class EmployeFilteringData {
    nationalityId: string;
    professionId: string;
    housingId: string;
    iDNum: string;
    professionName: string;
    sex: number[];
    marital_Status: number[];
    age: string;
    experience: number[]
    //  AgeOperand 
    religion: number[]
    canCook: boolean;
    treatOld: boolean;
    treatChildren: boolean;
    speakArabic: boolean;
    speakEnglish: boolean;
    pageIndex: number;
    pageSize: number;
    automaticDriving: boolean;
    manualDriving: boolean;
    cleaning: boolean;
    employees: Employee[];
    // [Symbol.iterator]() { return this; }
}
export interface Employee {
    isSelected:boolean;
    employeeId: string;
    videoName: string;
    jobTitle: string;
    jobNumber: string;
    nationalityId: string;
    sex: string;
    marital_Status: string;
    birthdate: Date;
    age: number;
    skills: string;
    image: string;
    idNumber: string;
    canCook: boolean;
    treatOld: boolean;
    statusCode: number;
    treatChildren: boolean;
    speakEnglish: boolean;
    speakArabic: boolean;
    automaticDriving: boolean;
    manualDriving: boolean;
    cleaning: boolean;
    notes: string;
    professionId: string;
    priorContracts: IndividualContract[]
    candidateId: string;
    employeeType: number;
    englishName: string;
    arabicName: string;
    name: string;
    nationalityName: string;
    professionName: string;
    religion: number;
    religionName: string;
    extraNotes: string;
    gender: number;
    genderName: string;
    maritalStatus: number;
    maritalStatusName: string;
    vedioUrl: string;
    candidate: Candidate;
    prevExperiences: PrevExperience[]
    empExperience: number;
    experiancePeriod: number;
    housingBuildingId: string;
}
interface IndividualContract {
    ContactId: string;
    ContactName: string;
    ContractDate: Date;
    ContractEndDate: Date;
    ContractNumber: string;
    Address: string;
    ContactAddress: string;
    ContractTypeId: string;
    ContractTypeName: string;
    FinalPrice: number;
    Insurance: number;
    FloorNo: number;
    HouseNo: string;
    HouseType: number;
    IndividualContractId: string;
    IsPaid: boolean;
    WantToRenew: boolean;
    Latitude: string;
    Longitude: string;
    MapUrl: string;
    PartmentNumber: string;
    PricingId: string;
    PricingName: string;
    ProfessionId: string;
    ProfessionName: string;
    NationalityId: string;
    NationalityName: string;
    TotalAmount: string;
    TotalAmountWithVat: number;
    VatAmount: number;
    VatRate: number;
    AcceptTerms: boolean;
    PromotionCode: string;
    FromSite: boolean;
    Contact: Contact;
    RecaptchaStatus: boolean;
    CurrentStep: ContractStepsEnum;
    StepType: StepTypeEnum;
    // DynamicTemplateParts Template 
    MobileNumber: string;
    Notes: string;
    EmployeeId: string;
    NewEmployeeId: string;
    EmployeeName: string;
    Signature: string;
    CustomerNationalityName: string;
    CreatedOn: Date;
    IsProfileCompleted: boolean;
    ContractStopDays: number;
    ServiceEndDate: Date
    IqamaAttachmentId: string;
    FamilyCardId: string;
    BusinessCardId: string;
    CarInsuranceId: string;
    CarLicenseId: string;
    StatusCode: number;
    StatusCodeName: string;
    RenewedFrom: string;
    PriceType: number;
    RenewedToContract: string;
    MTHContractNo: string;
    RenewContractAttachment: string;
    Template: DynamicTemplateParts;
    Pricing: IndividualPricing
}

interface Contact {
    Id: string;
    FName: string;
    LastName: string;
    FullName: string;
    Email: string;
    MobilePhone: string;
    OtherMobilePhone: string;
    JobTitle: string;
    CityId: string;
    TempNationalityId: string;
    NationalityId: string;
    NationalityName: string;
    IdentificationNo: string;
    RegionId: string;
    GenderId: number;
    GenderName: string;
    WorkSector: number;
    WorkSectorName: string;
    PlatformSource: number;
    IsIdNoExist: boolean;
    BlackList: boolean;
    BlackListReason: string;
    BlackListStatus: number;
    HadRenewDiscount: boolean;
    CityName: string;
    longitude: number;
    Latitude: number;
    ContactAddress: string;
    CompanyKnownBy: number;
    WorkAddress: string;
    WorkPlace: string;
    Collections: Collection[];
    LoyaltyPointsSources: LoyaltyPointsSource[];
    CustomerLevels: CustomerLevel[];
    WalletAmount: number;
    ShowLoyality: boolean;
    ShowWallet: boolean;
    WalletData: WalletValuesData;
    ValidPoints: number;
}

interface Candidate {
    name: string;
    nationalityName: string;
    professionName: string;
    religion: number;
    religionName: string;
    gender: number;
    genderName: string;
    maritalStatus: number;
    maritalStatusName: string;
    birthdate: Date;
    age: number;
    experiancePeriod: number;
    careOfElderly: boolean;
    canCook: boolean;
    speakEnglish: boolean;
    speakArabic: boolean;
    dealWithChildren: boolean;
    candidateId: string;
    washingClothes: boolean;
    ironing: boolean;
    cleaning: boolean;
    otherSkills: string;
    automaticDriving: boolean;
    manualDriving: boolean;
    clean: boolean;
}

interface PrevExperience {
    ProfessionName: string;
    CityName: string;
    FromDate: Date;
    ToDate: Date;
}

interface DynamicTemplateParts {
    Body: string;
    TermsAndConditions: boolean;

}
interface LoyaltyPointsSource {
    Points: number;
    SourceAmount: number;
    ValidTill: Date;
    loyaltyownerId: string;
    ConsumerContactId: string;
    LoyaltyUserId: string;
    HourlyContractId: string;
    Status: PointsSourceStatus;
    StatusName: string;
    LoyaltyPointsSourceId: string;
    PromotionId: string;
    Conversion: number;
    Description: string;
    LoyaltyCustomerActionsId: string;
    ContactProcedureLoggerId: string;
    CreatedOn: Date;
    ConvertedPoint: number;
    AvailablePoint: number;
    CreatedOnString: string;
    ValidTillString: string;
}
interface CustomerLevel {
    CustomerLevelId: string;
    DateFrom: Date;
    DateTo: Date;
    CustomerId: string;
    CustomerName: string;
    LevelId: string;
    LevelName: string;
    Notes: string;
    Activate: number;
    LevelMaxAmountForHader: number;
}
export interface Collection {
    collectionId: string;
    name: string;
    pointNotes: string;
    pointNotesEN: string;
    amount: number;
    walletAmount: number;
    individualProcedureId: string;
    hourlyContractId: string;
    individualContractRequestId: string;
    paymentMethod: number;
    paymentType: number;
    isWalletBalance: number;
    paymentDate: Date;
    contactId: string;
    entityId: string;
    entityName: string;
    createdOn: Date;
    points: number;
    createdOnString: string;
}
interface WalletValuesData {
    WalletAmount: number;
    TotalCredit: number;
    TotalDebit: number;
}
enum PointsSourceStatus {
    New = 1,
    Confirmed = 100000000,
    Converted = 100000001,
    Canceled = 100000002
}
enum ContractStepsEnum {
    FirstStep = 1,
    SecondStep = 2,
    ThirdStep = 3,
    ForthStep = 4,
    FifthStep = 5,
    SixthStep = 6,
    SeventhStep = 7,
    EighthStep = 8
}
enum StepTypeEnum {
    Next = 1,
    Previous = 0
}