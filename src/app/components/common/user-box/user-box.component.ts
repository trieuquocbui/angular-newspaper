import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DropdownDirective } from 'src/app/directives/dropdown.directive';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { UserModel } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css'],
  imports:[RouterModule,DropdownDirective,CommonModule],
  standalone:true,
})
export class UserBoxComponent implements OnInit {
  public role!:string;
  private username:string = this.authService.getUsername();
  public thumbnail:string = AppEnum.PATH_IMAGE_FIME;
  public user:UserModel = new UserModel();

  public notifications:number = 0;

  constructor(private authService:AuthService,private userService:UserService, private router:Router) {
  }

  ngOnInit() {
    this.userService.getUser(this.username).subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.user = value.data;
          this.thumbnail += value.data.thumbnail
        }
      }
    })
    this.role = this.authService.getRole();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
