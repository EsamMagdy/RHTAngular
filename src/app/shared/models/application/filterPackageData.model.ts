import { KeyValuePairs, StringKeyValuePairs } from "../keyValuePairs.model";
import { NationalityWithEmpAvailableNumber } from "../nationalityWithEmpAvailableNumber.model";

export interface FilterPackageData {
    profession: StringKeyValuePairs;
    nationality: NationalityWithEmpAvailableNumber;
}
