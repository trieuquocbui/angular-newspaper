import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CodeEnum } from 'src/app/helpers/code';
import { JwtModel } from 'src/app/models/jwt';
import { LoginModel } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public submited:Boolean = false;

  public messageUsernameError!:String; 
  public messagePasswordError!:String; 

  private login:LoginModel = new LoginModel();

  constructor(private formBuilder: FormBuilder,private authService:AuthService) { }

  loginForm = this.formBuilder.group({
    username:[null,[Validators.required]],
    password:[null,[Validators.required]]
  })

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  cancleError(){
    if(this.submited){
      this.submited = false;
    }
  }

  onSubmit(){
    if(this.messagePasswordError != ""){
      this.messagePasswordError = ""
    }
    if(this.messageUsernameError != ""){
      this.messageUsernameError = ""
    }
    this.submited = true;
    if(this.loginForm.valid){
      this.login.setUserName(this.f['username'].value);
      this.login.setPassword(this.f['password'].value);
      this.authService.login(this.login).subscribe(
        {
          next: value =>{
            if(value.code == CodeEnum.SUCCESS){
              this.authService.saveToken(value.data.token);
              this.authService.authorizeToPage();
            }
            
          },
          error: err =>{
            console.log(err.error);
            const code = err.error.code;
            if(code === CodeEnum.ERR0R_ENTITY_NOTFOUND){
              this.messageUsernameError = err.error.message;
            } else if( code === CodeEnum.ERROR_PASSWORD){
              this.messagePasswordError = err.error.message;
            }
          }
        }
      )
    }
  }

  ngOnInit() {
  }

}
