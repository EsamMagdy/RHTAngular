import { Component, OnInit } from '@angular/core';
import { FooterLoaderService } from '../shared/services/footerLoaderAfterView.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  constructor(private footerLoaderService: FooterLoaderService) {
    this.footerLoaderService.footer.emit();
  }

  ngOnInit(): void {
  }

}
