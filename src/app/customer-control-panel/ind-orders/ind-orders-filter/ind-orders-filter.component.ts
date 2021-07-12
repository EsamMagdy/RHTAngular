import { Component, OnInit } from "@angular/core";
import { StatusCodeIndContractReq } from "src/app/shared/models/individualContractReq.model";

@Component({
    selector: 'app-ind-orders-filter',
    templateUrl: './ind-orders-filter.component.html',
    styleUrls: ['./ind-orders-filter.component.css']
})
export class IndOrdersFilterComponent implements OnInit {
    ngOnInit(): void {
      console.log(this.enumToDescriptedArray(StatusCodeIndContractReq));
        
    }
    StatusCodeIndContractReq = StatusCodeIndContractReq;

    enumToDescriptedArray<T>(enumeration: T, separatorRegex: RegExp = /_/g): any {
        return (Object.keys(enumeration) as Array<keyof T>)
            .filter(key => isNaN(Number(key)))
            .filter(key => typeof enumeration[key] === "number" || typeof enumeration[key] === "string")
            .map(key => ({
                id: enumeration[key],
                description: String(key).replace(separatorRegex, ' '),
            }));
    }
}