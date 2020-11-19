import {Injectable} from '@angular/core';
import { Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
 export class credentialservice
{
   
   private keepAfterRouteChange = false;
   

  
    private emailsubject =new Subject<any>();
    constructor() {

    }
    setemail(email:any) {
 
       this.emailsubject.next(email);
      }

      getemail(): Observable<any> {
      
         return this.emailsubject.asObservable();    
        }
  
         clear() {
            // clear by calling subject.next() without parameters
            this.emailsubject.next();
        }
 }