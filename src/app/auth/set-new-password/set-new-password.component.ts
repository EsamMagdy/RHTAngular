import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'app-set-new-password',
    templateUrl: './set-new-password.component.html',
    styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent {
    @ViewChild('passResetForm') passResetForm: NgForm;
    submitted = false;
    error = '';
    constructor(private authService: AuthService,
        private router: Router) { }
    setNewPassword() {
        this.submitted = true;
        if (!this.passResetForm.valid) return;

        let vm = { ...this.passResetForm.value };
        this.authService
            .resetPassword(vm)
            .subscribe(resData => {
                this.error = '';
                if (resData.state && resData.data)
                    this.router.navigate(['/auth/login']);

                if (!resData.state && resData.message)
                    this.error = resData.message[0].value;
            });
    }
}