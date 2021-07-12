import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
    submitted = false;
    registrationMessage: string;
    isRegister = true;
    success = false;
    error: string = null;
    @ViewChild('registerForm') registerForm: NgForm;
    constructor(private authService: AuthService,
        private router: Router) { }
    ngOnInit(): void { }
    value3: string;
    displayModal: boolean;
    Register() {
        this.submitted = true;

        if (!this.registerForm.valid) return;

        this.error = null;

        this.authService
            .register(this.registerForm.value)
            .subscribe((resData) => {

                if (!resData.state && resData.message) {
                    this.error = resData.message[0].value;
                    return;
                }

                this.router.navigate(['/auth/verify-code']);
                this.submitted = false;
                this.registerForm.reset();
            });
    }
}