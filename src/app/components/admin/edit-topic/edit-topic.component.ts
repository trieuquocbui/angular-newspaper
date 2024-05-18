import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeEnum } from 'src/app/helpers/code';
import { TopicModel } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css','../admin.component.css','../add-edit-style.component.css']
})
export class EditTopicComponent implements OnInit {
  public messageSucces!:string;
  public submited:Boolean = false;
  public messageErrorName!:string;
  private topic!:TopicModel;

  constructor(
    private formBuilder:FormBuilder,
    private topicService:TopicService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
     const topicId = this.route.snapshot.params['topicId'];
     this.findByTopicId(topicId);
  }

  topicForm = this.formBuilder.group({
    id:[{value:null,disabled:true},[Validators.required]],
    name:[null,[Validators.required]]
  });

  get f(): { [key: string]: AbstractControl } {
    return this.topicForm.controls;
  }

  onSubmit(){
    if(this.messageErrorName != ""){
      this.messageErrorName = ""
    }
    this.submited = true;
    if(this.topicForm.valid){
      this.topic = {
        id: this.f['id'].value,
        name: this.f['name'].value
      }
      this.topicService.editTopic(this.topic).subscribe({
        next: value =>{
          if(value.code == CodeEnum.SUCCESS){
            this.messageSucces = value.message;
          }
          
        },
        error: err=>{
          const code = err.error.code;
            if(code == CodeEnum.ERROR_NAME_EXIST){
              this.messageErrorName = err.error.message;
            }
        }
      })
    }
  }

  cancleError(){
    if(this.submited){
      this.submited = false;
    }
  }

  findByTopicId(topicId:string){
    this.topicService.getTopic(topicId).subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.f['id'].setValue(value.data.id);
          this.f['name'].setValue(value.data.name);
        }
      },
      error: err=>{
          this.router.navigate(['/management/topic']);
      }
    })
  }

}
