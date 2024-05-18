import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, interval, Subject, switchMap } from 'rxjs';
import { PagenationEnum } from 'src/app/helpers/pagenation';
import { TopicModel } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { Location } from '@angular/common';
import { CodeEnum } from 'src/app/helpers/code';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css','../admin.component.css']
})
export class TopicComponent implements OnInit {

  searchSubject = new Subject<string>();
  message:string = "";

  topicList:TopicModel[] = [];
  currentPageNumber!:number;
  totalPageNumber!:number;
  sortBy!:string;
  sortDir!:string;
  offset!:number;
  search!:string;

  constructor(private location: Location,private router: Router,private route:ActivatedRoute,private topicService:TopicService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) =>{
      this.search = params['search'] || "";
      this.currentPageNumber = params['page'] || PagenationEnum.DEFAULT_PAGE;
      this.offset = params['offset'] || PagenationEnum.DEFAULT_LIMIT;
      this.sortBy = params['sortBy'] || PagenationEnum.DEFAULT_SORTBY;
      this.sortDir = params['sortDir'] || PagenationEnum.DEFAULT_SORTDIR;
      this.loadingData();
    })

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(search => {
        this.search = search;
        if(this.search != ""){
          this.location.go('/management/topic',`search=${search}?page=${this.currentPageNumber}`);
        }
        return this.topicService.getTopicList(search,this.currentPageNumber,this.offset,this.sortBy,this.sortDir);
      })
    ).subscribe(result =>{
      if(result.code == CodeEnum.SUCCESS){
        this.currentPageNumber = result.data.pageNumber + 1;
        this.topicList = result.data.content;
        this.totalPageNumber = result.data.totalPages;
      }
    })
  }

  loadingData():void{
    this.topicService.getTopicList(this.search,this.currentPageNumber,this.offset,this.sortBy,this.sortDir).subscribe(
      {
        next:value =>{
          if(value.code == CodeEnum.SUCCESS){
            this.currentPageNumber = value.data.pageNumber + 1;
            this.topicList = value.data.content;
            this.totalPageNumber = value.data.totalPages;
          }
        },
        error:err=>{
          
        }
      }
    )
  }

  pageChanged(page:string|number):void{
    if(typeof page === 'number'){
      this.currentPageNumber = page;
      if(this.search == ""){
        this.location.go('/management/topic',`page=${this.currentPageNumber}`);
      } else{
        this.location.go('/management/topic',`search=${this.search}?page=${this.currentPageNumber}`);
      }
      this.loadingData();  
    
    }
  }

  findTopicName($event: KeyboardEvent):void{
    const element = $event.target as HTMLInputElement;
    this.searchSubject.next(element.value);
  }

  trackByFn(index:number, item:TopicModel) {
    return item.id;
  }

  checked(isChecked: boolean, topic:TopicModel):void {
    if(isChecked){
      this.topicService.deleteTopic(topic.id).subscribe({
        next:value=>{
            if(value.code == CodeEnum.SUCCESS){
              this.message = value.message;
              this.topicList = this.topicList.filter(item => item.id !== topic.id);
              if(this.topicList.length == 0){
                if(this.currentPageNumber != 1){
                  this.currentPageNumber = this.currentPageNumber - 1;
                }
                this.location.go('/management/topic',`page=${this.currentPageNumber}`);
                this.loadingData();
              }
            }
        },
        error:err=>{
          const error = err.error;
          if(error.code == CodeEnum.ERROR_ENTITY_CANNOT_EDIT){
            this.message = error.message;
          }
        }
      })
    }

    setInterval(()=>{
        this.message = "";
    }, 3000)
  }

}
