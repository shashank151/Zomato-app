import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public latitude;
  public longitude;
  public query;
  public locationEntityId ;
  public locationEntityType;
  public restaurantName;
  public restaurantEntityId ;


  private apiKey = "12696c5b82821454116700fa049cdf1e";
  private url: any = 'https://developers.zomato.com/api/v2.1';
  constructor(private http: HttpClient) {
  }

  public geoLocation(): Observable<any> {
    let options = {
      headers : {
        'user-key': this.apiKey
      },
      params: new HttpParams()
      .set('lat', this.latitude)   
      .set('lon', this.longitude)
    }
     return this.http.get(this.url + '/geocode',options)
  }

  public searchCity() : Observable<any> {
    console.log(this.query);
    let options = {
      headers : {
        'user-key': this.apiKey
      },
      params: new HttpParams()
      .set('query', this.query)
    }
    return this.http.get(this.url+'/locations',options)
  }

  public searchRestaurant() : Observable<any>{

    let options = {
      headers : {
        'user-key': this.apiKey
      },
      params: new HttpParams()
      .set('entity_id', this.locationEntityId)
      .set('entity_type', this.locationEntityType)
      .set('q', this.restaurantName)

    }
    return this.http.get(this.url+'/search',options)
  }
  
  public getRestaurantDetail() :Observable<any>{
    let options = {
      headers : {
        'user-key': this.apiKey
      },
      params: new HttpParams()
      .set('res_id', this.restaurantEntityId)
    }
    return this.http.get(this.url + '/restaurant',options)
  }
}

