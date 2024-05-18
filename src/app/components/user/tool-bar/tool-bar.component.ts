import { query } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { CodeEnum } from 'src/app/helpers/code';
import { OriginModel } from 'src/app/models/origin';
import { TopicModel } from 'src/app/models/topic';
import { OriginService } from 'src/app/services/origin.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  @Input("topic") topic!:string;
  @Output("topic") topicName:EventEmitter<string>  = new EventEmitter<string>
  @Output("origin") originName:EventEmitter<string>  = new EventEmitter<string>;
  @Output("search") search:EventEmitter<string>  = new EventEmitter<string>;
  allOrigin!:OriginModel[];
  allTopic!:TopicModel[];
  selectedBar:boolean = false;

  constructor(private router:Router,private topicService:TopicService,private originService:OriginService) { }

  ngOnInit() {

    if(this.selectedBar){
      
    } else{
      this.getAll();
    }
  }

  showSearchBar(){
    this.selectedBar = false;
  }

  showSelectBar(){
    this.selectedBar = true;
  }

  findNewspaper($event: KeyboardEvent) {
    const element = $event.target as HTMLInputElement;
    this.search.emit(element.value);
  }

  getAll() {
    this.topicService.getAllTopic().subscribe({
      next: value => {
        if (value.code == CodeEnum.SUCCESS) {
          this.allTopic = value.data;
        }
      },
      error: error => {
        
      }
    });
    this.originService.getAllOrigin().subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.allOrigin = value.data;
        }
      }
    })
  }

  selectTopic($event: Event) {
    const selectEle = $event.target as HTMLSelectElement;
    this.topicName.emit(selectEle.value);
  }

  selectOrigin($event: Event) {
    const selectEle = $event.target as HTMLSelectElement;
    this.originName.emit(selectEle.value);
  }

}
