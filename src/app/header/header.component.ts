import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {  LanguagesEnum } from '../shared/services/language.service';
import { languageLocalStorageKey, Languages } from '../shared/models/languages.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  // isEnLang = 0;
  languageEnum = LanguagesEnum;
  language: LanguagesEnum=0;
  constructor(private authService: AuthService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.authService.userSb.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    let lang = localStorage.getItem(languageLocalStorageKey);
    if (lang && lang == Languages.arabic) this.language = 0;
    else this.language = 1;
  }
  onLogout() {
    this.authService.logout();
  }
  onChangeLanguage(lang: number) {
    if (lang == this.languageEnum.English) {
      // this.translateService.use('en');
      localStorage.setItem(languageLocalStorageKey, Languages.english);
      // this.language = this.languageEnum.Arabic;
    }
    else {
      localStorage.setItem(languageLocalStorageKey, Languages.arabic);
      // this.translateService.use('ar');
      // this.language = this.languageEnum.English;
    }
    location.reload();
  }
}
