import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactUsInterface } from './contact-us.model';
import { ContactUsService } from './contact-us.service';
import { FooterLoaderService } from '../shared/services/footerLoaderAfterView.service';
import { LocalStorageKeys } from '../shared/models/localStorage.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  constructor(private footerLoaderService: FooterLoaderService,
    private translateService: TranslateService) {
    this.footerLoaderService.footer.emit();
  }
  ngOnInit(): void {
    let lang = localStorage.getItem(LocalStorageKeys.language);
    this.translateService.use(lang);
  }

}
