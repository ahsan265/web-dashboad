import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartColor } from 'chart.js';
import { Label } from 'ng2-charts';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';
import { shareresservice } from '../services/shareres.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
 
   gmspeed:any;
    gmin:any;
    gmax:any;
    gmspeedrange:Array<number>=[];
    graphlabels:any=[[],[]];
   
  constructor(private myService: shareresservice) { 
  
    this.showmin();
    this.showmax();
  }

  ngOnInit() {
     
    var ctx = document.getElementById('myChart')as HTMLCanvasElement;
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels:['M'
              ,'Tu'
              ,'W'
              ,'Th'
              ,'F'
              ,'Sa'
              ,'Su'],
            datasets: [{
                label: 'speed',
                data: this.gmspeedrange,
             
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
            
        }
    });
  }
 
 showmin()
 {
  this.myService.dateobs$.subscribe((date) => {
 
    //And he have data here too
     console.log("min",date);
 });

 }
 showmax()
 {
  this.myService.timeobs$.subscribe((time) => {
  
 
    //And he have data here too
     console.log("time",time);
 });

 }




}
