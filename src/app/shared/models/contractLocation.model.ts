import { City } from "./city.model";
import { District } from "./district.model";
import { DistrictAvailableDays } from "./districtAvailableDays.model";

export interface ContractLocation {
    ContractLocationId: string;
    Latitude: string;
    Longitude: string;
    HouseType: string;
    HouseNumber: string;
    FloorNumber: string;
    PartmentNumber: string;
    ContractNumber: string;
    City: City;
    District: District;
    AvailableDays: DistrictAvailableDays[];
    MapUrl: string;
}