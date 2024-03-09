import { Component, ElementRef, OnInit, ViewRef } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
 

  constructor(private el:ElementRef) { }

  ngOnInit() {
  }



}
