import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../models/api';
import baseUrl from '../helpers/url';
import { FavouriteModel } from '../models/favourite';
import { AuthService } from './auth.service';
import { NewspaperModel } from '../models/newspaper';
import { Params } from '@angular/router';
import { PagenationModel } from '../models/pagenation';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

constructor(private http:HttpClient) { }

getAllFavouriteNewspaperOfUser(username:string):Observable<API<FavouriteModel[]>>{
  return this.http.get<API<FavouriteModel[]>>(`${baseUrl}/favourite/${username}/all`);
}

deleteFavouriteNewspaper(newspaperId:string,username:string):Observable<API<string>>{
  return this.http.delete<API<string>>(`${baseUrl}/favourite/${username}/delete/newspaper/${newspaperId}`);
}

saveFavouriteNewspaper(data:NewspaperModel,username:string):Observable<API<FavouriteModel>>{
  return this.http.post<API<FavouriteModel>>(`${baseUrl}/favourite/${username}/add/newspaper/${data.id}`,data);
}

getFavouriteNewspaperOfUser(username: string, params: Params):Observable<API<PagenationModel<FavouriteModel>>> {
  const queryParams = new HttpParams().appendAll(params as any);
    return this.http.get<API<PagenationModel<FavouriteModel>>>(`${baseUrl}/favourite/${username}/list`,{ params:queryParams});
}
  
}
