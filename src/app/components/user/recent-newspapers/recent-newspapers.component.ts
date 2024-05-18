import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AppEnum } from 'src/app/helpers/app';
import { PagenationEnum } from 'src/app/helpers/pagenation';
import { NewspaperModel } from 'src/app/models/newspaper';
import { Params } from 'src/app/models/params';
import { NewspaperService } from 'src/app/services/newspaper.service';

@Component({
  selector: 'app-recent-newspapers',
  templateUrl: './recent-newspapers.component.html',
  styleUrls: ['./recent-newspapers.component.css']
})
export class RecentNewspapersComponent implements OnInit {
  page:number = PagenationEnum.DEFAULT_PAGE;
  offset:number = PagenationEnum.DEFAULT_LIMIT;
  pathImage:string = AppEnum.PATH_IMAGE_FIME;
  sortBy!:string;
  sortDir!:string;
  value!:string;
  newspaperList!:NewspaperModel[];
  imageList:string[] = [];
  inputEle!:HTMLInputElement;
  show:boolean = false;

  constructor(private newspaperService:NewspaperService) { }
  
  select(event:Event){
    this.imageList = [];
    this.inputEle = event.target as HTMLInputElement;
    const params: Params = {
      page:this.page,
      limit:this.offset,
      date:this.inputEle.value
    }
    this.newspaperService.getNewspaperList(params).subscribe({
      next:value =>{
        this.newspaperList = value.data.content;
        if(value.data.lastPage){
          this.show = false;
        }else{
          this.show = true;
        }
        this.newspaperList.forEach(newspaper => {
          const imageName = newspaper.paragraphs.find(paragraph => paragraph.thumbnail != null)!.thumbnail!;
          this.imageList.push(this.pathImage + imageName);
        })
      }
    })
  }

  showNewspaper(){
    this.page = this.page + 1;
    const params: Params = {
      page:this.page,
      limit:this.offset,
      date:this.inputEle.value
    }
    this.newspaperService.getNewspaperList(params).subscribe({
      next:value =>{
        if(value.data.lastPage){
          this.show = false;
        }else{
          this.show = true;
        }
        this.newspaperList.push(...value.data.content);
        value.data.content.forEach(newspaper => {
          const imageName = newspaper.paragraphs.find(paragraph => paragraph.thumbnail != null)!.thumbnail!;
          this.imageList.push(this.pathImage + imageName);
        })
      }
    })
  }

  trackByFn(index:number,item:NewspaperModel){
    return item.id;
  }

  ngOnInit() {
    const newDate = new Date();
    const date = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
    const params: Params = {
      page:this.page,
      limit:this.offset,
      date:date
    }
    this.newspaperService.getNewspaperList(params).subscribe({
      next:value =>{
        if(value.data.lastPage){
          this.show = false;
        }else{
          this.show = true;
        }
        this.newspaperList = value.data.content;
        this.newspaperList.forEach(newspaper => {
          const imageName = newspaper.paragraphs.find(paragraph => paragraph.thumbnail != null)!.thumbnail!;
          this.imageList.push(this.pathImage + imageName);
        })
      }
    })
  }
}
