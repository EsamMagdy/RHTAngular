import { FooterLoaderService } from './../shared/services/footerLoaderAfterView.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  showFooter = false;
  makeItFixed = false;
  year: number;

  constructor(
    private footerLoaderService: FooterLoaderService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();

    this.footerLoaderService.footer.subscribe(() => {
      this.showFooter = true;
      // this.changeDetector.detectChanges();
    });
  }
  ngAfterViewChecked() {
    this.isPageCoverWindow();
  }

  isPageCoverWindow() {
    let windowHeight = window.innerHeight;
    // body height
    let height = document.body.clientHeight;

    if (height > windowHeight) {
      this.makeItFixed = false;
    } else {
      this.makeItFixed = true;
    }
  }
}
