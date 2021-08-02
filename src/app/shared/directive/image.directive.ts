import { Directive, ElementRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appCheckImage]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CheckImageDirective,
      multi: true,
    },
  ],
})
export class CheckImageDirective implements Validator {
  constructor(private elementRef: ElementRef) {}
  validate(control: AbstractControl): { [key: string]: any } | null {
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if(control&&){
    //   return{'notImage':true}
    // }
    let element = this.elementRef.nativeElement;
    const file = element.files[0];
    const fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
      return { notImage: true };
    }
    return null;
  }
}
