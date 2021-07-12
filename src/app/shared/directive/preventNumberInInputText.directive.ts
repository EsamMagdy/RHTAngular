import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[appCheckNumberInInputText]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: PreventNumberInInputTextDirective,
            multi: true,
        },
    ],
})
export class PreventNumberInInputTextDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {
        const re = /^(05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
        let val = control.value;
        let code = val.charCodeAt(0);

        if (code == 32 || (code > 47 && code < 58) || (code > 95 && code < 107))
            return { notText: true };

        return null;

    }
}
