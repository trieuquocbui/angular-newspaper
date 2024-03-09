import { query } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSliderDirective]'
})
export class SliderDirective {

  private isDraging:boolean = false;

  private slider!:HTMLElement;

  private slider_list!:HTMLElement;

  private items!:NodeListOf<HTMLElement>;

  private xPoint!:number;

  private boxSize:number = 172.88;

  private valueTranslateX!:number;

  constructor() { }

  getValueTranslateX():number {
    if(this.isDraging){
      let match = this.slider_list.style.transform.match(/translateX\(([-\d]+)px\)/);
    return match ? Number(match[1]) : 0;
    }
    return 0;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.slider = document.querySelector(".slider")!;
    this.slider_list = document.querySelector(".slider_list")!;
    this.items = this.slider_list.querySelectorAll(".slider_list_item");
    this.slider_list.style.pointerEvents = "auto";
    this.isDraging = true;
    this.xPoint = event.clientX;
    this.valueTranslateX = this.getValueTranslateX();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if(this.isDraging){
      let move = this.xPoint - event.clientX - this.valueTranslateX;
      this.slider_list.style.transform = `translateX(${-move}px)`;
      this.slider_list.style.transition = `transform 200ms ease 0s`;
      if(this.getValueTranslateX() > 0){
        this.slider_list.style.transform = `translateX(${0}px)`;
        this.slider_list.style.transition = `transform 200ms ease 0s`;
      }
      let limit = -Math.floor((this.boxSize * (this.items.length - 5)))
      if(this.getValueTranslateX() < limit){
        this.slider_list.style.transform = `translateX(${limit}px)`;
        this.slider_list.style.transition = `transform 200ms ease 0s`;
      }
    }
  }

  @HostListener('window:mouseup',['$event'])
  onMouseUpWindow(): void {
    if(this.isDraging){
      this.isDraging = false;
      this.slider.style.pointerEvents = "none";
      this.items.forEach(el => el.style.pointerEvents = "auto")
    }
  }

}
