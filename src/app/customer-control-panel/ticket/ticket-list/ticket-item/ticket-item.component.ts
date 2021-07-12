import { CustomerTicket } from './../../../dashboard/dashboard.model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent implements OnInit {
 @Input('tickets') tickets:CustomerTicket[];
 @Input('pageNumebrs') pageNumebr: number;
 @Input('totalCounts') totalCount: number;
 @Input('pageSizes') pageSize: number;
  constructor() { }

  ngOnInit(): void {
  }

}
