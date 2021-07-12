import { FooterLoaderService } from './../shared/services/footerLoaderAfterView.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  showFooter = false;
  constructor(private footerLoaderService: FooterLoaderService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.footerLoaderService.footer.subscribe(() => {
     
      this.showFooter = true;
      // this.changeDetector.detectChanges();
    })
  }

}
