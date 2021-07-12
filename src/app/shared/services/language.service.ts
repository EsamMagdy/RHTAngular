import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { languageLocalStorageKey, Languages } from '../models/languages.model';

@Injectable({ providedIn: 'root' })
export class LanguageSerive {
    lang = new Subject<LanguagesEnum>();
    constructor() { }
    get language() {
        return localStorage.getItem(languageLocalStorageKey) ?? Languages.arabic;
    }
}
export enum LanguagesEnum {
    English = 0,
    Arabic = 1,
}

