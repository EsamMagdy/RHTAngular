import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageKeys } from "../shared/models/localStorage.model";
import { FooterLoaderService } from "../shared/services/footerLoaderAfterView.service";
import { TranslationService } from "../shared/services/translation.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    constructor(private footerLoaderService: FooterLoaderService,
        private translationsService: TranslationService,
        private translateService: TranslateService) {
        this.footerLoaderService.footer.emit();
    }
    ngOnInit(): void {
        debugger;
        let lang = localStorage.getItem(LocalStorageKeys.language);
        this.translateService.use(lang);
    }
}