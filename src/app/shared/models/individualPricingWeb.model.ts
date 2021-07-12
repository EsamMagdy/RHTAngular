import { IndividualPricing } from "./individualPricing.model";
export interface IndividualPricingWeb {
    ProfessionId: string;
    ProfessionName: string;
    ForGender: number;
    Pricing: IndividualNationalityWithPricing[]
}

interface IndividualNationalityWithPricing {
    NationalityId: string;
    NationalityName: string;
    Pricing: IndividualPricing[]
    Availablenumber: number;
}