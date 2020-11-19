import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, from, Subscription } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { AboutComponent } from '../about/about.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {gdatamodelclass} from '../model_class/gdata.model';
import{gmmavg} from '../model_class/gmmmean.model';
import{gspeednode} from'../model_class/gspeeddatanodemodel';
import {gdataresponse} from '../services/gdataresponse.service';
import {TraficitymapComponent} from '../traficitymap/traficitymap.component';
import {shareresservice} from '../services/shareres.service';
import { GraphComponent } from '../graph/graph.component';
import { AuthenticationService } from '../auth/guard/authenccationservice';
import { Router } from '@angular/router';
import { loadingprogress } from '../services/loadingservice';
import { User } from '../auth/usermodel/user';
import { dashboardservice } from '../dashboard/d_services/dashboardservice';
interface Time {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})

export class SidebarNavComponent implements OnInit  ,OnDestroy    {
  @ViewChild(TraficitymapComponent,{static:true}) traficity;

 // for class variables.
  rdname: string;
  min:number;
  max:number;
  meansp:number;
  mspeed:any;
  geo:any;
  nsp:number[]=[];
  nodespeed:any[]=[];
  SEnodes:any[][]=[[],[]];
  wayid:any;
  fromdate:any;
  todate:any;
  date:any;
  time:any;
  form: FormGroup;
  geocoder1:any;
  geocoder:any;
  currentUser: User;
  currentUserSubscription: Subscription;

  //for model
  getgdata:gdatamodelclass[]=[];
   getmmavg:gmmavg[]=[];
   getspeednode:gspeednode[]=[];
   public myserv:shareresservice;

  ngOnInit(): void {
   
  
    this.form = this.fb.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
    });
  

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
   // this.currentUserSubscription.unsubscribe();
}
  constructor(public dialog:MatDialog,
    public showgraph:MatDialog,public fb:FormBuilder,private myService: shareresservice,  
    private router: Router,
    private authservice:AuthenticationService,
    private geodata:dashboardservice) {
  
      this.authservice.currentUser.subscribe(x => this.currentUser = x);

  }
  //for form submission
  onsubmit()
  {
    this.date=(<HTMLInputElement>document.getElementById('date')).value;
    this.time=(<HTMLInputElement>document.getElementById('time')).value;
    this.geocoder=(<HTMLInputElement>document.getElementById('geocoder')).value;
    this.geocoder1=(<HTMLInputElement>document.getElementById('geocoder1')).value;

    console.log(this.geocoder);
    console.log(this.geocoder1);
    
      this.myService.getdate(this.date);
      this.myService.gettime(this.time);
   
   
  }
  resetform()
  {
    
    this.form.reset();
this.myService.getresetroute(1);

  }
  //for about component.
  openDialog()
  {
    this.dialog.open(AboutComponent,{
      height: 'auto',
      width: '600px',
    });
    
  }
  showgraphdialog()
  {
      this.showgraph.open(GraphComponent,{
          panelClass: 'graphdialognopadding',
          height: 'fit-content',
          width: 'auto',
        position: { top: '80px',right:'40px'},
        backdropClass:'none'
        });
  }
  loggedout(){
 
  this.authservice.logout();
   this.router.navigate(['/login']);
  }
}
