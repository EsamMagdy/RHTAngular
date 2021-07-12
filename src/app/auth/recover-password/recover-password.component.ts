import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from "@angular/core";

@Component({
    selector: 'app-recover-password',
    templateUrl: './recover-password.component.html',
})
export class RecoverPassword {
    @ViewChild('sendCodeForm') vForm: NgForm;
    submitted = false;
    error = '';
    constructor(private authService: AuthService,
        private router: Router) { }
    sendCode() {
        this.submitted = true;
        if (!this.vForm.valid) return;

        this.authService
            .forgotPassword(this.vForm.value.userName)
            .subscribe(resData => {
                if (resData.state && resData.data)
                    this.router.navigate(['/auth/set-new-password']);
                if (!resData.state && resData.message)
                    this.error = resData.message[0].value;
            });

    }

}