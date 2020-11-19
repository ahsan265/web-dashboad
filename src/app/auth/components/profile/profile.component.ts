import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userservice';
import { ConstantPool } from '@angular/compiler';
import { User } from '../../usermodel/user';
import { AlertService } from 'src/app/services/alertservice';
import { AuthenticationService } from '../../guard/authenccationservice';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  passresetform:FormGroup;
  hide = true;
  returnUrl: string;
  submitted = false;
  user:User[];
  email:any;
  name:any;
  dob:any;
  city:any;
  gender:any;
  em:any;


  constructor(private router: Router,private fb:FormBuilder,
    private alertservice:AlertService,
    private authservice:AuthenticationService,private userservice:UserService) {
     this.em=JSON.parse(localStorage.getItem("currentUser"));

    this.userservice.loaduserprofile(this.em).subscribe(profile=>{
      this.name=profile.name;
      this.email=profile.email;
      this.dob=new Date(profile.age).toDateString();
      this.gender=profile.gender;
      this.city=profile.city;
   
    },err=>{
      this.alertservice.error("Network Error",true);
    }) 

  }
  changepassword()
  {
    this.submitted = true;

    if (this.passresetform.invalid) {
        return;
    } 
    

    this.userservice.updatepassword(this.passresetform.value.oldpassword,this.passresetform.value.newpassword,this.em).subscribe(updatepass=>{
       
      this.alertservice.success("Password Updated Successfully",true);
      this.passresetform.clearAsyncValidators;
    },err=>{
      this.alertservice.error(err,true);
    })
   
  }
  logout()
  {
    this.authservice.logout()
    this.router.navigate(['login']);
  }
  ngOnInit() {
    this.passresetform = this.fb.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required]
  });
  }
 // convenience getter for easy access to form fields
 get f() { return this.passresetform.controls; }
}
