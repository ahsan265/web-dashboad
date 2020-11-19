import {Injectable} from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
 export class sharedataservice
{
    minobs$: Observable<any>;
    maxobs$: Observable<any>;
    mspobs$: Observable<any>;
    meanspeedobs$: Observable<any>;
    graphsobs$: Observable<any>;
    fromdate$: Observable<any>;
    todate$: Observable<any>;
    startnode$:Observable<any>;
    endnode$:Observable<any>;
    segfromdate$: Observable<any>;
    segtodate$: Observable<any>;
    roadname$: Observable<any>;
    filter_roadname$: Observable<any>;
    reset_reloadgeojson$: Observable<any>;
    roadtype$: Observable<any>;
    dayofweek$:Observable<any>;
    resetfilters$:Observable<any>;
    sendmmmean$:Observable<any>;
    dayandnight$:Observable<any>;
    segroadtype$:Observable<any>;
    segroadlane$:Observable<any>;
    rushhours$:Observable<any>;
    resethrsfilter$:Observable<any>;
    resetstats$:Observable<any>;
    roadnamearray$:Observable<any>;
    private minsubject = new Subject<any>();
    private maxsubject = new Subject<any>();
    private mspsubject = new Subject<any>();
    private meanspeedsubject = new Subject<any>();
    private fromdatesubject = new Subject<any>();

    private todatesubject = new Subject<any>();
    private segfromdatesubject = new Subject<any>();

    private segtodatesubject = new Subject<any>();
    private graphsubject = new Subject<any>();
    private startnodesubject = new Subject<any>();
    private endnodesubject = new Subject<any>();
    private rodnamesubject = new Subject<any>();
    private filterroadnamesubject = new Subject<any>();
    private reset_reloadgeojsonsubject = new Subject<any>();
    private roadtypesubject = new Subject<any>();
    private dayofweeksubject = new Subject<any>();
    private resetfiltersubject=new Subject<any>();
    private sendmmmeansubject=new Subject<any>();
    private dayandnightsubject=new Subject<any>();
    private segroadntypesubject=new Subject<any>();
    private segroadlanesubject=new Subject<any>();
    private rushhourssubject=new Subject<any>();
    private resethrsfiltersubject=new Subject<any>();
    private resetstatssubject=new Subject<any>();
    private roadnamearraysubject=new Subject<any>();

    constructor() {
        this.minobs$ = this.minsubject.asObservable().pipe();
        this.maxobs$ = this.maxsubject.asObservable().pipe();
        this.mspobs$ = this.mspsubject.asObservable().pipe();
        this.meanspeedobs$ = this.meanspeedsubject.asObservable().pipe();
        this.graphsobs$ = this.graphsubject.asObservable().pipe();
        this.fromdate$ = this.fromdatesubject.asObservable()
        this.todate$ = this.todatesubject.asObservable()
        this.startnode$ = this.startnodesubject.asObservable().pipe();
        this.endnode$ = this.endnodesubject.asObservable().pipe();
        this.segfromdate$=this.segfromdatesubject.asObservable().pipe();
        this.segtodate$=this.segtodatesubject.asObservable().pipe();
        this.roadname$=this.rodnamesubject.asObservable().pipe();
        this.filter_roadname$=this.filterroadnamesubject.asObservable().pipe();
        this.reset_reloadgeojson$=this.reset_reloadgeojsonsubject.asObservable().pipe();
        this.roadtype$=this.roadtypesubject.asObservable().pipe();
        this.dayofweek$=this.dayofweeksubject.asObservable().pipe();
        this.resetfilters$=this.resetfiltersubject.asObservable().pipe();
        this.sendmmmean$=this.sendmmmeansubject.asObservable().pipe();
        this.dayandnight$=this.dayandnightsubject.asObservable().pipe();
        this.segroadlane$=this.segroadlanesubject.asObservable().pipe();
        this.segroadtype$=this.segroadntypesubject.asObservable().pipe();
        this.rushhours$=this.rushhourssubject.asObservable().pipe();
        this.resethrsfilter$=this.resethrsfiltersubject.asObservable().pipe();
        this.resetstats$=this.resetstatssubject.asObservable().pipe();
        this.roadnamearray$=this.roadnamearraysubject.asObservable().pipe();
    }

    getmin(min:any) {
        //console.log(data); // I have data! Let's return it so subscribers can use it!
        // we can do stuff with data if we want
        this.minsubject.next(min);
    
    }
    getmax(max:any) {
        //console.log(data); // I have data! Let's return it so subscribers can use it!
        this.maxsubject.next(max);
    }
    getmeansp(msp:any) {
        //console.log(data); // I have data! Let's return it so subscribers can use it!
        // we can do stuff with data if we want
        this.mspsubject.next(msp);
    }
    getmeanspeeds(meanspeed:any[]) {
        //console.log(data); // I have data! Let's return it so subscribers can use it!
        // we can do stuff with data if we want
        this.meanspeedsubject.next(meanspeed);
    }
    getgraphlabels(label:any[][]) {
        this.graphsubject.next(label);
    }
    getfromdate(fromdate:any)
    {
this.fromdatesubject.next(fromdate)
    }
    gettodate(todate:any){
        this.todatesubject.next(todate)
    }

    getstartnode(startnode:any)
    {
        this.startnodesubject.next(startnode);
    }
    getendnode(endnode:any)
    {
        this.endnodesubject.next(endnode);
    }
    getsegfromdate(fromdate:any)
    {
        console.log(fromdate)
        this.segfromdatesubject.next(fromdate)
    }
    getsegtodate(todate:any)
    {    console.log(todate);
        this.segtodatesubject.next(todate)
    }
    getroadname(name:string)
    {
        console.log(name);
        this.rodnamesubject.next(name);
    }
    getfilterroadname(name:string)
    {
        this.filterroadnamesubject.next(name)
    };
    getresetgeojson(val:any)
    {
        this.reset_reloadgeojsonsubject.next(val);
    }
    getroadtype(type:any)
    {
        this.roadtypesubject.next(type);
    }
    getdayofweek(day:any[])
    {
        this.dayofweeksubject.next(day);
    }
    getresetfilter(val:any)
    {
        this.resetfiltersubject.next(val);
    }
    getsendsegmentmmmeans(val:any)
    {
        this.sendmmmeansubject.next(val);
    }
    getdayandnight(val:any)
    {
        this.dayandnightsubject.next(val);
    }
    getsegroadtype(val:any)
    {
        this.segroadntypesubject.next(val);

    }
    getsegroadlane(val:any)
    {
        this.segroadlanesubject.next(val);
    }
    getrushhours(val:any[])
    {   

        this.rushhourssubject.next(val);
    }
    getresethrsfilter(val:any)
    {
        this.resethrsfiltersubject.next(val);
    }
    getresetstat(val:any)
    {
        this.resetstatssubject.next(val);
    }
    getroadnamearray(val:any[])
    {
        this.roadnamearraysubject.next(val);
    }
 }