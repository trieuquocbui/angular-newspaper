import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { NewspaperModel } from 'src/app/models/newspaper';
import { NewspaperService } from 'src/app/services/newspaper.service';

@Component({
  selector: 'app-infor-newspaper',
  templateUrl: './infor-newspaper.component.html',
  styleUrls: ['./infor-newspaper.component.css','../admin.component.css','../../../../assets/css/newspaper.css']
})
export class InforNewspaperComponent implements OnInit {

  newspaper!:NewspaperModel;
  pathImageFile:string = AppEnum.PATH_IMAGE_FIME;

  constructor(private route:ActivatedRoute,private newspaperService:NewspaperService) { }

  ngOnInit() {
    const newspaperId = this.route.snapshot.params['newspaperId'];
    this.findById(newspaperId);
  }

  findById(newspaperId:string){
    this.newspaperService.getNewspaper(newspaperId).subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.newspaper = value.data;
        }
      },
      error:err=>{
        
      }
    })
  }
}
