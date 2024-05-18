import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../models/api';
import { Params } from '@angular/router';
import baseUrl from '../helpers/url';
import { PagenationModel } from '../models/pagenation';
import { Notification } from 'src/app/models/notification';


const reqHeader = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

constructor(private http:HttpClient) { }
  getNotificationList(params: Params):Observable<API<PagenationModel<Notification>>>{
    const queryParams = new HttpParams().appendAll(params as any);
    return this.http.get<API<PagenationModel<Notification>>>(`${baseUrl}/notification/list`,{headers:reqHeader,params:queryParams});
  }
}
