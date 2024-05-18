import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { PagenationEnum } from 'src/app/helpers/pagenation';
import { NewspaperModel } from 'src/app/models/newspaper';
import { Params } from 'src/app/models/params';
import { NewspaperService } from 'src/app/services/newspaper.service';

@Component({
  selector: 'app-newspaper-list',
  templateUrl: './newspaper-list.component.html',
  styleUrls: ['./newspaper-list.component.css']
})
export class NewspaperListComponent implements OnInit, OnChanges {
  allNewspaper:NewspaperModel[] = [];
  imageList:string[] = [];
  pathImageFile:String = AppEnum.PATH_IMAGE_FIME;

  @Input("topicName") topicName:string = AppEnum.DEFAULT_ALL;
  @Input("originName") originName:string = AppEnum.DEFAULT_ALL;
  @Input("search") search!:string;
  searchSubject = new Subject<string>();
  show:boolean = false;
  
  topic:string = AppEnum.DEFAULT_ALL;
  origin:string = AppEnum.DEFAULT_ALL;
  page:number = PagenationEnum.DEFAULT_PAGE;
  offset:number = PagenationEnum.DEFAULT_LIMIT;
  sortBy:string = PagenationEnum.DEFAULT_SORTBY_DATE;
  sortDir:string = PagenationEnum.DEFAULT_SORTDIR;

  constructor(private newspaperService:NewspaperService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.search != undefined && this.search != ""){
      this.searchSubject.next(this.search);
    } else{
      let check = false;
      if( this.topic != this.topicName){
        check = true;
      }
      if( this.origin != this.originName){
        check = true;
      }
      this.topic = this.topicName.trim();
      this.origin = this.originName.trim();
      this.getDate(check);
    }
  }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(search => {
        const params:Params={
          search:search,
          limit: 10
        }
        return this.newspaperService.getNewspaperList(params);
      })
    ).subscribe(result =>{
        this.imageList = [];
        this.allNewspaper = result.data.content;
        this.allNewspaper.forEach((newspaper) =>{
          const imageName = newspaper.paragraphs.find(paragraph => paragraph.thumbnail != null)?.thumbnail;
          imageName && this.imageList.push(this.pathImageFile + imageName);
        })
    })
  }

  getDate(check:boolean){
    const params: Params ={
      page: this.page,
      limit: this.offset,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      topic : this.topic,
      origin: this.origin,
    }
    this.newspaperService.getNewspaperList(params).subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          if(check){
            this.page = 1;
            this.imageList = [];
            this.allNewspaper = value.data.content;
            this.allNewspaper.forEach((newspaper) =>{
              const imageName = newspaper.paragraphs.find(paragraph => paragraph.thumbnail != null)?.thumbnail;
              imageName && this.imageList.push(this.pathImageFile + imageName);
            })
          } else{
            this.page = this.page + 1;
            this.allNewspaper.push(...value.data.content);
            value.data.content.forEach((newspaper) =>{
              const imageName = newspaper.paragraphs.find(paragraph => paragraph.thumbnail != null)?.thumbnail;
              imageName && this.imageList.push(this.pathImageFile + imageName);
            })
          }
          if(!value.data.lastPage){
            this.show = true;
          }else{
            this.show = false;
          }
        }
      }
    })
  }

  showNewspaper(){
    ++this.page;
    this.getDate(false);
  }

}
