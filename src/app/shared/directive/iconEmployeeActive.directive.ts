import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[iconEmployeeActive]'
})
export class ActiveEmployeeIcon {
    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
    @HostListener('click') mouseover(eventData: Event) {
        let divParentElement = this.elementRef.nativeElement.parentElement.getElementsByClassName('iconClass');
        for (let iterator of divParentElement) {
            iterator.setAttribute('hidden',true);
        }
        this.renderer.removeAttribute(this.elementRef.nativeElement.getElementsByClassName('iconClass')[0], 'hidden');
    }
}