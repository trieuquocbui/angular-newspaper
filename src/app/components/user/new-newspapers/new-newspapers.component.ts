import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { NewspaperModel } from 'src/app/models/newspaper';
import { NewspaperService } from 'src/app/services/newspaper.service';

@Component({
  selector: 'app-new-newspapers',
  templateUrl: './new-newspapers.component.html',
  styleUrls: ['./new-newspapers.component.css']
})
export class NewNewspapersComponent implements OnInit {

  allNewNewspaper!:NewspaperModel[];

  firstNewNewspaper!:NewspaperModel;

  pathImageFile:string = AppEnum.PATH_IMAGE_FIME + AppEnum.DEFAULT_NO_IMAGE;

  constructor(private newspaperService:NewspaperService) { }

  ngOnInit() {
    this.newspaperService.getAllNewNewspaper().subscribe({
      next:value=>{
        if(value.code === CodeEnum.SUCCESS){
          this.allNewNewspaper = value.data;
          if(this.allNewNewspaper[0]){
            this.firstNewNewspaper = this.allNewNewspaper[0];
            this.pathImageFile = AppEnum.PATH_IMAGE_FIME + this.firstNewNewspaper.paragraphs.filter(paragraph => paragraph.thumbnail != null).at(0)?.thumbnail!;
          }
        }
      }
    })
  }

  

}
