import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { dashboardservice } from '../d_services/dashboardservice';
import { sharedataservice } from '../d_services/sharedataservice';
import { from } from 'rxjs';
import { window } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alertservice';
import { jsPDF } from "jspdf";
import html2canvas, { Options } from 'html2canvas';
import {UserOptions} from 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/userservice';
import { invalid } from '@angular/compiler/src/render3/view/util';
interface jsPDFPLUGIN extends jsPDF{
  autotable: (options:UserOptions)=> jsPDF;
}
@Component({
  selector: 'app-statisticsview',
  templateUrl: './statisticsview.component.html',
  styleUrls: ['./statisticsview.component.css']
})
export class StatisticsviewComponent implements OnInit {
  em:any;
  name:any;
  email:any;
  constructor(private getgeodata:dashboardservice ,private sharedres:sharedataservice,private alertservice:AlertService,private userservice:UserService,
    private spinner: NgxSpinnerService) {
   this.em= JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.em.message);

    this.userservice.loaduserprofile(this.em).subscribe(profile=>{
      console.log("prof",   profile.name);
      this.name=profile.name;
      this.email=profile.email;
   
    },err=>{
      console.log(err);
    }) 
   }
  show=true;
  totalroad:any;
  mildroad:any;
  congestedroad:any;
  freeroad:any;  
  speed:any[]=[];
  days:any[]=[];
 fromdate:any;
 todate:any;
 roadname:any;
 rmean:any;
 rmax:any;
 rmin:any;
 smin:any;
 smax:any;
 smean:any;
 //segments congestion ratio
  totalsegemnts:any;
  congestedseg:any;
  mildseg:any;
  freeseg:any;
  fddate:any;
  tddate:any;
  dayofweekfilter:any[];
  dayofweek:any[];
  hrmyChart;
  daywisechart;
  congpiechartl;
  rushrchart;
  window: any;
  segmin:any;
  segmax:any;
  segmean:any;
  segroadlane:any;
  segroadtype:any;
  //rushhours:string[]=['7am-10am','10am-4pm','4pm-7pm','7pm-12pm','12am-7am']
  roadarray:any[];
  congestionhrs:any[]=[];
  congestionhrsspeed:any[]=[];
  ngOnInit() {
  
       //show rush hours
    this.showrushhoursgraph(null,null);
    this.sharedres.segfromdate$.subscribe(fd=>{
   this.fromdate=fd;
   this.fddate=new Date(fd).toDateString();
   
    },err=>{
      console.log(err);
    })
    //get to and from date
    this.sharedres.segtodate$.subscribe(td=>{
      this.todate=td;
      this.gettotalmildfreecong(this.fromdate,this.todate);
      this.tddate=new Date(td).toDateString();   
    },err=>{
      console.log(err);
    })
  
    // get segment mean min max speed for report
    this.sharedres.sendmmmean$.subscribe(mmmean=>{
      this.segmin=mmmean[0].min;
      this.segmax=mmmean[0].max;
      this.segmean=mmmean[0].meanspeed;
    },err=>{
      console.log(err)
    })
    
    //get road lane.
    this.sharedres.segroadlane$.subscribe(roadlane=>{
      if(roadlane!=null)
      {
        this.segroadlane='lanes:'+roadlane;
      }
  
    },err=>{
      console.log(err);
    })
  //get roadname
 
      this.sharedres.roadname$.subscribe(rn=>{
    
        this.roadname=rn;
        this.loaddaywisemeanspeedusingroad(rn,this.fromdate,this.todate);
        this.loadhourlyroadnamespeed(rn,this.fromdate,this.todate);
        this.loadroadnamewiseminmaxmean(rn,this.fromdate,this.todate);
        this.loadroadnamewisetotalcongestedsegratio(rn,this.fromdate,this.todate);
        this.getcongestedload(rn,this.fromdate,this.todate);
        this.show=false;
      },err=>{
        console.log(err);
      })
    //get road type
    this.sharedres.segroadtype$.subscribe(roadtype=>{
      this.segroadtype=roadtype;
    },err=>{
      console.log(err);
    })
   //get filter roadnames
   this.sharedres.roadnamearray$.subscribe(roadnamearray=>{
     this.roadarray=roadnamearray;

   })

    //function calling.
    this.getfilterrushhours();
    this.getfilterdayofweek();
    this.showhourlygraph( null,null);
    this.showminmaxspeed_of_segment(null,null);
    this.showhourlygraph(null,null);
    this.showpiechart(null,null,null);
    this.resetfilter();
    this.resethrsfilter();
    this.resetstats();

  }
gettotalmildfreecong(fromdate:any,todate:any)
{
   //get mild congested roads
   this.getgeodata.gettotalroads(fromdate,todate).subscribe(totalroads=>{
    if(totalroads.length!=0)
    { this.totalroad=  totalroads[0].totalroad;
     this.congestedroad=  totalroads[0].congestedroad;
     this.freeroad=   totalroads[0].freeroad;
     this.mildroad=  totalroads[0].mildroad;
    console.log(this.congestedroad,this.freeroad,this.mildroad);
    }
     },err=>{
       console.log(err);
     })
}
//get road wise mean min max speed
  loaddaywisemeanspeedusingroad(roadname:string,sd:string,ed:string)
 {
       var a= this.filteroadname(roadname);
    
      this.getgeodata.getroadwisedayavgspeed(roadname,sd,ed).subscribe(roadwaywise=>{
        this.days.length=0;
        this.speed.length=0;
       roadwaywise.forEach(element => {
       if(element.length!=0){ this.speed.push(element.meanspeed);
           if(element.day==1)
          {
            this.days.push("SUN");
          } 
          else if(element.day==2)
          {
            this.days.push("MON");
          }
          else if(element.day==3)
          {
            this.days.push("TUE");
          }
          else if(element.day==4)
          {
            this.days.push("WED");
          }
          else if(element.day==5)
          {
            this.days.push("THUR");
          }
          else if(element.day==6)
          {
           this.days.push("FRI");
          }
          else if(element.day==7)
          {
           this.days.push("SAT");
          }}
         else {
          
           this.alertservice.error("Data is Insufficient");
          }
         
          this.removeData(this.daywisechart);
          this.showminmaxspeed_of_segment(this.days,this.speed); 
       
      
         
       });
    
      
  
         
       
      
      },(err)=>{
       console.log(err);
     })
  
 }
 loadhourlyroadnamespeed(name:string,fd:string,td:string)
 {
   var hour =[];
   var speed=[];
  
   var a= this.filteroadname(name);
  this.getgeodata.getroadnamehourlyspeed(name,fd,td).subscribe(hourly=>{
    hourly.forEach(element => {
      hour.push(element.hours);
      speed.push(element.meanspeed);
    });
    this.removeData(this.hrmyChart);

    this.showhourlygraph(hour,speed);
  },err=>{
    console.log(err);
  })
 }
 loadroadnamewiseminmaxmean(name:any,fd:any,td:any)
 {
  var a= this.filteroadname(name);
 
    this.getgeodata.getroadnamewisemeanminmax(name,fd,td).subscribe(rmmm=>{
      if(rmmm.length!=0)
      {
        this.rmean=rmmm[0].meanspeed;
        this.rmin=rmmm[0].min;
        this.rmax=rmmm[0].max;
      }
 
    },err=>{
     console.log(err);
   })
  }
 
 loadroadnamewisetotalcongestedsegratio(name:any,fd:any,td:any)
{
  var a= this.filteroadname(name);
  var cong,mild,free;
  this.getgeodata.getroadnamewisetotalcongestionratio(name,fd,td).subscribe(tcmf=>{
    if(tcmf.length!=0)
    { this.totalsegemnts=tcmf[0].totalroadsegments;
      //congested segments
      cong=tcmf[0].congestedroadsegments;
      this.congestedseg=(cong/this.totalsegemnts)*100;
      // mild segments

      mild=tcmf[0].mildroadsegments;
      this.mildseg=(mild/this.totalsegemnts)*100;
      //free segments
      free=tcmf[0].freeroadsegments;
      this.freeseg=(free/this.totalsegemnts)*100;
      
        this.removeData(this.congpiechartl);

        this.showpiechart(this.congestedseg,this.mildseg,this.freeseg);
  
    }
    else{
      alert("Data Is insufficient");

    }
  },err=>{
alert("Data Is insufficient");
  })
}
 showrushhoursgraph(hr:any,mean:any)
{
  var ctx = document.getElementById('barchart')as HTMLCanvasElement;
this.rushrchart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: hr,
        datasets: [{
            label: 'Mean Speed',
            data: mean,
            backgroundColor: [
              '#3498db','#3498db','#3498db','#3498db','#3498db'
               
            ]
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
          display: true,
          labels: {
              fontColor: 'rgb(255, 99, 132)',
              fontFamily:'Helvetica'
          }
      },
      maintainAspectRatio:true,
      responsive: true,


    }

});

}
showpiechart(cong:any,mild:any,free:any)
{
  var ctx = document.getElementById('piechart')as HTMLCanvasElement;

  this.congpiechartl = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Congested", "Mild", "Free" ],
      datasets: [{
        backgroundColor: [
          "#ff1744",
          "#f44336",
          "#00c853"
        ],
        data: [cong, mild, free]
      }]

    },
    options:{
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
showminmaxspeed_of_segment(day:any,speed:any)
{

  var ctx = document.getElementById('minmaxmean')as HTMLCanvasElement;
 this.daywisechart = new Chart(ctx, {})
    this.daywisechart = new Chart(ctx, {
    type: 'bar',
    data:{
      labels: day,
      datasets: [{
        label: 'Road Wise Day Speed',
        backgroundColor:['#3498db','#3498db','#3498db','#3498db','#3498db','#3498db','#3498db'],
        data: speed,
        fill: false,
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
    },
   
  });
  
  
    
  
}
showhourlygraph( hour:any,speed:any)
{	 

  var ctx = document.getElementById('hourlychart')as HTMLCanvasElement;

  this.hrmyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: hour,
        datasets: [{
            label: 'Hourly Speed',
            data:speed,
            backgroundColor:'#4CA3FF',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        maintainAspectRatio:true,
        responsive: true,
      
      layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
      },
      legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 99, 132)',
            fontFamily:'Helvetica'
        }
    }
  }
});
}
 getfilterdayofweek(){
  try{ this.sharedres.dayofweek$.subscribe(filterday=>{
  
    for(var i=0;i<filterday.length;i++)
    {
       var a= this.days.find((fdv)=>{
          return fdv==filterday[i];
        });
        
         var indexnumber= this.days.indexOf(a);
        if(this.daywisechart.data.datasets[0].data[indexnumber]) 
       {this.daywisechart.data.datasets[0].backgroundColor[indexnumber]= '#F3B497';
           this.daywisechart.update();
         }
      
       }
   })}
   catch(err)
   {
     console.log(err);
   }
 }
 getfilterrushhours()
 {
   try{
   this.sharedres.rushhours$.subscribe(filterushrs=>{
     console.log(filterushrs)
     for(var i=0;i<filterushrs.length;i++)
     {
       var a =this.congestionhrs.find((rushhrs)=>{
         return rushhrs==filterushrs[i];
       });
       var indexnumber=this.congestionhrs.indexOf(a);
       if(this.rushrchart.data.datasets[0].data[indexnumber])
       {
         this.rushrchart.data.datasets[0].backgroundColor[indexnumber]='#F3B497';
         this.rushrchart.update();
       }
       else{
        this.rushrchart.data.datasets[0].backgroundColor[1]='#3498db';
        this.rushrchart.update();
       }

     }

   })}
   catch(err)
   {
     console.log(err);
   }
 }
 resetfilter()
 {

   this.sharedres.resetfilters$.subscribe(resetfilter=>{
     
    if(resetfilter!=null)
    {
      this.days.forEach((val)=>{
        var indexnumber= this.days.indexOf(val);
        this.daywisechart.data.datasets[0].backgroundColor[indexnumber]= '#3498db';
        this.daywisechart.update();
      })
    }
   })
 }

 resethrsfilter()
 {
   this.sharedres.resethrsfilter$.subscribe(resethrs=>{
     console.log(resethrs);

    if(resethrs!=null)
    {
      this.congestionhrs.forEach((val)=>{
        var indexnumber= this.congestionhrs.indexOf(val);
        this.rushrchart.data.datasets[0].backgroundColor[indexnumber]='#3498db';
        this.rushrchart.update();
      })
    }
   })
 }
 removeData(chart:any) {
  if(chart !== undefined ||chart !== null){
    chart.destroy();

}
}
report()
 {
   
  try { this.spinner.show();
   var rep=document.getElementById('segchart');
   var map=document.getElementById('map');
   var roadnamewise=document.getElementById('minmaxmean');
   var roadnamewisepie=document.getElementById('piechart');
   //var roadnamewisehrl=document.getElementById('hourly');

  
   var doc=new jsPDF();
   doc.setFontSize(22)
   doc.setFont('helvetica'); 
   doc.text('Trafficity Report',10, 25)



   doc.setFontSize(14)
   doc.setFont('courier')
   doc.text('Name:'+this.name,10,40)

   doc.setFontSize(14)
   doc.setFont('courier')
   doc.text('Email:'+this.email,10,45)

   doc.setFontSize(14)
   doc.setFont('courier')
   doc.text('Address:Pieas Nilore, Islamabad',10,50)

   doc.setFontSize(12)
   doc.setFont('courier')
   doc.text(this.fddate+'/'+this.tddate,10,55)


   doc.setFontSize(10)
   doc.setFont('courier')
   doc.text('Map:',10,58)
  html2canvas(map).then((mapv)=>{
    var image= mapv.toDataURL('image/png')
    doc.addImage(image,'png',10,60,190,60)
  })
  


 var image='./assets/logo/logoo.png'
   // image logo
   doc.addImage(image,'png',150,0,40,40)
  
  

  doc.setFontSize(12)
  doc.setFont('courier','bold')
  doc.text('Filters ',10,120)
  doc.setFontSize(12)
  doc.setFont('courier')
  doc.text(this.roadname,10,130)
// rectangle for filter options selected.
  // doc.rect(10, 125, 190,20);
  // doc.setFontSize(12)
  // doc.setFont('courier','normal')
  // doc.text('Days Filters:',12,130)
  // doc.text('SUN',45,130)
  // doc.text('MON',60,130)
  // doc.text('TUE',75,130)
  // doc.text('WED',90,130)
  // doc.text('THU',105,130)
  // doc.text('FRI',120,130)
  // doc.text('SAT',135,130)
  doc.setFontSize(12)
  doc.setFont('courier','normal')
  doc.text('Road Catagory:',10,135)
  if(this.segroadlane!=null&&this.segroadtype!=null)
  {
    doc.text(this.segroadtype,46,135)
    doc.text(this.segroadlane,70,135)
  }



  doc.setFontSize(12)
  doc.setFont('courier','bold')
  doc.text('Graphs:',10,152)
  doc.rect(10, 155, 190,140);
        var s_min=this.segmin.toString();
        var s_max=this.segmax.toString();
        var s_mean=this.segmean.toString();
  doc.text('Segement Wise Details',12 ,160)
  doc.text('Min Speed:',100,175)
  doc.text(s_min,150,175)
  doc.text('Max Speed:',100,195)
  doc.text(s_max,150,195)
  doc.text('Mean Speed:',100,215)
  doc.text(s_mean,150,215)
 
  var min=this.rmin.toString();
  var max=this.rmax.toString();
  var mean=this.rmean.toString();
 

  doc.text('Road Wise Details',12 ,230)
  doc.text('Min Speed',30,235)
  doc.text('Max Speed',90,235)
  doc.text('Mean Speed',150,235)
  doc.text(min,30,240)
  doc.text(max,90,240)
  doc.text(mean,150,240)

  html2canvas(rep).then((pdf)=>{
    var imgdata=pdf.toDataURL('image/png') 
    doc.addImage(imgdata,'png',12,162,80,60);

   });
   html2canvas(roadnamewise).then((pdf)=>{
    var imgdata=pdf.toDataURL('image/png') 
    doc.addImage(imgdata,'png',12,242,80,50);
   });
   html2canvas(roadnamewisepie).then((pdf)=>{
    var imgdata=pdf.toDataURL('image/png') 
    doc.addImage(imgdata,'png',100,242,80,50);
    doc.save(this.name+'.pdf')
   this.spinner.hide();
   });}
   catch(err)
   {

     this.spinner.hide();
     alert('Data is not enough for report generation !')
   }
 
  
 }
 //reset stats on graph
 resetstats()
 {
   this.sharedres.resetstats$.subscribe(rst=>{
     console.log("reset all",rst)
     if(rst==1)
     {

      this.removeData(this.rushrchart);
      this.removeData(this.congpiechartl);
      this.removeData(this.daywisechart);
      this.removeData(this.hrmyChart);
      this.rmax=0;
      this.rmean=0;
      this.rmin=0;
      this.segmax=0;
      this.segmean=0;
      this.segmin=0;
      this.roadname="";
      this.segroadlane="";
      this.segroadtype="";
  

  
     }

   })
 }
 //filte roadname 
 filteroadname(name:any)
 {
   console.log(this.roadarray)
 return this.roadarray.filter(x=>{
   if(x==name)
   {
     return true;
   }
   else{
     return false;
   }
 })
 }
   //getcongested road
   getcongestedload(road:any,fromdate:any,todate:any)
   {
    this.getgeodata.findcongestionslot(road,fromdate,todate).subscribe(roadwaywise=>{
      this.congestionhrs.length=0;
      this.congestionhrsspeed.length=0;
   console.log(roadwaywise)
     roadwaywise.forEach(element => {
     if(element.length!=0){ 
       this.congestionhrsspeed.push(element.meanspeed);
         if(element.day==7)
        {
          this.congestionhrs.push("7am-10am");
        } 
        else if(element._id==13)
        {
          this.congestionhrs.push("1pm-4pm");
        }
        else if(element._id==17)
        {
          this.congestionhrs.push("5pm-7pm");
        }
        else if(element._id==20)
        {
          this.congestionhrs.push("8pm-10pm");
        }
      }
       else {
        
         this.alertservice.error("Data is Insufficient");
        }
       
        this.removeData(this.rushrchart);
        this.showrushhoursgraph(this.congestionhrs,this.congestionhrsspeed)
     });
  
    

       
     
    
    },(err)=>{
     console.log(err);
   })
   }
}
