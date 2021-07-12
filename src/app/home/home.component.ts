import { FooterLoaderService } from './../shared/services/footerLoaderAfterView.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { bounceInDownAnimation, bounceInUpAnimation } from 'angular-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    bounceInDownAnimation(),
    bounceInUpAnimation()
  ]
})
export class HomeComponent implements OnInit {
  animationState = false;
  animationWithState = false;
  constructor(private footerLoaderService: FooterLoaderService) {
    this.footerLoaderService.footer.emit();
  }

  ngOnInit(): void {
    // this.animationState = false;
    // setTimeout(() => {
    //   this.animationState = true;
    //   this.animationWithState = !this.animationWithState;
    // }, 1);
  }

}
