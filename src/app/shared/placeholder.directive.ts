import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
