
import { DistrictAvailableDays } from "./districtAvailableDays.model"
import { City } from "./city.model"
import { KeyValuePairs } from "./keyValuePairs.model"
import { mapClass } from "@dboneslabs/mpr/annotations/map-class";
import { mapProperty } from "@dboneslabs/mpr/annotations/map-property";
import { Types } from "@dboneslabs/mpr/core/types";
import { District } from "./district.model";

//@mapClass('models.contactPreviousLocation')
export class ContactPreviousLocation {
    // @mapProperty()
    addressNotes: string;
    // @mapProperty()
    apartmentNumber: string;
    availableDays: DistrictAvailableDays[]

    // @mapProperty()
    city: City;
    cityId:string;
    contactId: string;
    contactName: string;
    // @mapProperty()
    contactPreviouslocationId: string;
    // @mapProperty()
    district: District;
    districtId:string;
    // @mapProperty()
    floorNumber: KeyValuePairs;
    // @mapProperty()
    houseNumber: string;
    // @mapProperty()
    houseType: KeyValuePairs;
    isSelected :boolean;
    // @mapProperty()
    latitude: string;
    // @mapProperty()
    longitude: string;
    $type:string;
}