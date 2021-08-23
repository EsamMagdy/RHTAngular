import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKeys } from '../shared/models/localStorage.model';
import { FooterLoaderService } from '../shared/services/footerLoaderAfterView.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  constructor(private footerLoaderService: FooterLoaderService,
    private translateService: TranslateService) {
    this.footerLoaderService.footer.emit();
  }

  ngOnInit(): void {
    let lang = localStorage.getItem(LocalStorageKeys.language);
    this.translateService.use(lang);
  }

}
