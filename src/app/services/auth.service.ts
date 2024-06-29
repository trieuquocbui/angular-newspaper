import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login';
import baseUrl from '../helpers/url';
import { RegisterModel } from '../models/register';
import { JwtModel } from '../models/jwt';
import { Observable, forkJoin, map, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleEnum } from '../helpers/role';
import { Router } from '@angular/router';
import { UserModel } from '../models/user';
import { API } from '../models/api';
import { UserService } from './user.service';
import { CodeEnum } from '../helpers/code';
import { FavouriteService } from './favourite.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userModel = new UserModel();
  constructor(private http:HttpClient, private jwtHelper:JwtHelperService, private router:Router, private userService:UserService, private favouriteService:FavouriteService) { }

  login(data: LoginModel):Observable<API<JwtModel>> {
    return this.http.post<API<JwtModel>>(`${baseUrl}/auth/login`, data);
  }

  register(data: RegisterModel):Observable<API<UserModel>>{
    return this.http.post<API<UserModel>>(`${baseUrl}/auth/register`, data);
  }

  logout(): void {
    window.sessionStorage.clear();
  }

  public getUser(): Observable<UserModel> {
    if (this.isLoggedIn()) {
      return forkJoin({
        userResponse: this.userService.getUser(this.getUsername()),
        favouriteResponse: this.favouriteService.getAllFavouriteNewspaperOfUser(this.getUsername())
      }).pipe(
        map(({ userResponse, favouriteResponse }) => {
          if (userResponse.code === CodeEnum.SUCCESS) {
            this.userModel = userResponse.data;
          }
          if (favouriteResponse.code === CodeEnum.SUCCESS) {
            this.userModel.favouriteList = favouriteResponse.data;
          }
          return this.userModel;
        })
      );
    } else {
      return of(this.userModel);
    }
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public getRole():string{
    const decodedToken = this.jwtHelper.decodeToken(this.getToken());
    return decodedToken.roles || [];
  }

  public getUsername():string{
    const decodedToken = this.jwtHelper.decodeToken(this.getToken());
    return decodedToken?.sub;
  }

  public isLoggedIn():boolean{
    let tokenStr = sessionStorage.getItem(TOKEN_KEY);
    if ( tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    } else {
      return true;  
    }
  }

  public authorizeToPage(){
    const role = this.getRole();
    if(role[0] === RoleEnum.USER){
        this.router.navigate(['home'])
    } else if(role[0] === RoleEnum.ADMIN){
      this.router.navigate(['/management/home']);
    }
  }

}
