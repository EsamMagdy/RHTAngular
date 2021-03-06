import { UserData } from './../shared/models/userData.model';
import { LocalStorageService } from './../shared/services/localStorage.service';
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { CustomerControlPanelService } from './customer-control-panel.service';
import { FooterLoaderService } from '../shared/services/footerLoaderAfterView.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKeys } from '../shared/models/localStorage.model';

@Component({
  selector: 'app-customer-control-panel',
  templateUrl: './customer-control-panel.component.html',
  styleUrls: ['./customer-control-panel.component.css']
})
export class CustomerControlPanelComponent implements OnInit, AfterContentChecked {
  constructor(private customerControlPanelService: CustomerControlPanelService,
    private cdr: ChangeDetectorRef,
    private footerLoaderService: FooterLoaderService,
    private translateService:TranslateService) {
    this.footerLoaderService.footer.emit();
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
    debugger;
    let lang = localStorage.getItem(LocalStorageKeys.language);
    this.translateService.use(lang);
    console.log('parent component');

  }


}
