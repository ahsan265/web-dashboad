import {Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
 export class shareresservice
{
    // dateobs$: Observable<any>;
    // timeobs$: Observable<any>;
  


    private datesubject = new Subject<any>();
    private timesubject = new Subject<any>();
    private resetroutesubject = new Subject<any>();
    dateobs$ = this.datesubject.asObservable().pipe();
    timeobs$ = this.timesubject.asObservable().pipe();
    resetrouteobs$ = this.resetroutesubject.asObservable().pipe();


    constructor() {
       

    }
 
    getdate(date:any) {
     
       return this.datesubject.next(date);
    
    }
    
    gettime(time:any) {
       
        return  this.timesubject.next(time);
    }
    getresetroute(val:any)
    {
        return this.resetroutesubject.next(val)
    }
   
 }