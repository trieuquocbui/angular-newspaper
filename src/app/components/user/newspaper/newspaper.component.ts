import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { NewspaperModel } from 'src/app/models/newspaper';
import { NewspaperService } from 'src/app/services/newspaper.service';
import { Location } from '@angular/common';
import { Params } from 'src/app/models/params';

@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrls: ['./newspaper.component.css','../../../../assets/css/newspaper.css']
})
export class NewspaperComponent implements OnInit {
  newspaper:NewspaperModel = new NewspaperModel();
  newspaperList:NewspaperModel[] = [];
  imageList:string[] = [];
  pathImageFile:string = AppEnum.PATH_IMAGE_FIME;
  newspaperId!:string;
  constructor(private route:ActivatedRoute,private newspaperService:NewspaperService,private location: Location) { }

  ngOnInit():void {
    this.route.params.subscribe(params => {
      this.newspaperId = params['newspaperId'];
      this.findById(this.newspaperId);
      this.getRandNewspaper();
    });
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

}
