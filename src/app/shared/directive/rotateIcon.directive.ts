import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[rotateIcon]'
})
export class RotateIcon {
    @HostBinding('style.backgroundColor') backgroundColor: string
    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
    @HostListener('click') mouseover(eventData: Event) {
        let divParentElement = this.elementRef.nativeElement.parentElement.getElementsByClassName('pi');
        if (this.elementRef.nativeElement.classList.contains('collapsed'))
            this.renderer.setStyle(divParentElement[0], 'transform', 'rotate( 0deg)');
        else
            this.renderer.setStyle(divParentElement[0], 'transform', 'rotate( 180deg)');

    }
}