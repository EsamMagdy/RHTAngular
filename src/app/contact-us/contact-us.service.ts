import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ContactUsInterface } from './contact-us.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class ContactUsService {
    constructor(private http: HttpClient) { }

    sendMessage(contactUs: ContactUsInterface) {
        return this.http
            .post<{
                state: boolean,
                data: {
                    value: boolean,
                    data: any
                },
                message: any
            }>(
                environment.apiUrl + 'General/ContactUs',
                contactUs
            )
            .pipe(
                map((resData) => {
                    return resData.data;
                })
            );
    }
}