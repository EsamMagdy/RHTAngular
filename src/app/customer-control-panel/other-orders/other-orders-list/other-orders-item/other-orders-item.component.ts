import { Lead } from './../../../dashboard/dashboard.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-orders-item',
  templateUrl: './other-orders-item.component.html',
  styleUrls: ['./other-orders-item.component.css']
})
export class OtherOrdersItemComponent implements OnInit {
  @Input('leads') leads: Lead[];
  @Input('pageNumebrs') pageNumebr: number;
  @Input('totalCounts') totalCount: number;
  @Input('pageSizes') pageSize: number;
  constructor() { }

  ngOnInit(): void {
  }

}
