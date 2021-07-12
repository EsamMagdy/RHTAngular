import { mapClass } from "@dboneslabs/mpr/annotations/map-class";
import { mapProperty } from "@dboneslabs/mpr/annotations/map-property";
//@mapClass('models.city')
export class City {
    // @mapProperty()
    cityId: string;
    // @mapProperty()
    name: string;
    // @mapProperty()
    arabicName: string;
    // @mapProperty()
    englishName: string;
    // @mapProperty()
    isForHourly: boolean;
    // @mapProperty()
    individualContractDeliveryCost: number;
    // @mapProperty()
    recieveWorkerType: RecieveWorkerType;
}
export enum RecieveWorkerType {
    DeliveryOnly = 0,
    FromHousingOnly = 1,
    DeliveryAndFromHousing = 2
}