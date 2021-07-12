import { IndividualContract } from './../../../shared/models/individualContract.model';
import { ContractsService } from './../contracts.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Params } from "@angular/router";

@Component({
    selector: 'app-contract-details',
    templateUrl: './contract-details.component.html',
    styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {
    individualContract: IndividualContract
    constructor(private route: ActivatedRoute,
        private contractsService: ContractsService) { }

    ngOnInit(): void {
        console.log('details');
        this.route.data.subscribe((data: Data) => {
            this.individualContract = data['details'];
            console.log(this.individualContract);
            
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
