import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";
@Directive({
    selector: '[activePackage]'
})
export class ActivePackage implements OnInit {
    @HostBinding('style.backgroundColor') backgroundColor: string
    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
    ngOnInit() { }
    @HostListener('click') mouseover(eventData: Event) {
        let divParentElement = this.elementRef.nativeElement.parentElement.getElementsByClassName('p-panel-content');
        for (let iterator of divParentElement) {
            iterator.style.backgroundColor = null;
            iterator.style.color = null;
            for (const s of iterator.getElementsByClassName('color-7a2cb3')) {
                s.style.color = null;
            }
        }
        for (const iterator of this.elementRef.nativeElement.getElementsByClassName('color-7a2cb3')) {
            iterator.style.color = 'black';
        }
        this.renderer.setStyle(this.elementRef.nativeElement.children[0].children[1].children[0], 'backgroundColor', '#e6e6e6');
        this.renderer.setStyle(this.elementRef.nativeElement.children[0].children[1].children[0], 'color', '#7a2cb3');
    }
}