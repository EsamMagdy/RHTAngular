import { CustomerControlPanelService } from './../customer-control-panel.service';
import { IndividualContractReq } from './../../shared/models/individualContractReq.model';
import { Component, OnInit } from '@angular/core';
import { IndOrdersService } from './ind-orders.service';

@Component({
  selector: 'app-ind-orders',
  templateUrl: './ind-orders.component.html',
  styleUrls: ['./ind-orders.component.css']
})
export class IndOrdersComponent implements OnInit {
  indContractRequests: IndividualContractReq[];
  totalCount: number;
  pageNumber: number = 1;
  pageSize: number = 5;

  constructor(private indOrdersService: IndOrdersService,
    private customerControlPanelService:CustomerControlPanelService) { }

  ngOnInit(): void {

    this.getAllContractRequests(1, 5);
  }

  paginate(event: { page: number, first: number, rows: number, pageCount: number }) {
    event.page += 1;
    this.getAllContractRequests(event.page, 5);

  }
  getAllContractRequests(pageNumber: number, pageSize: number) {
    this.indOrdersService.getAllIndRequests(pageNumber, pageSize).subscribe(data => {
      this.totalCount = data.totalCount;
      this.indContractRequests = data.model;
    
    });
  }


}
