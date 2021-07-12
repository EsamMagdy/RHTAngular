import { CustomerControlPanelService } from './../customer-control-panel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(private customerControlPanelService:CustomerControlPanelService) { }

  ngOnInit(): void {

  }

}
