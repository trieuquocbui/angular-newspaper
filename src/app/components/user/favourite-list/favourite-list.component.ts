import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { PagenationEnum } from 'src/app/helpers/pagenation';
import { FavouriteModel } from 'src/app/models/favourite';
import { AuthService } from 'src/app/services/auth.service';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent implements OnInit {
  show: boolean = false;
  favouriteList:FavouriteModel[] = [];
  page:number = PagenationEnum.DEFAULT_PAGE;
  offset:number = PagenationEnum.DEFAULT_LIMIT;
  sortBy:string = PagenationEnum.DEFAULT_SORTBY_DATE;
  sortDir:string = PagenationEnum.DEFAULT_SORTDIR;
  pathImageFile:String = AppEnum.PATH_IMAGE_FIME;
  imageList:string[] = [];

  constructor(private favouriteService:FavouriteService,private authService:AuthService) { }

  ngOnInit() {
    this.loadFavouriteNewspaperOfUser();
  }

  showNewspaper() {
    ++this.page;
    this.loadFavouriteNewspaperOfUser();
  }

  loadFavouriteNewspaperOfUser() {
    const params: Params ={
      page: this.page,
      limit: this.offset,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
    }
    this.favouriteService.getFavouriteNewspaperOfUser(this.authService.getUsername(),params).subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.page = 1;
          this.favouriteList = value.data.content;
          this.favouriteList.forEach((favourite) =>{
            const imageName = favourite.newspaper.paragraphs.find(paragraph => paragraph.thumbnail != null)?.thumbnail;
            imageName && this.imageList.push(this.pathImageFile + imageName);
          })
        }else{
          this.page = this.page + 1;
          this.favouriteList.push(...value.data.content);
          value.data.content.forEach((favourite) =>{
            const imageName = favourite.newspaper.paragraphs.find(paragraph => paragraph.thumbnail != null)?.thumbnail;
            imageName && this.imageList.push(this.pathImageFile + imageName);
          })
        }
        if(!value.data.lastPage){
          this.show = true;
        }else{
          this.show = false;
        }
      }
    })
  }

}
