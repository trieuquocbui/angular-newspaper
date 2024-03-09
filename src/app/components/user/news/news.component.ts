import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  position = 0;
  isDragging = false;
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4','Item 4','Item 4','Item 4','Item 4','Item 4','Item 4','Item 4'];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

}
