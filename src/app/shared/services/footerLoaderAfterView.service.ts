import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FooterLoaderService {
    public footer = new EventEmitter<any>();
}