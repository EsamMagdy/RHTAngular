import { LocalStorageService } from './../../shared/services/localStorage.service';
import { UserData } from './../../shared/models/userData.model';
import { Component, OnInit } from "@angular/core";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-mobile-user-menu',
    templateUrl: 'mobile-user-menu.component.html',
    styleUrls: ['mobile-user-menu.component.css']

})
export class MobileUserMenuComponent implements OnInit {
    user: UserData;
    constructor(private localStorageService: LocalStorageService,
        private authService: AuthService) { }
    ngOnInit(): void {
        this.user = this.localStorageService.userLocalStorage;
    }

    onLogout() {
        this.authService.logout();
    }
}