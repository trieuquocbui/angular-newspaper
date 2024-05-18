import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public thumbnail:string = AppEnum.PATH_IMAGE_FIME;
  public messageSucces:string = "";
  public selectedImage!:File;
  public submited:Boolean = false;
  public messageErrorUsername:string = "";
  public showBtnSubmit = false;
  private username:string = this.authService.getUsername();
  constructor(private userService:UserService,private authService:AuthService,private formBuilder:FormBuilder) { }

  user = this.formBuilder.group({
    username:[{value:null,disabled:true}],
    fullName:[{value:null,disabled:true},[Validators.required]],
    thumbnail:[null]
  })

  ngOnInit() {
    
    this.userService.getUser(this.username).subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.f['username'].setValue(value.data.username);
          this.f['fullName'].setValue(value.data.fullName);
          this.thumbnail += value.data.thumbnail
        }
      }
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.user.controls;
  }

    onImageChange(event: any) {
      this.selectedImage = event.target.files[0];
      this.thumbnail = URL.createObjectURL(this.selectedImage);
      this.showBtnSubmit = true;
    }

    cancleError(){
      if(this.submited){
        this.submited = false;
      }
    }

    cancleDisable(){
      this.f['fullName'].enable();
      this.showBtnSubmit = true;
    }


    saveProfile() {
      this.submited = true;
      if(this.user.valid){
        let formDate = new FormData();
        if(this.selectedImage != undefined){
          formDate.append('file',this.selectedImage);
        }
        formDate.append('data',this.f['fullName'].value);

        this.userService.updateUserInfor(this.username,formDate).subscribe({
          next:value =>{
            if(value.code == CodeEnum.SUCCESS){
              this.messageSucces = value.message;
            }
            this.thumbnail = AppEnum.PATH_IMAGE_FIME + value.data.thumbnail;
            this.f['fullName'].setValue(value.data.fullName);

          },
          error:err=>{
            const code = err.error.code;
           if(code == CodeEnum.ERROR_NAME_EXIST){
            this.messageErrorUsername = err.error.message;
            }
            
          }

        })
      }
    }

}
