import { Lead } from './../../dashboard/dashboard.model';
import { OtherOrdersService } from './../other-orders.service';
import { IndividualContractReq } from './../../../shared/models/individualContractReq.model';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Params } from "@angular/router";

@Component({
    selector: 'app-other-orders-details',
    templateUrl: './other-orders-details.component.html',
    styleUrls: ['./other-orders-details.component.css']
})
export class OtherOrdersDetailsComponent implements OnInit {
    lead: Lead;
    constructor(private route: ActivatedRoute,
        private otherOrdersService: OtherOrdersService) { }

    ngOnInit(): void {
        console.log('details');
        // this.route.data.subscribe((data: Data) => {
        //     this.lead = data['details'];

        // });
        let id = this.route.snapshot.params['id'] as string;
        this.otherOrdersService.getLeadById(id).subscribe(data=>{
            this.lead = data;
        });

        // this.route.params.subscribe((params: Params) => {
        //     let id = params['id'];
        //     this.contractsService.getContractById(id).subscribe(data => {
        //         this.individualContract = data;
        //         console.log(data);

        //     });

        // });
    }


}
