import { Component, Input, OnInit } from "@angular/core";
import { IndividualContract } from "src/app/shared/models/individualContract.model";
import { ContractsService } from "../../contracts.service";

@Component({
  selector: 'app-contract-item',
  templateUrl: './contract-item.component.html',
  styleUrls: ['./contract-item.component.css']
})
export class ContractItemComponent implements OnInit {

  @Input('pageNumebrs') pageNumebr: number;
  @Input('totalCounts') totalCount: number;
  @Input('pageSizes') pageSize: number;
  @Input('individualContract') individualContract: IndividualContract[];
  constructor() { }
  ngOnInit(): void {
  }
  
}
