import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { NewspaperModel } from 'src/app/models/newspaper';
import { NewspaperService } from 'src/app/services/newspaper.service';
import { Location } from '@angular/common';
import { Params } from 'src/app/models/params';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrls: ['./newspaper.component.css','../../../../assets/css/newspaper.css']
})
export class NewspaperComponent implements OnInit {
  userModel:UserModel = new UserModel();
  @ViewChild('notebook') notebook!: ElementRef;
  newspaper:NewspaperModel = new NewspaperModel();
  rootStyles = getComputedStyle(document.documentElement);
  newspaperList:NewspaperModel[] = [];
  imageList:string[] = [];
  pathImageFile:string = AppEnum.PATH_IMAGE_FIME;
  newspaperId!:string;
  constructor(private route:ActivatedRoute,private favouriteService:FavouriteService,private newspaperService:NewspaperService,private location: Location,private authService:AuthService,private router:Router) { }

  ngOnInit():void {
    this.route.params.subscribe(params => {
      this.newspaperId = params['newspaperId'];
      this.findById(this.newspaperId);
      this.getRandNewspaper();
    });

    let isLogin = this.authService.isLoggedIn();
    if(isLogin){
      this.authService.getUser().subscribe({
        next:value=>{
          this.userModel = value;
          let isExistFavouriteNewspaper = this.userModel.favouriteList.find((item) => {
              return item.newspaper.id == this.newspaperId;
          })
          if(!isExistFavouriteNewspaper){
            const bookmarkColor = this.rootStyles.getPropertyValue('--bookmark-color').trim();
            this.notebook.nativeElement.lastElementChild.style.color = bookmarkColor;
          } else{
            const savedBookmarkColor = this.rootStyles.getPropertyValue('--saved-bookmark-color').trim();
            this.notebook.nativeElement.lastElementChild.style.color = savedBookmarkColor;
          }
        }
      });
    }
  }

  findById(id:string):void{
    this.newspaperService.getNewspaper(id).subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.newspaper = value.data;
        }
      }
    })
  }

  getRandNewspaper():void{
    this.imageList = [];
    const params: Params = {
      limit:4,
    }
    this.newspaperService.getRandNewspaper(params).subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.newspaperList = value.data;
          this.newspaperList.forEach(newspaper => {
            const imageName = newspaper.paragraphs.find(paragraph => paragraph.thumbnail != null)!.thumbnail!;
            this.imageList.push(this.pathImageFile + imageName);
          })
        }
      }
    })
  }

  back(){
    this.location.back();
  }

  handleBookMark(newspaperId:string) {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(["/login"]);
    }else{
      this.authService.getUser().subscribe({
        next:value=>{
          this.userModel = value;
          let handleBookMark = this.userModel.favouriteList.find(item =>{
            return item.newspaper.id == newspaperId;
          })
          if(handleBookMark){
            this.favouriteService.deleteFavouriteNewspaper(newspaperId,this.authService.getUsername()).subscribe({
              next:value=>{
                if(value.code == CodeEnum.SUCCESS){
                  console.log(value.message);
                  const bookmarkColor = this.rootStyles.getPropertyValue('--bookmark-color').trim();
                  this.notebook.nativeElement.lastElementChild.style.color = bookmarkColor;
                }
              },
              error:err=>{
                console.log(err)
              }
            })
          }else{
            this.favouriteService.saveFavouriteNewspaper(this.newspaper,this.authService.getUsername()).subscribe({
              next:value=>{
                if(value.code == CodeEnum.SUCCESS){
                  console.log(value.message);
                  const savedBookmarkColor = this.rootStyles.getPropertyValue('--saved-bookmark-color').trim();
                  this.notebook.nativeElement.lastElementChild.style.color = savedBookmarkColor;
                }
              },
              error:err=>{
                console.log(err)
              }
            })
          }
        }
      });
      
  
    }
    
  
  }

}
