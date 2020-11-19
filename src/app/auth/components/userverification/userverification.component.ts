import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { shareresservice } from 'src/app/services/shareres.service';

import { credentialservice } from '../../userservice/credentialservice';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/userservice';
import { AlertService } from 'src/app/services/alertservice';
import { User } from '../../usermodel/user';

@Component({
  selector: 'app-userverification',
  templateUrl: './userverification.component.html',
  styleUrls: ['./userverification.component.css']
})
export class UserverificationComponent implements OnInit,OnDestroy ,OnChanges {
  private subscription: Subscription;
  public show:boolean = false;

email:string;
verficationform:FormGroup;
  constructor(private fb:FormBuilder,
    private router: Router,
    private alertService:AlertService,

    private userservice:UserService,
    private route:ActivatedRoute)
            { 
       this.email=  route.snapshot.paramMap.get("email");
       console.log(this.email);
  }
  ngOnChanges() {

  }
  


  verify()
  {
    this.userservice.verifyuser(this.email)
    .pipe()
    .subscribe((data)=>{
    this.alertService.success("Pleasse check your email for instruction",true);
    },(err)=>{
      this.alertService.error(err,true);

    })
    
   // 
  }
  verified()
  
  { 
      console.log(this.verficationform.value)
    this.userservice.verifieduser(this.email,this.verficationform.value)
    .pipe()
    .subscribe(data=>{
      console.log(data);
this.alertService.success("Register Successfully",true);
this.router.navigate(['/login']);
    },err=>{
      this.alertService.error(err,true);

    })
  }
  ngOnInit() {
    
    this.verficationform = this.fb.group({
      email: [null, Validators.required],
      verification_token: [null, Validators.required]

  });
  }
  ngOnDestroy() {
    //this.subscription.unsubscribe();
}
get f() { return this.verficationform.controls; }

}
