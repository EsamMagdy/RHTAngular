import { TicketService } from './../ticket.service';
import { CustomerTicket } from './../../dashboard/dashboard.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  totalCount: number = 0;
  pageNumber: number = 1;
  pageSize: number = 5;
  tickets: CustomerTicket[];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {

    this.getAllTickets(this.pageNumber, this.pageSize);
  }

  paginate(event: number) {
    this.getAllTickets(event, this.pageSize);
  }
  getAllTickets(pageNumber: number, pageSize: number) {
    this.ticketService.getAllTickets(pageNumber, pageSize)
      .subscribe(data => {
        this.totalCount = data.data.length;
        this.tickets = data.data;
      });
  }

}
