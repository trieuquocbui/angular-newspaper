import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone:true
})
export class DropdownDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click')
  onClick(){
    const lastChild = this.el.nativeElement.lastElementChild;
    if(lastChild.style.display === "none" || lastChild.style.display === ""){
      lastChild.style.display = "block";
    } else{
      lastChild.style.display = "none";
    }
  }

}
