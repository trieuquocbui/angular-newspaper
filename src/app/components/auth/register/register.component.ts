import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CodeEnum } from 'src/app/helpers/code';
import { RoleEnum } from 'src/app/helpers/role';
import { RegisterModel } from 'src/app/models/register';
import { UserModel } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import ValidationComparePassword from 'src/app/validations/ValidationComparePassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message!:String;

  constructor(private formBuilder:FormBuilder, private authService:AuthService) { }

  public submited:Boolean = false;

  public messageError!:String;

  private register:RegisterModel = new RegisterModel();

  registerForm = this.formBuilder.group({
    username:[null,[Validators.required]],
    password:[null,[Validators.required,Validators.minLength(6)]],
    fullName:[null,[Validators.required]],
    confirmPassword:[null,[Validators.required]],},
    {validator:ValidationComparePassword }
  )

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  cancleError(){
    if(this.submited){
      this.submited = false;
    }
  }

  onSubmit(){
    this.submited = true;
    if(this.registerForm.valid){
      this.register.setUsername(this.f['username'].value);
      this.register.setPassword(this.f['password'].value);
      this.register.setFullName(this.f['fullName'].value);
      this.register.setRole(RoleEnum.USER)
      this.authService.register(this.register).subscribe(
        {
          next:value =>{
            if(value.code == CodeEnum.SUCCESS){
              this.message = value.message;
            }
          },
          error:error =>{
            this.messageError = error.error?.message;
          }
        }
      )
    }
  }

  ngOnInit() {
  }

}
