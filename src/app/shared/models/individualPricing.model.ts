export interface IndividualPricing {
    id: string;
    name: string;
    priceNumber: string;
    nationalityId: string;
    nationalityName: string;
    professionId: string;
    professionName: string;
    priceType: number;
    priceTypeName: string;
    contractMonths: number;
    periodAmount: number;
    everyMonth: number;
    monthlyPaid: number;
    prePaid: number;
    amountInsurance: number;
    nonSaudiInsurance: number;
    /// <summary>
    /// price without discount
    /// </summary>
    contractAmount: number;
    renewalAmount: number;
    discount: number;
    sanadAmount: number;
    discountName: string;

    discountPercentage: string;
    vatamount: number;
    /// <summary>
    /// contract price without vat before discount
    /// </summary>
    contractpricewithoutvat: number;
    amountafterdiscount: number;
    periodinDaiys: string;
    orderPackage: number;
    vatRate: number;
    professionForGender: number;
    stateCode: CrmEntityState
    finalPrice: number;

    priceWithDiscount: number;
    renewDiscount: number;
    activationAmount: number;
    availableForNew: boolean;
    availableForRenew: boolean;
    displayFor: DisplayPricingFor;
    isSelected:boolean;
}

export enum CrmEntityState {
    Active = 0,
    Inactive = 1,
}
export enum DisplayPricingFor {
    Web = 1,
    Mobile = 2,
    WebAndMobile = 3,
    CRMNewPortal = 4,
    All = 5
}