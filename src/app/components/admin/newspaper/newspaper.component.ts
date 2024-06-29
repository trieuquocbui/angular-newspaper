import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { CodeEnum } from 'src/app/helpers/code';
import { Location } from '@angular/common';
import { NewspaperModel } from 'src/app/models/newspaper';
import { Router, ActivatedRoute } from '@angular/router';
import { OriginModel } from 'src/app/models/origin';
import { PagenationEnum } from 'src/app/helpers/pagenation';
import { NewspaperService } from 'src/app/services/newspaper.service';
import { Params } from 'src/app/models/params';


@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrls: ['./newspaper.component.css','../admin.component.css']
})
export class NewspaperComponent implements OnInit {
  searchSubject = new Subject<string>();
  message:string = "";

  newspaperList:NewspaperModel[] = [];
  currentPageNumber!:number;
  totalPageNumber!:number;
  sortBy!:string;
  sortDir!:string;
  offset!:number;
  search!:string;

  constructor(private location: Location,private router: Router,private route:ActivatedRoute, private newspaperService:NewspaperService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) =>{
      this.search = params['search'] || "";
      this.currentPageNumber = params['page'] || PagenationEnum.DEFAULT_PAGE;
      this.offset = params['offset'] || PagenationEnum.DEFAULT_LIMIT;
      this.sortBy = params['sortBy'] || PagenationEnum.DEFAULT_SORTBY;
      this.sortDir = params['sortDir'] || "desc";
      this.loadingData();
    })

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(search => {
        this.search = search;
        if(this.search != ""){
          this.location.go('/management/newspaper',`search=${search}?page=${this.currentPageNumber}`);
        }
        const params: Params = {
          page:this.currentPageNumber,
          limit:this.offset,
          sortBy:this.sortBy,
          sortDir:this.sortDir,
          search: this.search
        }
        return this.newspaperService.getNewspaperList(params);
      })
    ).subscribe(result =>{
      if(result.code == CodeEnum.SUCCESS){
        this.currentPageNumber = result.data.pageNumber + 1;
        this.newspaperList = result.data.content;
        this.totalPageNumber = result.data.totalPages;
      }
    })
  }

  loadingData():void{
    const params: Params = {
      page:this.currentPageNumber,
      limit:this.offset,
      sortBy:this.sortBy,
      sortDir:this.sortDir,
    }
    this.newspaperService.getNewspaperList(params).subscribe(
      {
        next:value =>{
          if(value.code == CodeEnum.SUCCESS){
            this.currentPageNumber = value.data.pageNumber + 1;
            this.newspaperList = value.data.content;
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
        this.location.go('/management/newspaper',`page=${this.currentPageNumber}`);
      } else{
        this.location.go('/management/newspaper',`search=${this.search}?page=${this.currentPageNumber}`);
      }
      this.loadingData();  
    
    }
  }

  findNewspaperName($event: KeyboardEvent):void{
    const element = $event.target as HTMLInputElement;
    this.searchSubject.next(element.value);
  }

  trackByFn(index:number, item:NewspaperModel) {
    return item.id;
  }

  checked(isChecked: boolean, newspaper:NewspaperModel):void {
    if(this.message != ""){
      this.message = "";
    }
    if(isChecked){
      this.newspaperService.deleteNewspaper(newspaper.id!).subscribe({
        next:value=>{
            if(value.code == CodeEnum.SUCCESS){
              this.message = value.message;
              this.newspaperList = this.newspaperList.filter(item => item.id !== newspaper.id);
              if(this.newspaperList.length == 0){
                if(this.currentPageNumber != 1){
                  this.currentPageNumber = this.currentPageNumber - 1;
                }
                this.location.go('/management/newspaper',`page=${this.currentPageNumber}`);
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
