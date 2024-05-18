import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CodeEnum } from 'src/app/helpers/code';
import { OriginModel } from 'src/app/models/origin';
import { OriginService } from 'src/app/services/origin.service';
import { IDeactivateComponent } from '../../common/IDeactivate/IDeactivate.component';

@Component({
  selector: 'app-add-origin',
  templateUrl: './add-origin.component.html',
  styleUrls: ['./add-origin.component.css','../admin.component.css','../add-edit-style.component.css']
})
export class AddOriginComponent implements OnInit, IDeactivateComponent {
  public submited:Boolean = false;
  public messageSucces:string = "";
  public messageErrorId:string = ""; 
  public messageErrorName:string = "";

  private origin!:OriginModel;

  constructor(private formBuilder:FormBuilder, private originService:OriginService) { }

  ngOnInit() {
  }

  originForm = this.formBuilder.group({
    id:[null,[Validators.required]],
    name:[null,[Validators.required]]
  })

  get f(): { [key: string]: AbstractControl } {
    return this.originForm.controls;
  }

  cancleError(){
    if(this.submited){
      this.submited = false;
    }
  }

  canExit() : boolean {
    if(this.originForm.valid){
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
    if(this.originForm.valid){
      this.origin = {
        id:this.f['id'].value,
        name: this.f['name'].value
      }
      this.originService.addOrigin(this.origin).subscribe({
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

}
