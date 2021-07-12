import { ContactPreviousLocation } from "./contactPreviousLocation.model";

export interface IndvReqContact {
    contactId: string;
    firstName: string;
    lastName: string;
    fullName: string;
    mobilePhone: string;
    otherMobilePhone: string;
    address: string;
    email: string;
    jobTitle: string;
    workSector: number
    workAddress: string;
    workPlace: string;
    identificationNo: string;
    cityId: string;
    nationalityId: string;
    gender: number;
    companyKnownBy: number;
    cityName: string;
    nationalityName: string;
    address1_PostalCode: string;
    previousLocation:ContactPreviousLocation[]
    responsibleEmployee: string;
    blackList: boolean;
}