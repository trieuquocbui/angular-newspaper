import { Component, ElementRef, Input, OnInit, ViewRef } from '@angular/core';
import { AppEnum } from 'src/app/helpers/app';
import { NewspaperModel } from 'src/app/models/newspaper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input('list') newspaperList:NewspaperModel[] = [];
  
  imageList:string[] = [];
  
  pathImageFile:String = AppEnum.PATH_IMAGE_FIME;

  constructor() { }

  ngOnInit() {
    if(this.newspaperList.length > 0){
      this.newspaperList.forEach((newspaper,index) =>{
        const imageName = newspaper.paragraphs.find(paragraph => paragraph.thumbnail != null)?.thumbnail;
        imageName && this.imageList.push(this.pathImageFile + imageName);
      })
    }
  }



}
