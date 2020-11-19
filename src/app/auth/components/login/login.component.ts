import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarNavComponent } from 'src/app/sidebar-nav/sidebar-nav.component';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alertservice';
import { AuthenticationService } from '../../guard/authenccationservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  hide = true;
  returnUrl: string;
  submitted = false;
  loading = false;


  constructor( 
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    ) {

 // redirect to home if already logged in
 if (this.authenticationService.currentUserValue) { 
  this.router.navigate(['main']);
}
}
  login()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
   

        this.authenticationService.login(this.loginForm.value.email,this.loginForm.value.password)
            .pipe(first())
            .subscribe(
                data => {
                  console.log("userinformation",data);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

  }
  register()
  {
    this.router.navigate(['register']);
  }
  ngOnInit() {

 
    this.loginForm = this.fb.group({
      email: [null, Validators.required,Validators.email],
      password: [null, Validators.required]
  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }



   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }
 resetpass()
 {
  this.router.navigate(['/resetpassword']);

 }
}
