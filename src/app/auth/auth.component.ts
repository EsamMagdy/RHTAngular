import { Component } from "@angular/core";
import { FooterLoaderService } from "../shared/services/footerLoaderAfterView.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    constructor(private footerLoaderService: FooterLoaderService) {
        this.footerLoaderService.footer.emit();
      }
 }