import { Component, OnInit, ViewChild } from '@angular/core';
import { DGraphComponent } from '../d-graph/d-graph.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { sharedataservice } from '../d_services/sharedataservice';
import { dashboardservice } from '../d_services/dashboardservice';
import  * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Map } from 'mapbox-gl';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-d-map',
  templateUrl: './d-map.component.html',
  styleUrls: ['./d-map.component.css']
})
export class DMapComponent  implements OnInit {

  min:number;
  max:number;
  meansp:number;
  mspeed:any;
  olat:any;
  olng:any;
  dlat:any;
  dlng:any;
  cord:any;
  opoint:any;
  dpoint:any;
  directions:any;
  geojson:any;
   startnode:any;
   endnode:any;
    gdata:any;
    lane:any;
    roadtype:any;
   public myserv:sharedataservice;
   fromdatsrc:any;
   todatesrc:any;
   mapgeom:any[];
   roadname:any;
   options = {
    autoClose: false,
    keepAfterRouteChange: false
};
  @ViewChild("traficiytmap",{static:true}) map: Map;
  geocoder:any;
  getmindatefromservice()
  {
    this.myService.fromdate$.subscribe((fromdate)=>{
      this.fromdatsrc=fromdate;
    })
  }
  getmaxdatefromservice()
  {
    this.myService.todate$.subscribe((todate)=>{
      this.todatesrc=todate;
      this.loadgeojson(this.fromdatsrc,this.todatesrc,1);
    },err=>{
     console.log(err)
    })
    
  }
  constructor(public showgraph:MatDialog,public dialog:MatDialog,
    private _getgdataresp :dashboardservice,
    private myService: sharedataservice,
    private spinner: NgxSpinnerService,
     ) { 
      this.getmindatefromservice();
      this.getmaxdatefromservice();
      this. resetgeojson();
  }

  resetgeojson()
  {
    this.myService.reset_reloadgeojson$.subscribe(reset=>{
      console.log(reset);
      if(reset!=null)
      {
        this.resetgeo();

      }
    });
  }
  //get geojson from server.
  loadgeojson(fromdate:string,todate:string,flag:any)
  { 
    this.spinner.show();
    this._getgdataresp.getgeojosn(fromdate,todate,flag).subscribe( geom=>{

    this.mapgeom=geom;
    this.map.on('load', this.showgeojson(this.mapgeom));
    },err=>{
    
      this.spinner.hide();
    alert("Geojson is Not in Proper Format !");
    });

  }
  

  // on every load of 
  ngOnInit() {
   
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWhzYW4zNjgiLCJhIjoiY2p6M3M0cG1sMDY2cjNqbzYxMXdqNjc5cSJ9.6Ujt7e1LLesRc_FqdAMgxw';
     this.map = new mapboxgl.Map({
      container: 'map',
      center:[73.0479,
        33.6844],
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom:13,
      preserveDrawingBuffer: true
      });
  

      //zoom
      this.showzoomcontrols()
  
      this.addlayer();
     this.getfilterroadname();
     this.getfilterroadtype();
      this.getfilterdaynight();
   
}
getfilterroadname()
{
  this.myService.filter_roadname$.subscribe(rname=>{
  
 this.map.on('load',this.filtergeojson(rname)) ;
  })
}
getfilterroadtype(){
  this.myService.roadtype$.subscribe(type=>{

    this.map.on('load',this.filterroadtype(type));
  })
}
getfilterdaynight(){
  this.myService.dayandnight$.subscribe(dnt=>{

    if(dnt==null)
    {
      this.loadgeojson(this.fromdatsrc,this.todatesrc,1);

    }
    else{
      this.loadgeojson(this.fromdatsrc,this.todatesrc,dnt);

    }

  })
}
// resetgeojson
resetgeo(){
  this.map.on('load', this.showgeojson(this.mapgeom));
}
// current location function
 showlocation():void{
  this.map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true,
    
    })
    );
};

//zoom control function
showzoomcontrols()
{
  this.map.addControl(new mapboxgl.NavigationControl());
};
// searching 
showpoidata()
{
  this.geocoder= new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: 'pk',
    placeholder:'Search...',
    render:true
    });
    document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));
    // coordinates of destination.
    this.geocoder.on('result', function(ev) {
      var styleSpec = ev.result;
      var ln= styleSpec.geometry.coordinates[0];
      var lt= styleSpec.geometry.coordinates[1];
      this.dpoint = new mapboxgl.LngLat(ln, lt);
      console.info(this.dpoint);
      this.dlng=ln;
      this.dlat=lt;
  });  
}


//mean min ma service
getmmmeanparams(roadname:string,startnode: string,endnode:string,fromdate:any,todate:any,roadtype:any,lane:any){


 this.myService.getstartnode(startnode);
 this.myService.getendnode(endnode);
 this.myService.getsegfromdate(fromdate);
 this.myService.getsegtodate(todate);
 this.myService.getroadname(roadname)
 this.myService.getsegroadtype(roadtype);
 this.myService.getsegroadlane(lane);
  }
//show date ranged geojson.
showgeojson(geodata)
{
   try{
    this.spinner.hide();
    if (this.map.getLayer('geojson')){
      this.map.removeLayer('geojson');
    }
    
    if (this.map.getSource('geojson')){
      this.map.removeSource('geojson');
    }
   
  
     this.gdata = {
      "type": "FeatureCollection",
      "features": geodata
    };
  
       
      this.map.addLayer({
        id: "geojson",
        type: "line",
        source: {
          type:"geojson",
          data:this.gdata,
          lineMetrics: true
        },
        layout: {"line-join": "round",
        "line-cap": "round"},
       
        paint: {
         
         'line-color':[
          "interpolate",
          ["linear"],
          ["get", "meanspeed"],
          0,
          "#FF0000",
          20,
          "#F95F06",
          40,
          "#F97806",
          60,
          "#75F906",
          80,
          "#1CFF42",
          105,
          "#1CFF42"
        ],
            'line-width': 5,
            'line-opacity':['case',
            ['boolean', ['feature-state', 'hover'],false],
                0.8,
                0.5
        ],
        'line-dasharray':[3]
         
          },
        
         
      });
      var bounds = new mapboxgl.LngLatBounds();
          this.gdata.features.forEach((feature) =>{
            bounds.extend(feature.geometry.coordinates);
        });
        this.map.fitBounds(bounds);
      console.log("endtime",Date())
   }
   catch(error){
    this.spinner.hide();

     alert("Geojson not loading properly");
   }
   

  }
  filtergeojson(roadname:any)
  {
        this.map.setFilter('geojson',['==',
        'roadname',
        roadname]);
  }
  filterroadtype(roadtype:any)
  { if(roadtype!=null)
    {
     
      this.map.setFilter('geojson',['==','highway',roadtype]);

    }
    else{
      this.map.on('load',this.showgeojson(this.mapgeom))
    }
  }
  addlayer(){
    var popup=new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
  // for startnode and endnode on click event
    this.map.on('mouseenter', 'geojson', (e)=> {
      this.map.getCanvas().style.cursor = 'pointer';
      //var coordinates = e.features[0].geometry.coordinates
  
    popup.setLngLat(e.lngLat)
      .setHTML(e.features[0].properties.roadname+" <br> "+"Road Type:"+  e.features[0].properties.highway+" <br> "+"<b>Average Speed :</b> "+e.features[0].properties.meanspeed)
      .addTo(this.map);
    
      });

      this.map.on('click', 'geojson', (e)=> {
        this.startnode = e.features[0].properties.start_node;
        this.roadname=e.features[0].properties.roadname;
        this.endnode=e.features[0].properties.end_node;
        this.meansp= e.features[0].properties.meanspeed;
        this.roadtype= e.features[0].properties.highway;
        this.lane= e.features[0].properties.lanes;

      //this.showgraphdialog();
        if (e.features.length > 0) {
            //get params for mean min max value on click
        if (this.meansp) {
        this.map.setFeatureState(
        { source: 'geojson', id: this.meansp },
        { hover: false }
        );

        }
      
        this.getmmmeanparams(this.roadname,this.startnode,this.endnode,this.fromdatsrc,this.todatesrc,this.roadtype,this.lane)

        this.map.setFeatureState(
          { source: "geojson", id: this.meansp },
          { hover: true }
        );
        }
        });
   
        // Change it back to a pointer when it leaves.
        this.map.on('mouseleave', 'geojson', ()=> {
          if (this.meansp) {
            this.map.setFeatureState(
                { source: 'geojson', id: this.meansp },
                { hover: false }
            );
        }
        this.meansp = null;
        });
     
        this.map.on('mouseleave', 'geojson', ()=> {
          this.map.getCanvas().style.cursor = '';
          popup.remove();
          });
}

}