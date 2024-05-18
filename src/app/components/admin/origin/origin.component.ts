import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { PagenationEnum } from 'src/app/helpers/pagenation';
import { OriginModel } from 'src/app/models/origin';
import { OriginService } from 'src/app/services/origin.service';
import { Location } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CodeEnum } from 'src/app/helpers/code';

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css','../admin.component.css']
})
export class OriginComponent implements OnInit {

  searchSubject = new Subject<string>();
  message:string = "";

  originList:OriginModel[] = [];
  currentPageNumber!:number;
  totalPageNumber!:number;
  sortBy!:string;
  sortDir!:string;
  offset!:number;
  search!:string;

  constructor(private location: Location,private router: Router,private route:ActivatedRoute,private originService:OriginService) { }

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
        return this.originService.getOriginList(search,this.currentPageNumber,this.offset,this.sortBy,this.sortDir);
      })
    ).subscribe(result =>{
      if(result.code == CodeEnum.SUCCESS){
        this.currentPageNumber = result.data.pageNumber + 1;
        this.originList = result.data.content;
        this.totalPageNumber = result.data.totalPages;
      }
    })
  }

  loadingData():void{
    this.originService.getOriginList(this.search,this.currentPageNumber,this.offset,this.sortBy,this.sortDir).subscribe(
      {
        next:value =>{
          if(value.code == CodeEnum.SUCCESS){
            this.currentPageNumber = value.data.pageNumber + 1;
            this.originList = value.data.content;
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
        this.location.go('/management/origin',`page=${this.currentPageNumber}`);
      } else{
        this.location.go('/management/origin',`search=${this.search}?page=${this.currentPageNumber}`);
      }
      this.loadingData();  
    
    }
  }

  findOriginName($event: KeyboardEvent):void{
    const element = $event.target as HTMLInputElement;
    this.searchSubject.next(element.value);
  }

  trackByFn(index:number, item:OriginModel) {
    return item.id;
  }

  checked(isChecked: boolean, origin:OriginModel):void {
    if(isChecked){
      this.originService.deleteOrigin(origin.id).subscribe({
        next:value=>{
            if(value.code == CodeEnum.SUCCESS){
              this.message = value.message;
              this.originList = this.originList.filter(item => item.id !== origin.id);
              if(this.originList.length == 0){
                if(this.currentPageNumber != 1){
                  this.currentPageNumber = this.currentPageNumber - 1;
                }
                this.location.go('/management/origin',`page=${this.currentPageNumber}`);
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
