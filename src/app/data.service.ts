import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseurl:string =environment.uri;

  constructor(private _http:HttpClient) { }

  getData(url){
   return  this._http.get(this.baseurl+url)
  }

}
