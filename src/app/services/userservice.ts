import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from '../auth/usermodel/user';
import { config } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {
    constructor(private http: HttpClient) {}
     
    httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          'Authorization':'authkey',
          'userid':'1'
        })
      };
      
 baseurl="http://127.0.0.1:8080/api/v1/"

    register(user: User) {
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }
       // console.log("hello",user)
        return this.http.post(`${this.baseurl}users/`,user, requestOptions);
    }
    verifyuser(email:any)
    {
       // console.log("email",email);
      
        return this.http.post(`${this.baseurl}users/${email}/verifiyuser/`,email);
    }
     verifieduser(email:any,user:User)
    
     {  
          // console.log("verified",user.verification_token)
       
  
    return this.http.post(`${this.baseurl}users/${email}/verifiyuser/`,{verification_token:user.verification_token});

     }
     resetpasswordinit(email:any)
     {
        return this.http.post(`${this.baseurl}users/${email}/password/`,email);

     }
     resetpassworddone(user:User)
     { console.log("passreset",user)
        return this.http.post(`${this.baseurl}users/${user.email}/password/`,{token:user.token,password:user.updatepassword});

     }
     loaduserprofile(token:any)
     {
        var requestOptions = {
            method:'GET',
            headers: { 'x-access-token':token.token},
        }
         console.log("profile",token.message);
         return this.http.get<User>(`${this.baseurl}users/${token.message}`,requestOptions);
     }
     updatepassword(oldpassword:any,newpassword:any,token:any)
     {  
        console.log(oldpassword,newpassword); 
        var requestOptions = {
        method:'PUT',
        headers: {'Content-Type': 'application/json','x-access-token':token.token},
     
    }
    return this.http.put(`${this.baseurl}users/${token.message}`,{password:oldpassword,newPassword:newpassword},requestOptions);

     }
}