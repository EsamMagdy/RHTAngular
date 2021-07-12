import { Component, OnInit } from '@angular/core';
import { CustomerControlPanelService } from '../customer-control-panel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private customerControlPanelService: CustomerControlPanelService) { }

  ngOnInit(): void {
  }

}
