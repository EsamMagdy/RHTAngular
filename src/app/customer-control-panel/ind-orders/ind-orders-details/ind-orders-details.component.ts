import { IndividualContractReq } from './../../../shared/models/individualContractReq.model';
import { IndOrdersService } from './../ind-orders.service';
import { IndividualContract } from './../../../shared/models/individualContract.model';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Params, Router } from "@angular/router";

@Component({
    selector: 'app-ind-orders-details',
    templateUrl: './ind-orders-details.component.html',
    styleUrls: ['./ind-orders-details.component.css']
})
export class IndOrdersDetailsComponent implements OnInit {
    deservedAmount: number;
    individualContractReq: IndividualContractReq
    constructor(private route: ActivatedRoute,
        private indOrdersService: IndOrdersService,
        private router: Router) { }

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            this.individualContractReq = data['details'];
            this.deservedAmount = Math.round(this.individualContractReq?.finalPrice ?? 0) + Math.round(this.individualContractReq?.deliveryCost ?? 0);
        });

        // this.route.params.subscribe((params: Params) => {
        //     let id = params['id'];
        //     this.contractsService.getContractById(id).subscribe(data => {
        //         this.individualContract = data;
        //         console.log(data);

        //     });

        // });
    }

    cancelRequest() {
        this.indOrdersService
            .cancelRequest(this.individualContractReq.individualContractRequestId)
            .subscribe(data => {
                if (data.value)
                    this.router.navigate(['/dashboard/ind-orders']);
            });
    }


}
