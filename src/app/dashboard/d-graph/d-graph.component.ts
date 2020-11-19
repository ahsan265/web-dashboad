import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { sharedataservice } from '../d_services/sharedataservice';
import { dashboardservice } from '../d_services/dashboardservice';
import * as Chart from 'chart.js';
import { AlertService } from 'src/app/services/alertservice';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Alert } from '../d_toast_model/toast_model';

@Component({
  selector: 'app-d-graph',
  templateUrl: './d-graph.component.html',
  styleUrls: ['./d-graph.component.css']
})
export class DGraphComponent implements OnInit,OnDestroy {
 
  meanspeed:any;
   min:any;
   max:any;
   gmspeedrange:Array<number>=[];
   graphlabels:any=[[],[]];
   start_node:any;
   end_node:any;
   from_date:any;
   to_date:any;
   daywisspeed:any[]=[];
   mmeanobject:any[];

    myChart;
    day:any[]=[];
    daywisespeed:any[]=[];
   
 constructor(private myService: sharedataservice,private _getgdataresp :dashboardservice,public showgraph:MatDialog,private alertservice:AlertService) { 

 }
  ngOnDestroy() {
    
  }
 
 ngOnInit() {
  this.getsegmentgraph(null,null)

   this.myService.startnode$.subscribe(sn=>{
     this.start_node=sn;
   })
   this.myService.endnode$.subscribe(en=>{
     this.end_node=en;
   
   })
   this.myService.segfromdate$.subscribe(fd=>{
 
   this.from_date=fd
  })
  this.myService.segtodate$.subscribe(td=>{
 
   this.to_date=td;
   if(this.start_node!=undefined&&this.end_node!=undefined&&this.from_date!=undefined&&this.end_node!=undefined)
   {
    this.loadminmaxmean(this.start_node,this.end_node,this.from_date,this.to_date);

    this.loaddaywisespeed(this.start_node,this.end_node,this.from_date,this.to_date);

   }
  },err=>{
    alert(err)
  })
  this.getdayofweekfilter();
  this.resetfilter();
  this.resetstats();
 }


//load min max meanspeed
loadminmaxmean(startnode: string,endnode:string,fromdate:string,todadte:string)
 {
   this._getgdataresp.gdatammmean(startnode,endnode,fromdate,todadte).subscribe( mmmean=>{
   
    if (mmmean!=null)
    
    {  this.myService.getsendsegmentmmmeans(mmmean);
      this.min= mmmean[0].min;
       this.max =mmmean[0].max;
  
       this.meanspeed= mmmean[0].meanspeed;

      }
      else{
        this.min="Null"
        this.max="Null"
        this.meanspeed="Null"
      }

   },err=>{
     alert(err)
   });
 }
 loaddaywisespeed(startnode: string,endnode:string,fromdate:string,todate:string)
 {   try{ this.day.length=0;
      this.daywisespeed.length=0;

   this._getgdataresp.getdaterangespeed(startnode,endnode,fromdate,todate).subscribe(daywise=>{
 this.day.length=0;
 this.daywisespeed.length=0;
   daywise.forEach(element => {
  
     this.daywisespeed.push(element.meanspeed)
     if(element.day==1)
     {
       this.day.push("SUN")
     } 
     else if(element.day==2)
     {
       this.day.push("MON");
     }
     else if(element.day==3)
     {
       this.day.push("TUE");
     }
     else if(element.day==4)
     {
       this.day.push("WED");
     }
     else if(element.day==5)
     {
       this.day.push("THUR");
     }
     else if(element.day==6)
     {
      this.day.push("FRI");
     }
     else if(element.day==7)
     {
      this.day.push("SAT");
     }
    
    
  },(err)=>{
    this.alertservice.error(err);
  });
   this.removeData(this.myChart);
   this.getsegmentgraph(this.day,this.daywisespeed)
 
 });
}
catch(err)
{
  alert(err);
}

 }
 


getsegmentgraph(day:any,speed:any)

{   
 
   var ctx = document.getElementById('segchart')as HTMLCanvasElement;
     this.myChart = new Chart(ctx, {
       type: 'bar',
       data: {
           labels:day,
           datasets: [{
               label: "Segment Wise Day Speed",
               data:speed,             
               borderWidth: 1,
               backgroundColor:['#3498db','#3498db','#3498db','#3498db','#3498db','#3498db','#3498db'],
              
           }]
       },
       options: {
        maintainAspectRatio:true,
        responsive: true,
           scales: {
               yAxes: [{
                   ticks: {
                       beginAtZero: true
                   }
               }]
           },
         layout: {
          padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
          }
        }
      }
   });
 }
//filter day-wise
getdayofweekfilter()
{ try{
  this.myService.dayofweek$.subscribe(day=>{

    for(var i=0;i<day.length;i++)
    {
       var a= this.day.find((fdv)=>{
          return fdv==day[i];
        });
     
      
         var indexnumber= this.day.indexOf(a);
        if(this.myChart.data.datasets[0].data[indexnumber]) 
       {this.myChart.data.datasets[0].backgroundColor[indexnumber]= '#F3B497';
           this.myChart.update();
         }
         else if(a==null)
         {   
           var b= this.day.find((fdv)=>{
             return fdv=day[i];
           });
           var indexnumber= this.day.indexOf(b);
           this.myChart.data.datasets[0].backgroundColor[indexnumber]= '#3498db';
           this.myChart.update();
         }
       }
   })
}
catch(err)
{
  alert(err);
}
 
}
//reset filter
 resetfilter()
 {
   try{
    this.myService.resetfilters$.subscribe(resetfilter=>{
     
      if(resetfilter!=null)
      {
        this.day.forEach((val)=>{
          var indexnumber= this.day.indexOf(val);
          var a=this.myChart.data.datasets[0].backgroundColor[indexnumber]= '#3498db';
         var aa=this.day.find((find)=>{
           return find;
         })
          this.myChart.update();
        })
      }
     })
   }
   catch(err)
   {
    alert(err);
   }
  
 }
 removeData(chart:any) {
  if(chart !== undefined ||chart !== null){
    chart.destroy();
}
 }
  //reset stats on graph
  resetstats()
  {
    this.myService.resetstats$.subscribe(rst=>{
  
      if(rst==1)
      {
        this.removeData(this.myChart);
        this.meanspeed=0;
        this.min=0;
        this.max=0;
      }
 
    })
  }
}
