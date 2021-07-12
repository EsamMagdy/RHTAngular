import { Router, ActivatedRoute } from '@angular/router';
import { CustomerTicket } from './../../dashboard/dashboard.model';
import { NgForm } from '@angular/forms';
import { BaseQuickLookup } from './../../../shared/models/baseQuickLookup.model';
import { TicketService } from './../ticket.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ticket-creation',
  templateUrl: './ticket-creation.component.html',
  styleUrls: ['./ticket-creation.component.css']
})
export class TicketCreationComponent implements OnInit {
  @ViewChild('ticketForm') ticketForm: NgForm;
  sectors: BaseQuickLookup[];
  selectedSectors: BaseQuickLookup;
  activeContracts: BaseQuickLookup[];
  selectedActiveContracts: BaseQuickLookup;
  ticketTypeGroup: BaseQuickLookup[];
  selectedTicketTypeGroup: BaseQuickLookup;
  ticketItems: BaseQuickLookup[];
  selectedTicketItems: BaseQuickLookup;
  showTicketItems = false;
  submitted = false;
  success = false;
  constructor(private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ticketService
      .getSectorType()
      .subscribe(data => this.sectors = data);

    this.ticketService
      .getActiveContracts()
      .subscribe(data => this.activeContracts = data);

    this.ticketService
      .getTicketTypeGroup()
      .subscribe(data => this.ticketTypeGroup = data);
  }
  getTicketItem() {
    this.showTicketItems = (this.selectedSectors != null && this.selectedTicketTypeGroup != null);
    this.ticketService
      .getTicketTypeItems(
        this.selectedSectors.key,
        this.selectedTicketTypeGroup.key)
      .subscribe(resData => this.ticketItems = resData);
  }
  onCreateTicket() {
    this.submitted = true;
    if (!this.ticketForm.valid) return;


    let ticket = { ...this.ticketForm.value } as CustomerTicket;
    ticket.ticketingGroupId = this.selectedTicketTypeGroup.key;
    ticket.sectorType = +this.selectedSectors.key;
    ticket.ticketingTypeId = this.selectedTicketItems.key;

    this.ticketService.createCustomerTicket(ticket).subscribe(data => {
      if (data) {
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/dashboard/ticket']);

        }, 5000);
      }

    });
  }
  cancelTicket() {
    this.ticketForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
