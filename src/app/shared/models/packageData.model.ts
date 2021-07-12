import { Pricing } from "src/app/packages/package.model";
import { HowToRecieveWorker } from "./individualContractReq.model";

export interface PackageDataSubject{
    pricing:Pricing;
    employeePickSource:EmployeePickSource
}
interface EmployeePickSource{
    website:HowToRecieveWorker;
    company:boolean
}