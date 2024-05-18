import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login';
import baseUrl from '../helpers/url';
import { RegisterModel } from '../models/register';
import { JwtModel } from '../models/jwt';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleEnum } from '../helpers/role';
import { Router } from '@angular/router';
import { UserModel } from '../models/user';
import { API } from '../models/api';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private jwtHelper:JwtHelperService, private router:Router) { }

  login(data: LoginModel):Observable<API<JwtModel>> {
    return this.http.post<API<JwtModel>>(`${baseUrl}/auth/login`, data);
  }

  register(data: RegisterModel):Observable<API<UserModel>>{
    return this.http.post<API<UserModel>>(`${baseUrl}/auth/register`, data);
  }

  logout(): void {
    window.sessionStorage.clear();
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
