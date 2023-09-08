import { Directive , ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appClick]'
})
export class ClickDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.cursor = 'pointer';
  }
  
  @Input('appClick') routerLink: string;

  @HostListener('click', ['$event.target'])
  onclick() {
    this.router.navigateByUrl(routerLink);
  };
}