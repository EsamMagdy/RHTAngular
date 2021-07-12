import { Component, OnInit } from "@angular/core";
import { IndividualContractReq } from "src/app/shared/models/individualContractReq.model";
import { IndOrdersService } from "../ind-orders.service";

@Component({
    selector: 'app-ind-orders-list',
    templateUrl: './ind-orders-list.component.html',
    styleUrls: ['./ind-orders-list.component.css']
})
export class IndOrdersListComponent implements OnInit {
    indContractRequests: IndividualContractReq[];
    totalCount: number;
    pageNumber: number = 1;
    pageSize: number = 5;

    constructor(private indOrdersService: IndOrdersService) { }

    ngOnInit(): void {

        this.getAllContractRequests(1, this.pageSize);
    }

    // paginate(event: { page: number, first: number, rows: number, pageCount: number }) {
    //     console.log(event);
    //     event.page += 1;
    //     this.getAllContractRequests(event.page, this.pageSize);

    // }
    paginate(event: number) {
        this.pageNumber = event;
        this.getAllContractRequests(event, this.pageSize);

    }
    getAllContractRequests(pageNumber: number, pageSize: number) {
        this.indOrdersService.getAllIndRequests(pageNumber, pageSize).subscribe(data => {
            this.totalCount = data.totalCount;
            this.indContractRequests = data.model;

        });
    }
}
