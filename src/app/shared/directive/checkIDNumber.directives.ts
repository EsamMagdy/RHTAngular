import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appCheckIDNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CheckIDNumberDirective,
      multi: true,
    },
  ],
})
export class CheckIDNumberDirective implements Validator {
  @Input('appCheckIDNumber') saudiNationality: string;
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  validate(control: AbstractControl): { [key: string]: any } | null {

    if (this.saudiNationality == 'hasValue') return null;

    if (!this.saudiNationality) {
      this.renderer.setProperty(this.elRef.nativeElement, 'value', '');
      return { chooseNationalityFirst: true };
    }



    let isSaudi = this.saudiNationality == '1e0ff838-292f-e311-b3fd-00155d010303';
    let re: RegExp = null;
    re = isSaudi
      ? /^1\d*$/
      : /^2\d*$/;

    if (
      control &&
      control.value &&
      isSaudi &&
      !re.test(String(control.value).toLowerCase())
    ) {
      return { notSaudi: true };
    }
    if (control &&
      control.value &&
      !isSaudi &&
      !re.test(String(control.value).toLowerCase())) {
      return { notOthers: true };
    }
    return null;
  }
}
