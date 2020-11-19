import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {MatGridListModule} from '@angular/material/grid-list';

import {MatNativeDateModule,MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule,} from  '@angular/material';
import { ProfileComponent } from './components/profile/profile.component';
import { UserverificationComponent } from './components/userverification/userverification.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AlertService } from '../services/alertservice';
import { UserService } from '../services/userservice';
import { AlertComponent } from './components/alert/alert.component';
import { shareresservice } from '../services/shareres.service';
import { credentialservice } from './userservice/credentialservice';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AuthenticationService } from '../auth/guard/authenccationservice';
import { JwtInterceptor } from './helper/jwtintercepter';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './helper/errorinterceptor';
import { AuthGuard } from './guard/AuthGuard';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, ProfileComponent, UserverificationComponent,AlertComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatRadioModule,
    MatListModule,
    MatGridListModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    MatAutocompleteModule,
    
  ],
  exports: [LoginComponent,RegisterComponent,AlertComponent],
  providers:[UserService,AlertService,credentialservice,AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }]
})
export class AuthModule { }
