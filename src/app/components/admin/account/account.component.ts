import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { PagenationEnum } from 'src/app/helpers/pagenation';
import { UserModel } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css','../admin.component.css']
})
export class AccountComponent implements OnInit {
  userList!:UserModel[];
  pathImageFile:string = AppEnum.PATH_IMAGE_FIME;
  searchSubject = new Subject<string>();
  currentPageNumber!:number;
  totalPageNumber!:number;
  sortBy!:string;
  sortDir!:string;
  offset!:number;
  search!:string;

  constructor(private location: Location,private router: Router,private route:ActivatedRoute,private userService:UserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) =>{
      this.search = params['search'] || "";
      this.currentPageNumber = params['page'] || PagenationEnum.DEFAULT_PAGE;
      this.offset = params['offset'] || PagenationEnum.DEFAULT_LIMIT;
      this.sortBy = params['sortBy'] || PagenationEnum.DEFAULT_SORTBY_USERNAME;
      this.sortDir = params['sortDir'] || PagenationEnum.DEFAULT_SORTDIR;
      this.loadingData();
    })

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(search => {
        this.search = search;
        if(this.search != ""){
          this.location.go('/management/user',`search=${search}?page=${this.currentPageNumber}`);
        }
        return this.userService.getUserList(search,this.currentPageNumber,this.offset,this.sortBy,this.sortDir);
      })
    ).subscribe(result =>{
      if(result.code == CodeEnum.SUCCESS){
        this.currentPageNumber = result.data.pageNumber + 1;
        this.userList = result.data.content;
        this.totalPageNumber = result.data.totalPages;
      }
    })
  }

  loadingData():void{
    this.userService.getUserList(this.search,this.currentPageNumber,this.offset,this.sortBy,this.sortDir).subscribe(
      {
        next:value =>{
          if(value.code == CodeEnum.SUCCESS){
            this.currentPageNumber = value.data.pageNumber + 1;
            this.userList = value.data.content;
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
        this.location.go('/management/user',`page=${this.currentPageNumber}`);
      } else{
        this.location.go('/management/user',`search=${this.search}?page=${this.currentPageNumber}`);
      }
      this.loadingData();  
    }
  }

  findUserAccount($event: KeyboardEvent):void{
    const element = $event.target as HTMLInputElement;
    this.searchSubject.next(element.value);
  }

  trackByFn(index:number, item:UserModel) {
    return item.username;
  }

}
