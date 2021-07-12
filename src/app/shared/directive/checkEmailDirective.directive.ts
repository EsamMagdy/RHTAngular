import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";



@Directive({
  selector: '[appCheckEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CheckEmailDirective,
      multi: true,
    },
  ],
})
export class CheckEmailDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } | null {

    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    
    if(control&&!re.test(String(control.value).toLowerCase())){
      return{'notEmail':true}
    }
    return null;
  }
}
