import { LocalStorageService } from './../../../shared/services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Dashboard } from '../dashboard.model';

@Component({
  selector: 'app-dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.css']
})
export class DashboardInfoComponent implements OnInit {
  dashboard: Dashboard;
  constructor(private dashboardInfoService: DashboardService,
    ) {
      this.dashboardInfoService.getDashborad().subscribe(data => {
        this.dashboard = data;
      });
     }

  ngOnInit() {

    this.dashboardInfoService.getDashborad().subscribe(data => {
      this.dashboard = data;
    });
  }

}
