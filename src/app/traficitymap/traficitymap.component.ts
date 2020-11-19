
import { Component, OnInit, ViewChild, Optional, OnChanges, SimpleChanges, Input, AfterViewInit } from '@angular/core';
import  * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { Map } from 'mapbox-gl';
import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { MatDialog } from '@angular/material/dialog';
import { GraphComponent } from '../graph/graph.component';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';
import { shareresservice } from '../services/shareres.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { gdataresponse } from '../services/gdataresponse.service';
import MapboxTraffic from '@mapbox/mapbox-gl-traffic';
import { AlertService } from '../services/alertservice';
import { loadingprogress } from '../services/loadingservice';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-traficitymap',
  templateUrl: './traficitymap.component.html',
  styleUrls: ['./traficitymap.component.css']
})
export class TraficitymapComponent implements OnInit {


    olat:any;
    olng:any;
    dlat:any;
    dlng:any;
    slat:any;
    slng:any;
    cord:any;
    opoint:any;
    dpoint:any;
    spoint:any;
    src_latlng:any;
    dest_latlng:any;
    directions:any;
    geojson:any;
   startlineid:any;
   endlineid:any;
   myForm: FormGroup;
   submitted = false;
   coordinatesGeocoder:any;
   congestionresponse:any[]=[];
   distance:any;
   custompoit:any;
   public loading :any= false;
   poi:any[]=[];
   @ViewChild("traficiytmap",{static:true})  date:any;
   @ViewChild("traficiytmap",{static:true})  time:any;
    @ViewChild("traficiytmap",{static:true}) map: Map;
  get mymap()
  {
  return this.map;
  }
  geocoder:any;
   showcongestion=function()
  {  this.loadgmmavgservice(this.src_latlng,this.dest_latlng,this.date,this.time);
}
    
 
  constructor(public fb: FormBuilder,    private alertService: AlertService,
 public showgraph:MatDialog,private myService: shareresservice,private congestionapiresp:gdataresponse,
 private spinner: NgxSpinnerService) { 
   
    navigator.geolocation.getCurrentPosition(position => {
      this.olat=position.coords.latitude;
      this.olng=position.coords.longitude;
      const userCoordinates = [this.olng, this.olat];
      this.cord=userCoordinates;
      this.map.flyTo({
        center: userCoordinates,
      });
      // lat long of current location
      this.opoint = new mapboxgl.LngLat(this.olng, this.olat);
    });
   
 
  }



//get date data from shared service.

getdatefromservice()
{
 this.myService.dateobs$.subscribe((date) => {
this.date=date;
    console.log("date from service",date);
}); 


}
gettimefromservice()
{
this.myService.timeobs$.subscribe( (time)=> {
this.time=time;
   //And he have data here too
    console.log("time from service",time);
    this.spinner.show();
    this.loadgmmavgservice(this.src_latlng,this.dest_latlng,this.date,this.time);
    this.loading=true;
},(err)=>{
  this.alertService.error(err);
  this.loading=false;

 //s this.loading = false;
});

}
//for congestion api response.
loadgmmavgservice(source: string,destination:string,date:string,time:string){
 if(source!=null&&destination!=null){  this.congestionapiresp.getprediction(source,destination,date,time).subscribe(     
    data=>
    {
    console.log("congestion:",data.route1);
    this.congestionresponse=data.route1;
    this.distance=data.distance1;
    this.map.on('load', this.showlinestring(this.congestionresponse));
    },err=>{
      this.spinner.hide();
      this.alertService.error('Connection Error !');

    });
    if (this.map.getLayer('linesource')){
      this.map.removeLayer('linesource');
    }
    this.alertService.clear();
  }
    else{
      this.spinner.hide();
      this.alertService.error("please select source and destination !");
 
    }
   
  }

  ngOnInit() {
   
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWhzYW4zNjgiLCJhIjoiY2p6M3M0cG1sMDY2cjNqbzYxMXdqNjc5cSJ9.6Ujt7e1LLesRc_FqdAMgxw';
     this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom:11,
      maxzoom:11
    
      });


      //zoom
      this.showzoomcontrols()
      // current location
      this.showlocation();
        //input as coordinates.
        this.inputascoord();
    // for poi searching
      this.showpoidata1();
      this.showpoidata2();
       //for service data reciever.
    this.getdatefromservice();
      this.gettimefromservice();
      this.getcoordinateonmouseclick();
    this.showtraffic();
    this.resetrouteandparams();
}
 customData = {
  features: [
    {
    'type': 'Feature',
    'properties': {
    'title': 'Supreme Court',
    'description':
    'Supreme Court of Pakistan'
    },
    'geometry': {
    'coordinates': [73.096864, 33.727987],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Pakistan National Accreditation Council',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.099581, 33.723983],
    'type': 'Point'
    }
    },
    
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'NAB Headquarters',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.101051, 33.721993],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Embassy of Switzerland',
    'description':
    'Embassy'
    },
    'geometry': {
    'coordinates': [73.102289, 33.721290],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'NBP and MOFA Attestation Block',
    'description':
    'Government office in Pakistan'
    },
    'geometry': {
    'coordinates': [73.103667, 33.718472],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Jinnah Convention Centre',
    'description':
    'Convention center in Islamabad'
    },
    'geometry': {
    'coordinates': [73.103634, 33.712073],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'WAPDA Rawal Rest House',
    'description':
    'Lodge in Islamabad'
    },
    'geometry': {
    'coordinates': [73.104890, 33.709030],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Dr Muhammad Hamidullah Library (IRI Library)',
    'description':
    'Library in Islamabad'
    },
    'geometry': {
    'coordinates': [73.040560, 33.729947],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Embassy of Uzbekistan',
    'description':
    'Embassy in Pakistan'
    },
    'geometry': {
    'coordinates': [73.037561, 33.718703],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Embassy of Kuwait',
    'description':
    'Embassy in Pakistan'
    },
    'geometry': {
    'coordinates': [73.054852, 33.727842],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Hockey Ground',
    'description':
    'Ground'
    },
    'geometry': {
    'coordinates': [73.088472, 33.710048],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'SNGPL CSC',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.085933, 33.712488],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'National Police Bureau',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.085887, 33.713217],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'NAB Islamabad,Rawalpindi Office',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.085887, 33.713217],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'CDA',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.086223, 33.714746],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Pakistan State Oil',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.083291, 33.717790],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'General Post Office',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.084734, 33.718573],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Election Commission of Pakistan',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.098704, 33.725077],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Wafaqi Mohtasib',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.097073, 33.727224],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Radio Pakistan',
    'description':
    'Broadcast Network'
    },
    'geometry': {
    'coordinates': [73.096199, 33.728220],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'FBR',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.096608, 33.727848],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Ministry of Interior Pakistan',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.094131, 33.734100],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Ministry of Narcotics Control',
    'description':
    'Government office in Islamabad'
    },
    'geometry': {
    'coordinates': [73.091488, 33.742027],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Punjab House Park',
    'description':
    'Park in Islamabad'
    },
    'geometry': {
    'coordinates': [73.089869, 33.744816],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Qatar Airways Islamabad',
    'description':
    'Qatarways Office in Jinnah Avenue, Islamabad'
    },
    'geometry': {
    'coordinates': [73.087452, 33.726195],
    'type': 'Point'
    }
    },
    
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Lahore Grammar School',
    'description':
    'School'
    },
    'geometry': {
    'coordinates': [73.087452, 33.726195],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Hotel Redison Blue Area',
    'description':
    'Hotel in Blue Area near Ataturk Avenue'
    },
    'geometry': {
    'coordinates': [73.087613, 33.725499],
    'type': 'Point'
    }
    }
    ,
    {
    'type': 'Feature',
    'properties': {
    'title': '5 Chalet Islamabad',
    'description':
    'Hotel in Blue Area near Pakistan Engineering Council'
    },
    'geometry': {
    'coordinates': [73.091089, 33.722448],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Islamabad Regalia Hotel',
    'description':
    'Hotel in Blue Area near 7th Avenue'
    },
    'geometry': {
    'coordinates': [73.083064, 33.709347],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'SERENA Hotel',
    'description':
    'Hotel in Blue Area in Khayaban-e-Suhrwardy'
    },
    'geometry': {
    'coordinates': [73.084865, 33.705640],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Islamabad Marriot Hotel',
    'description':
    'Hotel in Blue Area in Agha Khan Road'
    },
    'geometry': {
    'coordinates': [73.083116, 33.705183],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Islamabad Marriot Hotel',
    'description':
    'Hotel in Blue Area in Agha Khan Road'
    },
    'geometry': {
    'coordinates': [73.083116, 33.705183],
    'type': 'Point'
    }
    },
    
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Islamabad College for Girls',
    'description':
    'School Road F-6, Islamabad'
    },
    'geometry': {
    'coordinates': [73.086842, 33.733104],
    'type': 'Point'
    }
    },
    
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Hotel de Papáe (Intl)',
    'description':
    'Service ROad Near A.K Fazl-ul-Haq Road'
    },
    'geometry': {
    'coordinates': [73.078881, 33.720682],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Asian Wok',
    'description':
    'Turn near Nazim-ud-din Road'
    },
    'geometry': {
    'coordinates': [73.073259, 33.720371],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Khoka Khola',
    'description':
    'Turn near Nazim-ud-din Road'
    },
    'geometry': {
    'coordinates': [73.073382, 33.720252],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Emporium Mall',
    'description':
    ' Shopping Mall Near Service Road East'
    },
    'geometry': {
    'coordinates': [73.011570, 33.698712],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Mall of Islamabad',
    'description':
    ' Shopping Mall Near Jinnah Avenue, Islamabad'
    },
    'geometry': {
    'coordinates': [73.060357, 33.712599],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Safa Gold Mall',
    'description':
    ' Shopping Mall Near Bhittai Road, Islamabad'
    },
    'geometry': {
    'coordinates': [73.055895, 33.719304],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'The Centaurus Mall Islamabad',
    'description':
    ' Shopping Mall Near Nazim-ud-din, Islamabad'
    },
    'geometry': {
    'coordinates': [73.048491, 33.707762],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Zarai Taraqiati Bank Limited Islamabad Branch',
    'description':
    'Bank in Service Road West, Islamabad'
    },
    'geometry': {
    'coordinates': [73.055805, 33.707694],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Federal Government College for Women F-7/2',
    'description':
    ' Parveen Shakir ROad Near Faisal Market'
    },
    'geometry': {
    'coordinates': [73.048920, 33.716852],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'F.G. Margalla College for Women',
    'description':
    ' Parveen Shakir ROad Near Faisal Market'
    },
    'geometry': {
    'coordinates': [73.063715, 33.725415],
    'type': 'Point'
    }
    },
    
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Air University',
    'description':
    'Service Road E-9 / E-8 in front of University Road and near junction of Main Margalla Road and 9th Avenue'
    },
    'geometry': {
    'coordinates': [73.026505, 33.714105],
    'type': 'Point'
    }
    },
    
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Air University',
    'description':
    'University Road front in front of Bahria University'
    },
    'geometry': {
    'coordinates': [73.026470, 33.713817],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'IIslamabad Museum',
    'description':
    'Museum in Ataturk Avenue, Islamabad'
    },
    'geometry': {
    'coordinates': [73.096046, 33.719214],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'National College Of Learning Islamabad(Aabpara CAMPUS)',
    'description':
    'NCL located in Khayaban-e-Suhrwardy, Islamabad'
    },
    'geometry': {
    'coordinates': [73.085215, 33.705459],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Islamabad Traffic Police Office',
    'description':
    'ITP Driving License Center / Police Office'
    },
    'geometry': {
    'coordinates': [73.032507, 33.706031],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Fatima Jinnah Park',
    'description':
    'Park near Jinnah Avenue, Islamabad'
    },
    'geometry': {
    'coordinates': [73.026150, 33.694376],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Fatima Jinnah Park',
    'description':
    'Park near Jinnah Avenue, Islamabad'
    },
    'geometry': {
    'coordinates': [73.026150, 33.694376],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Islamabad Model College For Girls, G-9/2',
    'description':
    'Street 11, Ibn-e-Sina'
    },
    'geometry': {
    'coordinates': [73.026586, 33.688703],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Mehran Football Ground',
    'description':
    'Street 11, Ibn-e-Sina'
    },
    'geometry': {
    'coordinates': [73.025908, 33.688414],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Cricket Ground in Jinnah Avenue',
    'description':
    'Street 11, Ibn-e-Sina'
    },
    'geometry': {
    'coordinates': [73.018906, 33.690357],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Islamabad College for Girls',
    'description':
    'School Road in F-6'
    },
    'geometry': {
    'coordinates': [73.073712, 33.729220],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Pakistan Monument',
    'description':
    'National landmark with a museum near Khayaban-e-Suhrwardy'
    },
    'geometry': {
    'coordinates': [73.068830, 33.695615],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Embassy of Russia',
    'description':
    'Embassy in Islamabad'
    },
    'geometry': {
    'coordinates': [73.130384, 33.729034],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Embassy of Qatar',
    'description':
    'Embassy in Islamabad'
    },
    'geometry': {
    'coordinates': [73.133270, 33.730528],
    'type': 'Point'
    }
    },
    
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Embassy of Kuwait',
    'description':
    'Embassy in Islamabad'
    },
    'geometry': {
    'coordinates': [73.131739, 33.729746],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Poland Embassy',
    'description':
    'Embassy in Islamabad'
    },
    'geometry': {
    'coordinates': [73.125386, 33.728905],
    'type': 'Point'
    }
    },
    
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Embassy of United States',
    'description':
    'Embassy in Islamabad'
    },
    'geometry': {
    'coordinates': [73.117613, 33.724403],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Darul Uloom Islamabad',
    'description':
    'School in Islamabad'
    },
    'geometry': {
    'coordinates': [73.096506, 33.712634],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Aabpara Market',
    'description':
    'Market / Mall in Islamabad'
    },
    'geometry': {
    'coordinates': [73.087767, 33.706819],
    'type': 'Point'
    }
    },
    
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Chanab College F-8/4 Islamabad',
    'description':
    'College in Nazim-ud-din Road intersecting Jinnah Avenue'
    },
    'geometry': {
    'coordinates': [73.043615, 33.705463],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Fazaia Intermediate College, Islamabad',
    'description':
    'College in in Razzaq Road'
    },
    'geometry': {
    'coordinates': [73.022547, 33.714581],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'PAF Boys Hostel',
    'description':
    'Hostel in Street 2 connected with Razzaq Road'
    },
    'geometry': {
    'coordinates': [73.021736, 33.713079],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Islamabad Federal College',
    'description':
    'College in Street 30 near Shan-ul-Haq Haqqee Road'
    },
    'geometry': {
    'coordinates': [73.029770, 33.677650],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Universal College Islamabad',
    'description':
    'College near Street 25, Park ROad, Islamabad'
    },
    'geometry': {
    'coordinates': [73.034604, 33.712707],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Jinnah Muslim School and College, Islamabad',
    'description':
    'College in Khayaban-e-Suhrwardy, Islamabad'
    },
    'geometry': {
    'coordinates': [73.086247, 33.706010],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Iqra College of Technology, Islamabad',
    'description':
    'College in Khayaban-e-Johar near Service Road West W'
    },
    'geometry': {
    'coordinates': [73.039142, 33.659901],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Fazaia Intermediate College, Islamabad',
    'description':
    'College in Khayaban-e-Johar near Service Road West W'
    },
    'geometry': {
    'coordinates': [73.039142, 33.659901],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'The City School Capital Campus',
    'description':
    'College in Pitras Bukhari Road, Islamabad'
    },
    'geometry': {
    'coordinates': [73.065159, 33.678273],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'The City School Kg Branch',
    'description':
    'School in Sahibzada Abdul Qayyum Rd , Islamabad'
    },
    'geometry': {
    'coordinates': [73.067053, 33.672841],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'The City School Kg Branch',
    'description':
    'School in Service Rd N'
    },
    'geometry': {
    'coordinates': [72.985479, 33.689370],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'The City School E-11 Campus',
    'description':
    'School in Street 59, E-11, Islamabad'
    },
    'geometry': {
    'coordinates': [72.977107, 33.703916],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'The Knowledge City School',
    'description':
    'School in Street 29 near Sawan Road'
    },
    'geometry': {
    'coordinates': [73.013714, 33.678294],
    'type': 'Point'
    }
    },
    
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'The city school',
    'description':
    'School campus G-15 in 919 Street 35'
    },
    'geometry': {
    'coordinates': [72.922606, 33.625987],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'City School F8 Islamabad',
    'description':
    'School Campus F-8 in E-9/3'
    },
    'geometry': {
    'coordinates': [73.023386, 33.718684],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'The City School F-8/3 Nursery',
    'description':
    'School Campus F-8/3 in House no، 34 Main Margalla Rd, F-8/3 F 8/3 F-8, Islamabad'
    },
    'geometry': {
    'coordinates': [73.038195, 33.719049],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Beaconhouse School',
    'description':
    'School Campus I-9 in 137 Potohar Rd'
    },
    'geometry': {
    'coordinates': [73.053097, 33.655552],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Beaconhouse School System',
    'description':
    'School Campus in F-7, Taj Uddin Road'
    },
    'geometry': {
    'coordinates': [73.059706, 33.713877],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Beaconhouse',
    'description':
    'School Campus in F-8, Service Rd W'
    },
    'geometry': {
    'coordinates': [73.028495, 33.711390],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Beaconhouse Margalla Campus',
    'description':
    'School Campus Margalla H-8, Pitras Bukhari Road'
    },
    'geometry': {
    'coordinates': [73.065150, 33.681032],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Beaconhouse Margalla Campus',
    'description':
    'School Campus Margalla H-8, Pitras Bukhari Road'
    },
    'geometry': {
    'coordinates': [73.065150, 33.68103],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Beaconhouse Margalla Campus',
    'description':
    'School Campus Margalla H-8, Pitras Bukhari Road'
    },
    'geometry': {
    'coordinates': [73.065150, 33.68103],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Beaconhouse School SG2',
    'description':
    'School Campus I-9 in Potohar Rd, I 9/2 I-9, Islamabad'
    },
    'geometry': {
    'coordinates': [73.053100, 33.655551],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Beaconhouse School System',
    'description':
    'School Campus F-7, 38 Kohsar Road'
    },
    'geometry': {
    'coordinates': [73.053588, 33.726811],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Beaconhouse School System',
    'description':
    'School Campus I-8 Sahibzada Abdul Qayyum Road, Islamabad'
    },
    'geometry': {
    'coordinates': [73.067985, 33.673325],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Beaconhouse I9 Campus (Primary)',
    'description':
    'School Campus I-9 in Potohar Road, Islamabad'
    },
    'geometry': {
    'coordinates': [73.048811, 33.653299],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Beaconhouse School System, Kindergarten Branch',
    'description':
    'School Campus E-11 in Main Double Road, Islamabad'
    },
    'geometry': {
    'coordinates': [72.979415, 33.699526],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'KIPS College',
    'description':
    'College in G-9, Islamabad'
    },
    'geometry': {
    'coordinates': [73.032153, 33.688051],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Interactive Group',
    'description':
    'Corporate office in E-11/3 Markaz, Islamabad'
    },
    'geometry': {
    'coordinates': [72.979534, 33.703584],
    'type': 'Point'
    }
    },
    
    {
    'type': 'Feature',
    'properties': {
    'title': 'Saudi Pak Tower Building',
    'description':
    'Building in F-7/4 Blue Area, Islamabad'
    },
    'geometry': {
    'coordinates': [73.063525, 33.714393],
    'type': 'Point'
    }
    },
    ],
  type: "FeatureCollection"
};
 forwardGeocoder=(query)=> {
  var matchingFeatures = [];
  for (var i = 0; i < this.customData.features.length; i++) {
    var feature = this.customData.features[i];
    // handle queries with different capitalization than the source data by calling toLowerCase()
    if (
      feature.properties.title.toLowerCase().search(query.toLowerCase()) !== -1
    ) {
      // add a tree emoji as a prefix for custom data results
      // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
      feature["place_name"] =feature.properties.title;
      feature["center"] = feature.geometry.coordinates;
      matchingFeatures.push(feature);
    }
  }
  return matchingFeatures;
}
//get live traffic.
showtraffic()
{
  this.map.on('load', () => {
    this.map.addControl(new MapboxTraffic());
});
}
//get coordinate on mouse click
getcoordinateonmouseclick()
{
  this.map.on('click', (e) =>{
    document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        
        JSON.stringify(e.point) +
        '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat.wrap());
       // console.log(e.lngLat);
});

}

// current location function
 showlocation():void{
  this.map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: false
    },
    trackUserLocation: true,
    timeout: 5000,
    maximumAge: 0
  
    })
    );
};
//zoom control function
showzoomcontrols()
{
  this.map.addControl(new mapboxgl.NavigationControl());
};
//coordinates input.
inputascoord()
{
 this.coordinatesGeocoder = (query)=> {
  // match anything which looks like a decimal degrees coordinate pair
  var matches = query.match(
      /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
  );
  if (!matches) {
      return null;
  }

   function coordinateFeature(lng, lat) {
      return {
          center: [lng, lat],
          geometry: {
              type: 'Point',
              coordinates: [lng, lat]
          },
          place_name: 'Lat: ' + lat + ' Lng: ' + lng,
          place_type: ['coordinate'],
          properties: {},
          type: 'Feature'
      };
  }

  var coord1 = Number(matches[1]);
  var coord2 = Number(matches[2]);
  var geocodes = [];

  if (coord1 < -90 || coord1 > 90) {
      // must be lng, lat
      geocodes.push(coordinateFeature(coord1, coord2));
  }

  if (coord2 < -90 || coord2 > 90) {
      // must be lat, lng
      geocodes.push(coordinateFeature(coord2, coord1));
  }

  if (geocodes.length === 0) {
      // else could be either lng, lat or lat, lng
      geocodes.push(coordinateFeature(coord1, coord2));
      geocodes.push(coordinateFeature(coord2, coord1));
  }

  return geocodes;
};
}
// searching 
showpoidata1()
{
  this.geocoder= new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    localGeocoder:this.forwardGeocoder,
    mapboxgl: mapboxgl,
    placeholder:'Enter Source...',
    countries: 'pk',
    render:true,
    proximity :true

    });
    document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));
    // coordinates of destination.
    this.geocoder.on('result', (ev) =>{
      var styleSpec = ev.result;
      var ln= styleSpec.geometry.coordinates[0];
      var lt= styleSpec.geometry.coordinates[1];
      this.spoint = new mapboxgl.LngLat(ln, lt);
      this.slng=ln;
      this.slat=lt;
      this.src_latlng=(this.slng+","+this.slat);
  });
}
showpoidata2()
{
  this.geocoder= new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    localGeocoder: this.forwardGeocoder,
    marker: {
      color: 'red'
      },
    countries: 'pk',
    placeholder:'Enter Destination...',
    render:true,
    proximity :true
    });
    document.getElementById('geocoder1').appendChild(this.geocoder.onAdd(this.map));
    // coordinates of destination.
    this.geocoder.on('result', (ev)=> {
      var styleSpec = ev.result;
      var ln= styleSpec.geometry.coordinates[0];
      var lt= styleSpec.geometry.coordinates[1];
      this.dpoint = new mapboxgl.LngLat(ln, lt);
      this.dlng=ln;
      this.dlat=lt;
      this.dest_latlng=(this.dlng+","+this.dlat);
  });
}

//congestion line with colors
 showlinestring(data:any)
{ 

 
  if (this.map.getLayer('linesource')){
    this.map.removeLayer('linesource');
  }
  
  if (this.map.getSource('linesource')){
    this.map.removeSource('linesource');
  }
 

  var gdata = {
    "type": "FeatureCollection",
    "features": data
  };
      this.map.addLayer({
        id: "linesource",
        type: "line",
        source: {
          type:"geojson",
          data:gdata
        },
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": [
       
            "match",
            ["get", "level"],
            [ 
              '1',
            
            ],
            "#e02e2e",
            [
              '2',
           
            ],
    
            "#FA4F05",
            [
              '3',
             
            ],
            "#29EE02",
            "#29EE02"
          ],
          "line-width": 5
        }
      });

        var bounds = new mapboxgl.LngLatBounds();

        gdata.features.forEach((feature) =>{
          bounds.extend(feature.geometry.coordinates);
      });
      this.map.fitBounds(bounds);

        // var bbox = [[this.slng,this.slat], [this.dlng,this.dlat]];

        // this.map.fitBounds(bbox,{
        //   padding: -8
        // });
        var popup=new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });
        this.map.on('mouseenter', 'linesource', (e)=> {
          this.map.getCanvas().style.cursor = 'pointer';
         // var coordinates = e.features[0].geometry.coordinates
     
        popup.setLngLat(e.lngLat)
          .setHTML("<b>Distance</b>"+":"+this.distance+" "+"Km")
          .addTo(this.map);
        
          });
         
             
            // Change it back to a pointer when it leaves.
            this.map.on('mouseleave', 'linesource', ()=> {
            this.map.getCanvas().style.cursor = '';
            popup.remove();
            });
            this.spinner.hide();
    
}


//resetroute
  resetrouteandparams()
  {
    this.myService.resetrouteobs$.subscribe(route=>{
      if(route==1&&this.distance!=0)
      {
        if (this.map.getLayer('linesource')){
          this.map.removeLayer('linesource');
        }
        
        if (this.map.getSource('linesource')){
          this.map.removeSource('linesource');
        }
  
      }
    });
  }

}