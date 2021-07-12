import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CallingAPI {
    lang: string;
    constructor(private http: HttpClient) {
        this.lang = localStorage.getItem('lang') ?? 'ar';
    }


    httpGet<T>(controllerName: string, actionName: string, returnModel: T) {
        //return this.http.get<T>(environment.apiUrl+ `${controllerName}+`/`+GetIndvCities`);
    }
    httpPost<T>(controllerName: string, actionName: string, returnModel: T) { }
    googleMapURL(url: string) { }
}