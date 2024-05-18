import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CodeEnum } from 'src/app/helpers/code';
import { TopicModel } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-set',
  templateUrl: './topic-set.component.html',
  styleUrls: ['./topic-set.component.css']
})
export class TopicSetComponent implements OnInit, OnChanges {
  allTopic!:TopicModel[];
  @Output("topic") topic:EventEmitter<string> = new EventEmitter<string>;
  @Input("topic") topicName!:string;

  name!:string;

  constructor(private topicService:TopicService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.name = this.topicName;
  }

  ngOnInit() {
    this.topicService.getAllTopic().subscribe({
      next:value =>{
        if(value.code == CodeEnum.SUCCESS){
          this.allTopic = value.data;
        }
      }
    })
  }

  selectTopic(name:string){
    this.topic.emit(name);
    this.name = name;
  }

}
