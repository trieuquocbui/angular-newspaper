import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OriginModel } from '../models/origin';
import baseUrl from '../helpers/url';
import { TopicModel } from '../models/topic';
import { PagenationModel } from '../models/pagenation';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { API } from '../models/api';

const reqHeader = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class OriginService {
  

  constructor(private http:HttpClient) { }

  getAllOrigin():Observable<API<OriginModel[]>>{
    return this.http.get<API<OriginModel[]>>(`${baseUrl}/origin/all`,{headers:reqHeader});
  }

  addOrigin(data:OriginModel):Observable<API<OriginModel>>{
    return this.http.post<API<OriginModel>>(`${baseUrl}/origin/add`,data,{headers:reqHeader});
  }

  editOrigin(data:OriginModel):Observable<API<OriginModel>>{
    return this.http.put<API<OriginModel>>(`${baseUrl}/origin/edit/${data.id}`,data,{headers:reqHeader});
  }

  getOrigin(originId:string):Observable<API<OriginModel>>{
    return this.http.get<API<OriginModel>>(`${baseUrl}/origin/${originId}`,{headers:reqHeader});
  }

  getOriginList(search:string,page:number,limit:number,sortBy:string,sortDir:string)
  :Observable<API<PagenationModel<OriginModel>>>{
     const params: Params = {
      search : search,
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortDir: sortDir,
    } 
    const queryParams = new HttpParams().appendAll(params as any);
    return this.http.get<API<PagenationModel<OriginModel>>>(`${baseUrl}/origin/list`,{headers:reqHeader, params:queryParams});
  }

  deleteOrigin(originId:String):Observable<API<string>>{
    return this.http.delete<API<string>>(`${baseUrl}/origin/delete/${originId}`,{headers:reqHeader})
  }

}
