import { Component, Input, OnInit } from "@angular/core";
import { IndividualContractReq } from "src/app/shared/models/individualContractReq.model";
import { IndOrdersService } from "../../ind-orders.service";

@Component({
    selector: 'app-ind-orders-item',
    templateUrl: './ind-orders-item.component.html',
    styleUrls: ['./ind-orders-item.component.css']
})
export class IndOrdersItemComponent implements OnInit {

    @Input('indContractRequests') indContractRequests: IndividualContractReq[];
    @Input('pageNumebrs') pageNumebr: number;
    @Input('totalCounts') totalCount: number;
    @Input('pageSizes') pageSize: number;
   

    constructor(private indOrdersService: IndOrdersService) { }

    ngOnInit(): void {
        // console.log('child');

        // this.getAllContractRequests(1, this.pageSize);
    }

    // paginate(event: { page: number, first: number, rows: number, pageCount: number }) {
    //     console.log(event);
    //     event.page += 1;
    //     this.getAllContractRequests(event.page, this.pageSize);

    // }
    // getAllContractRequests(pageNumber: number, pageSize: number) {
    //     this.indOrdersService.getAllIndRequests(pageNumber, pageSize).subscribe(data => {
    //         this.totalCount = data.totalCount;
    //         this.indContractRequests = data.model;

    //     });
    // }
}
