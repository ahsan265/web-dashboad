import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpParams} from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
// import { gdataquery } from '../model_class/gdata.model';
// import { query } from '@angular/animations';

@Injectable()
 export class gdataresponse
{ 
    constructor(private httpclient: HttpClient){}

   // for model api
   getprediction(source: string,destination:string,date:string,time:string):Observable<any>
{     
  let query= new HttpParams();
   query = query.append("source", source);
   query = query.append("destination", destination);
   query = query.append("date", date);
   query = query.append("time", time);
   var sd=this.httpclient.get('http://localhost:3000/route_api/',{params:query});
   console.log(sd);
   return sd;


} 


 }