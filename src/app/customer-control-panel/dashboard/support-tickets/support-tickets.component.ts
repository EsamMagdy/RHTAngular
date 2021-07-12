import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { CustomerTicket } from '../dashboard.model';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.css']
})
export class SupportTicketsComponent implements OnInit {
  lastTicket: CustomerTicket;
  constructor(private dashboradService: DashboardService) { }

  ngOnInit(): void {
    this.dashboradService.getLastTicket(1, 1).subscribe(data => {
      this.lastTicket = data[0];
    });
  }

}
