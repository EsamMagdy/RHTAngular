import { Component, OnInit } from '@angular/core';
import { FooterLoaderService } from '../shared/services/footerLoaderAfterView.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private footerLoaderService: FooterLoaderService) {
    this.footerLoaderService.footer.emit();
  }

  ngOnInit(): void {
  }

}
