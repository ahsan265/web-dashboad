import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DMapComponent } from '../d-map/d-map.component';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay, startWith, subscribeOn } from 'rxjs/operators';
import { MatDialog, MatListOption, MatOption, MatRadioChange, MatSelectionList, MatSelectionListChange } from '@angular/material';
import { sharedataservice } from '../d_services/sharedataservice';
import { AuthenticationService } from 'src/app/auth/guard/authenccationservice';
import { Router, NavigationEnd } from '@angular/router';
import { dashboardservice } from '../d_services/dashboardservice';
import { AlertService } from 'src/app/services/alertservice';

@Component({
  selector: 'app-d-sidebar',
  templateUrl: './d-sidebar.component.html',
  styleUrls: ['./d-sidebar.component.css']
})


export class DSidebarComponent implements OnInit   {
  // for class variables.
  @ViewChild('days',{static:true}) days: MatSelectionList;
  
  @ViewChild('rushrs',{static:true}) hours: MatSelectionList;
  @ViewChild('road',{static:true}) road: MatRadioChange;
  @ViewChild('dnts',{static:true}) dnts: MatSelectionList;
  private controlNames = ['fromdate', 'todate'];

   rdname: string;
   day:any;
   geo:any;
   nsp:number[]=[];
   nodespeed:any[]=[];
   SEnodes:any[][]=[[],[]];
   wayid:any;
   fromdate:any;
   todate:any;
   form: FormGroup;
   minDate:any;
   maxDate:any;
   //for autcomplete 
   myControl =new FormControl();
   road_name: string[]=[];
   value:any;
   filteredOptions: Observable<string[]>;
   selectedOption;
   sdate:any;
   edate:any;
   currentCheckedValue = null;
 ///...............
 roads: string;
//  {time:'Full Day',flag:1},
   getvisualize:DMapComponent;
   dayofweek: any[] = ['SUN','MON', 'TUE', 'WED', 'THUR','FRI','SAT'];
   roadtype: string[] = ['primary','secondary', 'tertiary','primary_link','residential'];
   rushhours:any[]=['7am-10am','1pm-4pm','5pm-7pm','8pm-10pm']
   daynight:any[]=[{time:'Am',flag:2},{time:'Pm',flag:3}]
   ngOnInit(): void {
     this.form = this.fb.group({
       fromdate: [null, Validators.required],
       todate: [null, Validators.required],
     });
     this.sdate = new FormControl(new Date(2020, 0, 1));
     this.edate = new FormControl(new Date(2020, 0, 30));

     this.minDate = new Date(2020, 0, 1); 
       this.maxDate = new Date(2020, 0, 30);
       this.myService.getfromdate(this.minDate);
       this.myService.gettodate(this.maxDate);
       this.myService.getsegfromdate(this.maxDate);
       this.myService.getsegtodate("30/1/2020");
       this.getroadnames('1/1/2020','30/1/2020');
//for autocomplete
this.filteredOptions = this.myControl.valueChanges
.pipe(
  startWith(''),
  map(value => this._filter(value)));       
   }
   onsubmit()
  {
   
   
    this.fromdate=(<HTMLInputElement>document.getElementById('fromdate')).value; 
    this.todate=(<HTMLInputElement>document.getElementById('todate')).value; 
    console.log(this.fromdate,this.todate);
    var fd=new Date(this.fromdate);
    var td=new Date(this.todate);
  
    if(fd!=undefined&&td!=undefined)
    {
      this.myService.getfromdate(fd);
      this.myService.gettodate(td);
      this.myService.getsegfromdate(fd);
      this.myService.getsegtodate(td);

      this.getroadnames(fd,td);
    }
    else{
      alert("Please select from and to Date !");
    }
 
    this.days.deselectAll();
    this.hours.deselectAll();
    this.dnts.deselectAll();
    
  }
  resetform()
  {
    this.days.deselectAll();
    this.dnts.deselectAll();
    this.resetgeojson();
    this.myService.getresetstat(1);
    this.controlNames.map((value: string) => this.form.get(value));
  }

   
  private _filter(value: string): string[] {

  var rname =this.road_name.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) === 0);

return rname;
  
  }
 
   constructor(private breakpointObserver: BreakpointObserver,public dialog:MatDialog,
     public showgraph:MatDialog,public fb:FormBuilder,
     private authservice:AuthenticationService,private router:Router,private myService: sharedataservice,
     private geodataservice:dashboardservice,private ren: Renderer2
     ) {
       //console.log(this.maxDate,this.maxDate);
     
   }
   itemSelected (evt: any) {
    this.myService.getfilterroadname(evt.option.value);
  }
   logout()
   {
    this.authservice.logout();
    this.router.navigate(['login']);
   }
   getroadnames(fd:any,td:any)
   {
     this.geodataservice.findroadname(fd,td).subscribe(roadname=>{
        roadname.forEach(element => {
          if(element.roadname!=null)
          {
            this.road_name.push(element.roadname);
          }
        
        });
        this.myService.getroadnamearray(this.road_name);
     })
   }
  resetgeojson()
  {
    this.myService.getresetgeojson(1);
    this.controlNames.map((value: string) => this.form.get(value));

  
  }
  onroadtypechange(change: MatRadioChange) {
    this.hours.deselectAll();
    this.days.deselectAll();
    
    if(change.value!=null)
    {
      this.myService.getroadtype(change.value);
      if(change.source.checked)
      {
        change.source.checked=true;
      }
    }
   
 }
 clearroadtype()
 {
  this.myService.getroadtype(null);
 }

 ondaynightchange(change:MatSelectionListChange)
 {
  if(change.option.selected==true)
  {
    console.log(change.option.value.flag)
    this.myService.getdayandnight(change.option.value.flag);

  }
  else{
    this.myService.getdayandnight(null);

  }
 }

 ondaychange(options:MatListOption[])
 {
  this.myService.getdayofweek(options.map(o=>o.value));
  this.hours.deselectAll();
  this.dnts.deselectAll();
 }

 resetfilters()
 {
  this.days.deselectAll();
  this.myService.getresetfilter(1);
 }
 resethrsfilter()
 {  this.hours.deselectAll();
   this.myService.getresethrsfilter(1);
 }
 onrushhourschange(options:MatListOption[])
 { 
  this.myService.getrushhours(options.map(o=>o.value));
  this.dnts.deselectAll();
  
 }
 resetdaynnight()
 {
  this.dnts.deselectAll();
  this.resetgeojson();
 }

 }
 