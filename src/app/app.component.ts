import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgwWowService } from 'ngx-wow';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Languages } from './shared/models/languages.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'RHTAngular';
  direction: string;
  Languages = Languages;
  lang: any;
  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private wowService: NgwWowService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit() {
    // this.translateService.setDefaultLang('ar');
    // this.translateService.addLangs(['en', 'ar']);
    // this.loadStyle('RTLBootstrap.css');
    // this.loadStyle('RHTStyle.css');

    // setTimeout(() => {

    // }, 10000);
    this.initAnimationOnScroll();

    this.loadStylesBasedOnLanguage();
    // this.initAnimationOnScroll();

    // this.loadStylesBasedOnLanguage();

    this.authService.autoLogin();
  }
  private loadStylesBasedOnLanguage() {
    let lang = localStorage.getItem('lang');
    if (lang && lang == 'ar') {
      this.translateService.use(lang);
      document.querySelector('link[rel="stylesheet"][href^="Bootstrap"]').remove();
      document.querySelector('link[rel="stylesheet"][href^="RHTStyle"]').remove();
      //      for development
      // this.loadStyle('RTLBootstrap.css');
      // this.loadStyles('RTLRHTStyle.css');

      //      for production
      // this.loadStyle('RTLBootstrap.ab29094ebc91ae1c5dd3.css');
      // this.loadStyles('RTLRHTStyle.1aa783dc4505dce4d5be.css');

      this.direction = 'rtl';
      // this.loadStyles('/assets/css/rtl/bootstrap.min.css');
    } else if (lang && lang == 'en') {
      this.translateService.use(lang);
      document.querySelector('link[rel="stylesheet"][href^="RTLBootstrap"]').remove();
      document.querySelector('link[rel="stylesheet"][href^="RTLRHTStyle"]').remove();
      //      for development
      // this.loadStyle('Bootstrap.css');
      // this.loadStyles('RHTStyle.css');

      //      for production
      // this.loadStyle('Bootstrap.a16d6b2cb82516868a8b.css');
      // this.loadStyles('RHTStyle.de225378483db3de2c96.css');

      this.direction = 'ltr';
    } else {
      this.translateService.use('ar');
      document.querySelector('link[rel="stylesheet"][href^="Bootstrap"]').remove();
      document.querySelector('link[rel="stylesheet"][href^="RHTStyle"]').remove();
      //      for development
      // this.loadStyle('RTLBootstrap.css');
      // this.loadStyles('RTLRHTStyle.css');

      //      for production
      // this.loadStyle('RTLBootstrap.ab29094ebc91ae1c5dd3.css');
      // this.loadStyles('RTLRHTStyle.1aa783dc4505dce4d5be.css');

      this.direction = 'rtl';
      localStorage.setItem('lang', 'ar');
    }
    const htmlTag = document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir = this.direction;
    htmlTag.lang = lang ?? 'ar';
    this.lang = lang ?? 'ar';
  }
  private initAnimationOnScroll() {
    this.router.events.subscribe((event) => {
      if (isPlatformBrowser(this.platformId)) {
        window.scroll(0, 0);
        this.wowService.init(); // Load WoW animations when done navigating to page
      }
    });
  }
  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }

  loadStyles(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme-style'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme-style';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }
}
