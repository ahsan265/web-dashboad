import {Injectable} from '@angular/core';
import { from, Observable } from 'rxjs';
import {HttpClient,HttpParams} from '@angular/common/http';

@Injectable()
 export class dashboardservice
{
    constructor(private httpclient: HttpClient){}

   //get speed mean min max on segment
   gdatammmean(startnode: string,endnode:string,fromdate:string,todadte:string):Observable<any>
{    
    let query= new HttpParams();
   // query = query.append("osmname", rname);
    query = query.append("start_node", startnode);
    query = query.append("end_node", endnode);
    query = query.append("fromdate", fromdate);
    query = query.append("todate", todadte);

    var mm_mean=this.httpclient.get('http://localhost:8081/geodata/speedmeanminmax/',{params:query});
 
    return mm_mean;
} 
// get geojson againsts date range

getgeojosn(fromdate: string,todate:string,flag:string):Observable<any>
{  
   try{ let query= new HttpParams();
  
    query = query.append("fromdate", fromdate);
    query = query.append("todate", todate);
    query = query.append("flag", flag);
    // query = query.append('datetime', dt);
    var geojson=this.httpclient.get('http://localhost:8081/geodata/speednodes/',{params:query});
    return geojson;}
    catch(err){
      
    }
} 
 //get day wise avg speed on segment.
getdaterangespeed(startnode: string,endnode:string,fromdate:string,todadte:string):Observable<any>
{   
   try{ let query= new HttpParams();
   // query = query.append("osmname", rname);
    query = query.append("start_node", startnode);
    query = query.append("end_node", endnode);
    query = query.append("fromdate", fromdate);
    query = query.append("todate", todadte);

    var mm_mean=this.httpclient.get('http://localhost:8081/geodata/speeddate/',{params:query});
    return mm_mean;}
    catch(err){
       
    }
} 

getroadwisedayavgspeed(roadname: string,fromdate:string,todadte:string):Observable<any>
{   
   try{ let query= new HttpParams();
   // query = query.append("osmname", rname);
    query = query.append("roadname", roadname);
    query = query.append("fromdate", fromdate);
    query = query.append("todate", todadte);

    var mm_mean=this.httpclient.get('http://localhost:8081/geodata/raoddaywisemeanspeed/',{params:query});
    return mm_mean;}
    catch(err){
      
    }
} 
getroadnamehourlyspeed(roadname: string,fromdate:string,todadte:string):Observable<any>
{   
  try { let query= new HttpParams();
   // query = query.append("osmname", rname);
    query = query.append("roadname", roadname);
    query = query.append("fromdate", fromdate);
    query = query.append("todate", todadte);

    var mm_mean=this.httpclient.get('http://localhost:8081/geodata/findhourlyspeed/',{params:query});
    return mm_mean;}
    catch(err){
     
    }
} 
gettotalroads(fromdate:any,todate:any):Observable<any>
    {   console.log(fromdate,todate);
        let query= new HttpParams();
    query = query.append("fromdate", fromdate);
    query = query.append("todate", todate);
        try{ 
        var road=this.httpclient.get('http://localhost:8081/geodata/totalroadislamabad/',{params:query});
        console.log(road);
        return road;}
        catch(err)
        {
        
        }
}
getroadnamewisemeanminmax(roadname: string,fromdate:string,todadte:string):Observable<any>
{   
   try{ let query= new HttpParams();
   // query = query.append("osmname", rname);
    query = query.append("roadname", roadname);
    query = query.append("fromdate", fromdate);
    query = query.append("todate", todadte);

    var mm_mean=this.httpclient.get('http://localhost:8081/geodata/minmaxmeanbyroadname/',{params:query});
    return mm_mean;}
    catch(err){
   
    }
} 

getroadnamewisetotalcongestionratio(roadname: string,fromdate:string,todadte:string):Observable<any>
{   
    try{let query= new HttpParams();
   // query = query.append("osmname", rname);
    query = query.append("roadname", roadname);
    query = query.append("fromdate", fromdate);
    query = query.append("todate", todadte);

    var mm_mean=this.httpclient.get('http://localhost:8081/geodata/findroadnamecongestionratio/',{params:query});
    return mm_mean;}
    catch(err){
    
    }
} 
findroadname(fromdate:string,todadte:string):Observable<any>

{
   try{ let query= new HttpParams();
     query = query.append("fromdate", fromdate);
     query = query.append("todate", todadte);
     var roadnames=this.httpclient.get('http://localhost:8081/geodata/findroad/',{params:query});
     return roadnames;}
     catch(err)
     {
       
     }
}
findcongestionslot(roadname: string,fromdate:string,todadte:string):Observable<any>
{
    try{ let query= new HttpParams();
        query = query.append("roadname", roadname);
        query = query.append("fromdate", fromdate);
        query = query.append("todate", todadte);
        var roadnames=this.httpclient.get('http://localhost:8081/geodata/findtimeslotspeed/',{params:query});
        return roadnames;}
        catch(err)
        {
           
        }
}
 }