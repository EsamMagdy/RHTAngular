import { ContactUsService } from './../contact-us.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from "@angular/core";
import { ContactUsInterface } from '../contact-us.model';

@Component({
    selector: 'app-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
    @ViewChild('contactUs') contactUsForm: NgForm;
    submitted = false;
    success = false;
    constructor(private contactUsService: ContactUsService) { }

    ngOnInit(): void {
    }
    submitMessage() {
        this.submitted = true;
        this.success = false;
        if (!this.contactUsForm.valid) return;

        let contactUs = { ...this.contactUsForm.value } as ContactUsInterface;

        this.contactUsService.sendMessage(contactUs).subscribe(data => {
            if (data.value) this.success = true;
        });

    }
    clearData() {
        this.contactUsForm.reset();
        this.submitted = false;
    }
}