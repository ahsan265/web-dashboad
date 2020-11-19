import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/userservice';
import { AlertService } from 'src/app/services/alertservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetpassform:FormGroup;
  submitted = false;
  hide=false;
  constructor(private fb:FormBuilder,
    private router: Router,

    private usersrervice:UserService,
    private alertservice:AlertService) { }

  ngOnInit() {
    this.resetpassform = this.fb.group({
      email: [null, Validators.required],
      updatepassword: [null, Validators.required],
      token: [null, Validators.required]

  });
 
 this.resetpassform.removeControl('token');
 this.resetpassform.removeControl('updatepassword');
  }
  resetpasstoken()
  {
    this.submitted = true;

    // stop here if form is invalid
    
    if (this.resetpassform.invalid) {
        return;
    }
   
this.usersrervice.resetpasswordinit(this.resetpassform.value.email).subscribe(data=>{
  console.log(data);
   this.alertservice.success("Check mail for instructions",true);
  this.hide=true;
  this.resetpassform.addControl('token', new FormControl("", Validators.required));
  this.resetpassform.addControl('updatepassword', new FormControl("", Validators.required));


},err=>{
  this.alertservice.error(err,true);
})
  }
  resetpassdone()
  {
    this.submitted = true;

    // stop here if form is invalid
    
    if (this.resetpassform.invalid) {
        return;
    }
   
this.usersrervice.resetpassworddone(this.resetpassform.value).subscribe(data=>{
  this.hide=false;
  this.resetpassform.removeControl('token');
 this.resetpassform.removeControl('updatepassword');
 this.alertservice.success("Password reset successfully",true);
 this.router.navigate(['/login']);


},err=>{
  this.alertservice.error(err,true);
})
  }

  get f() { return this.resetpassform.controls; }

}

