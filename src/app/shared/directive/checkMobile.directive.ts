import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appCheckMobile]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CheckMobileDirective,
      multi: true,
    },
  ],
})
export class CheckMobileDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const re = /^(05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

    if (
      control &&
      control.value &&
      !re.test(String(control.value).toLowerCase())
    ) {
      return { notMobile: true };
    }
    return null;
  }
}
