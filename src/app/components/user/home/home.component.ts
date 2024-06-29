import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { NewspaperModel } from 'src/app/models/newspaper';
import { FavouriteService } from 'src/app/services/favourite.service';
import { NewspaperService } from 'src/app/services/newspaper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  keySearch!:string; 
  pageHome:boolean = true;
  selectedTopicName:string = AppEnum.DEFAULT_ALL;
  selectedOriginName:string = AppEnum.DEFAULT_ALL;
  
  constructor(private newspaperService:NewspaperService,private favouriteService:FavouriteService) { }

  ngOnInit() {
    
  }

  search($event: string) {
    if($event != ""){
      this.pageHome = false;
    }
    this.keySearch = $event;
  }

  selectedTopic($event: string) {
    this.selectedTopicName = $event;
    if(this.selectedTopicName == AppEnum.DEFAULT_ALL && !this.pageHome && this.selectedOriginName == AppEnum.DEFAULT_ALL){
      this.pageHome = true;
    } else{
      this.pageHome = false;
    }
  }

  selectedOrigin($event: string) {
    this.selectedOriginName = $event;
    if(this.selectedTopicName == AppEnum.DEFAULT_ALL && !this.pageHome && this.selectedOriginName == AppEnum.DEFAULT_ALL){
      this.pageHome = true;
    } else{
      this.pageHome = false;
    }
  }
}
