import { Component, OnInit } from '@angular/core';
import { Lead } from '../dashboard.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-last-requests',
  templateUrl: './last-requests.component.html',
  styleUrls: ['./last-requests.component.css']
})
export class LastRequestsComponent implements OnInit {
  lead: Lead;
  constructor(private dashboradService: DashboardService) { }

  ngOnInit(): void {
    this.dashboradService.getLastLead(1,1).subscribe(lead => {
      
      this.lead = lead.model[0];
    });
  }

}
