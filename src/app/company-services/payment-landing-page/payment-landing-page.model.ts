export interface PaymentMethod {
  paymentMethodMobileList: [];
  registeredCardsList: [];
}
export interface paymentMethodMobileList {
  brandName: string;
  imageUrl: string;
  isAvailable: boolean;
  isAvailableForMobile: boolean;
  order: number;
  isAvailableForAndroid: boolean;
  isAvailableForIOS: boolean;
  id: string;
}
export interface registeredCardsList {
  id: string;
  bin: string;
  cardLastFourDigit: string;
  holder: string;
  expiryMonth: string;
  expiryYear: string;
  registrationId: string;
  crmUserId: string;
  paymentBrand: string;
  imageBrand: string;
  isTestMode: boolean;
}
