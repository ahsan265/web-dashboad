import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../usermodel/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    baseurl="http://127.0.0.1:8080/api/v1"
    login(email:string,password:string) {
        let authorizationData = 'Basic ' + btoa(email + ':' + password);
        var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' ,
          'Authorization':authorizationData},
          body: JSON.stringify({email,password})
      }
        return this.http.post<any>(`${this.baseurl}/authenticate/`,{email,password},requestOptions)
            .pipe(map(user => {
                if (user&&user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}