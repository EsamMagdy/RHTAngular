import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CheckConnectionService {
    isConnected = new Subject<boolean>();
    constructor() { }
}