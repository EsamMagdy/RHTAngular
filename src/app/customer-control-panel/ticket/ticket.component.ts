import { CustomerControlPanelService } from './../customer-control-panel.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageKeys } from 'src/app/shared/models/localStorage.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(private customerControlPanelService: CustomerControlPanelService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    debugger;
    let lang = localStorage.getItem(LocalStorageKeys.language);
    this.translateService.use(lang);
  }

}
