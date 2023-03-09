import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMaskImage]',
})
export class MaskImageDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.mask = 'red';
  }
}
