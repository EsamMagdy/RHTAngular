import { Lead } from './../../dashboard/dashboard.model';
import { OtherOrdersService } from './../other-orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-orders-list',
  templateUrl: './other-orders-list.component.html',
  styleUrls: ['./other-orders-list.component.css']
})
export class OtherOrdersListComponent implements OnInit {
  leads: Lead[];
  totalCount: number;
  pageNumber: number = 1;
  pageSize: number = 5;


  constructor(private otherOrdersService: OtherOrdersService) { }

  ngOnInit(): void {

    this.getAllLead(1, this.pageSize);
  }

  paginate(event: number) {
    console.log(event);
    this.pageNumber = event;
    this.getAllLead(event, this.pageSize);

}
  getAllLead(pageNumber: number, pageSize: number) {
    this.otherOrdersService.getAllLeads(pageNumber, pageSize).subscribe(data => {
      this.totalCount = data.totalCount;
      this.leads = data.model;
      console.log(this.leads);

    });
  }

}
