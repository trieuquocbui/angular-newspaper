import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeEnum } from 'src/app/helpers/code';
import { OriginModel } from 'src/app/models/origin';
import { OriginService } from 'src/app/services/origin.service';


@Component({
  selector: 'app-edit-origin',
  templateUrl: './edit-origin.component.html',
  styleUrls: ['./edit-origin.component.css','../admin.component.css','../add-edit-style.component.css']
})
export class EditOriginComponent implements OnInit {
  public messageSucces!:string;
  public submited:Boolean = false;
  public messageErrorName!:string;
  private origin!:OriginModel;

  constructor(private formBuilder:FormBuilder,
    private originService:OriginService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    const originId = this.route.snapshot.params['originId'];
    this.findByOriginId(originId);
  }

  originForm = this.formBuilder.group({
    id:[{value:null,disabled:true},[Validators.required]],
    name:[null,[Validators.required]]
  });

  get f(): { [key: string]: AbstractControl } {
    return this.originForm.controls;
  }

  onSubmit(){
    if(this.messageErrorName != ""){
      this.messageErrorName = ""
    }
    this.submited = true;
    if(this.originForm.valid){
      this.origin = {
        id: this.f['id'].value,
        name: this.f['name'].value
      }
      this.originService.editOrigin(this.origin).subscribe({
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

  findByOriginId(originId:string){
    this.originService.getOrigin(originId).subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.f['id'].setValue(value.data.id);
          this.f['name'].setValue(value.data.name);
        }
      },
      error: err=>{
          this.router.navigate(['/management/origin']);
      }
    })
  }

}
