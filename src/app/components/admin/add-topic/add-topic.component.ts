import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CodeEnum } from 'src/app/helpers/code';
import { TopicModel } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { IDeactivateComponent } from '../../common/IDeactivate/IDeactivate.component';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css','../admin.component.css','../add-edit-style.component.css']
})
export class AddTopicComponent implements OnInit,IDeactivateComponent {
  public submited:Boolean = false;
  public messageSucces:string = "";
  public messageErrorId:string = ""; 
  public messageErrorName:string = "";

  private topic!:TopicModel;

  constructor(private formBuilder:FormBuilder, private topicService:TopicService) { }
  

  topicForm = this.formBuilder.group({
    id:[null,[Validators.required]],
    name:[null,[Validators.required]]
  })

  get f(): { [key: string]: AbstractControl } {
    return this.topicForm.controls;
  }

  cancleError(){
    if(this.submited){
      this.submited = false;
    }
  }

  canExit() : boolean {
    if(this.topicForm.valid){
      if (confirm("Bạn có thêm lưu dữ liệu nhưng chưa lưu, bạn chắc là có muốn thoát không!")) {
        return true;
      } else {
        return false;
      }
    } else{
      return true;
    }
  }

  onSubmit(){
    if(this.messageSucces != ""){
      this.messageSucces = "";
    }
    if(this.messageErrorId != ""){
      this.messageErrorId = "";
    }
    if(this.messageErrorName != ""){
      this.messageErrorName = "";
    }
    this.submited = true;
    if(this.topicForm.valid){
      this.topic = {
        id:this.f['id'].value,
        name: this.f['name'].value
      }
      this.topicService.addTopic(this.topic).subscribe({
        next: value =>{
          if(value.code == CodeEnum.SUCCESS){
            this.messageSucces = value.message;
          }
        },
        error: err=>{
          const code = err.error.code;
            if(code == CodeEnum.ERROR_ID_EXIST){
              this.messageErrorId = err.error.message;
            } else if(code == CodeEnum.ERROR_NAME_EXIST){
              this.messageErrorName = err.error.message;
            }
        }
      })
    }
  }

  ngOnInit() {
  }

}
