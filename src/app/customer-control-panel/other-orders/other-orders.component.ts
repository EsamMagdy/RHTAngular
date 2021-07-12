import { CustomerControlPanelService } from './../customer-control-panel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-orders',
  templateUrl: './other-orders.component.html',
  styleUrls: ['./other-orders.component.css']
})
export class OtherOrdersComponent implements OnInit {

  constructor(private customerControlPanelService:CustomerControlPanelService) { }

  ngOnInit(): void {
    
  }

}
