import { City } from "src/app/shared/models/city.model";
import { District } from "src/app/shared/models/district.model";
import { KeyValuePairs } from "src/app/shared/models/keyValuePairs.model";

export interface LocationFormData {
    addressNotes: string;
    houseNumber: string;
    apartmentNumber: string;
    city: City;
    district: District;
    floorNumber: KeyValuePairs;
    houseType: KeyValuePairs;
}