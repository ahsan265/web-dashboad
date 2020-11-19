import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/guard/authenccationservice';
import { User } from './auth/usermodel/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

 
 
}
