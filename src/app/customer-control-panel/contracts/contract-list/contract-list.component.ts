import { CustomerControlPanelService } from './../../customer-control-panel.service';
import { Component, OnInit } from "@angular/core";
import { IndividualContract } from 'src/app/shared/models/individualContract.model';
import { ContractsService } from '../contracts.service';

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
    totalCount: number;
    pageNumber: number = 1;
    pageSize: number = 5;
    individualContract: IndividualContract[];

    constructor(private contractsService: ContractsService) { }

    ngOnInit(): void {
        this.getAllContracts(this.pageNumber, this.pageSize);
    }
    paginate(event: number) {
        this.pageNumber=event;
        this.getAllContracts(event, this.pageSize);
    }
    getAllContracts(pageNumber: number, pageSize: number) {
        this.contractsService.getAllContracts(pageNumber, pageSize)
            .subscribe(data => {
                console.log(data.totalCount);
                
                this.totalCount = data.totalCount;
                this.individualContract = data.model;
            });
    }

}
