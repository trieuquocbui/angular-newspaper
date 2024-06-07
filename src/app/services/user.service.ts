import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/url';
import { UserModel } from '../models/user';
import { PagenationModel } from '../models/pagenation';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { API } from '../models/api';
const reqHeader = new HttpHeaders().set('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root'
})
export class UserService {


constructor(private http:HttpClient) { }

getUserList(search: string, currentPageNumber: number, offset: number, sortBy: string, sortDir: string):Observable<API<PagenationModel<UserModel>>> {
  const params: Params = {
    search : search,
    page: currentPageNumber,
    limit: offset,
    sortBy: sortBy,
    sortDir: sortDir,
  } 
  const queryParams = new HttpParams().appendAll(params as any);
  return this.http.get<API<PagenationModel<UserModel>>>(`${baseUrl}/user/list`,{headers:reqHeader, params:queryParams});
}

getUser(username:string):Observable<API<UserModel>>{
  return this.http.get<API<UserModel>>(`${baseUrl}/user/profile/${username}`);
}

updateUserInfor(username:string,formDate: FormData):Observable<API<UserModel>> {
  return this.http.put<API<UserModel>>(`${baseUrl}/user/edit/${username}`,formDate);
}

}
