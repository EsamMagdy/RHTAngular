import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";



@Directive({
    selector: '[appCheckOtherOrdersDetails]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: CheckOtherOrdersDetailsDirective,
            multi: true,
        },
    ],
})
export class CheckOtherOrdersDetailsDirective implements Validator {

    validate(control: AbstractControl): { [key: string]: any } | null {



        return null;
    }
}
