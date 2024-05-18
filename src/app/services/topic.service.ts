import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TopicModel } from '../models/topic';
import baseUrl from '../helpers/url';
import { Params } from '../models/params';
import { PagenationModel } from '../models/pagenation';
import { Observable } from 'rxjs';
import { API } from '../models/api';

const reqHeader = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http:HttpClient) { }

  getAllTopic():Observable<API<TopicModel[]>>{
    return this.http.get<API<TopicModel[]>>(`${baseUrl}/topic/all`,{headers:reqHeader})
  }

  addTopic(data:TopicModel):Observable<API<TopicModel>>{
    return this.http.post<API<TopicModel>>(`${baseUrl}/topic/add`,data,{headers:reqHeader});
  }

  editTopic(data:TopicModel):Observable<API<TopicModel>>{
    return this.http.put<API<TopicModel>>(`${baseUrl}/topic/edit/${data.id}`,data,{headers:reqHeader});
  }

  getTopic(topicId:string):Observable<API<TopicModel>>{
    return this.http.get<API<TopicModel>>(`${baseUrl}/topic/${topicId}`,{headers:reqHeader});
  }

  getTopicList(search:string,page:number,limit:number,sortBy:string,sortDir:string):Observable<API<PagenationModel<TopicModel>>>{
     const params: Params = {
      search : search,
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortDir: sortDir,
    } 
    const queryParams = new HttpParams().appendAll(params as any);
    return this.http.get<API<PagenationModel<TopicModel>>>(`${baseUrl}/topic/list`,{headers:reqHeader, params:queryParams});
  }

  deleteTopic(topicId:String):Observable<API<string>>{
    return this.http.delete<API<string>>(`${baseUrl}/topic/delete/${topicId}`,{headers:reqHeader})
  }

}
