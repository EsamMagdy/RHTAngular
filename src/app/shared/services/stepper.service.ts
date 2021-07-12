import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StepperService {
    isLinear = new Subject<boolean>();
}