import { Component } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { UserData } from "src/app/shared/models/userData.model";
import { LocalStorageService } from "src/app/shared/services/localStorage.service";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {
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