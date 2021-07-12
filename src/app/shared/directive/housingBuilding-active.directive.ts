import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector:'[activeHousingBuilding]'
})
export class HousingBuildingActive {
    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
    @HostListener('click') mouseover(eventData: Event) {
        let divParentElement = this.elementRef.nativeElement.parentElement.getElementsByClassName('housingElementClass');
        for (let iterator of divParentElement) {
            iterator.style.backgroundColor = null;
            iterator.style.color = null;
        }
       
        this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', 'rgb(33 150 243)');
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    }

}