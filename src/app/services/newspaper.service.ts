import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/url';
import { Observable } from 'rxjs';
import { PagenationModel } from '../models/pagenation';
import { NewspaperModel } from '../models/newspaper';
import { API } from '../models/api';
import { Params } from '../models/params';

const reqHeader = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class NewspaperService {
  
  constructor(private http:HttpClient) { }

  getAllNewNewspaper():Observable<API<NewspaperModel[]>> {
    return this.http.get<API<NewspaperModel[]>>(`${baseUrl}/newspaper/list/all-new-newspaper`,{headers:reqHeader});
  }

  getRandNewspaper(params: Params):Observable<API<NewspaperModel[]>> {
    const queryParams = new HttpParams().appendAll(params as any);
    return this.http.get<API<NewspaperModel[]>>(`${baseUrl}/newspaper/list/rand`,{headers:reqHeader,params:queryParams});
  }

  addNewspaper(data:FormData):Observable<API<NewspaperModel>>{
    return this.http.post<API<NewspaperModel>>(`${baseUrl}/newspaper/add`,data);
  }

  updateNewspaper(newspaperId:string,data: FormData):Observable<API<NewspaperModel>> {
    return this.http.put<API<NewspaperModel>>(`${baseUrl}/newspaper/edit/${newspaperId}`,data);
  }

  getNewspaper(id:string):Observable<API<NewspaperModel>>{
    return this.http.get<API<NewspaperModel>>(`${baseUrl}/newspaper/${id}`,{headers:reqHeader})
  }

  getNewspaperList(params: Params)
  :Observable<API<PagenationModel<NewspaperModel>>> {
    const queryParams = new HttpParams().appendAll(params as any);
    return this.http.get<API<PagenationModel<NewspaperModel>>>(`${baseUrl}/newspaper/list`,{headers:reqHeader, params:queryParams});
  }

  deleteNewspaper(id: string):Observable<API<string>> {
    return this.http.delete<API<string>>(`${baseUrl}/newspaper/delete/${id}`,{headers:reqHeader})
  };

}
