import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen: boolean = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click') toggleOpen(eventData: Event){
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

}
