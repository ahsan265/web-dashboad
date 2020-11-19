import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DMapComponent } from './d-map/d-map.component';
import { DSidebarComponent } from './d-sidebar/d-sidebar.component';
import { DDashboardviewComponent } from './d-dashboardview/d-dashboardview.component';
import { DGraphComponent } from './d-graph/d-graph.component';
import { dashboardservice } from './d_services/dashboardservice';
import { sharedataservice } from './d_services/sharedataservice';
import { StatisticsviewComponent } from './statisticsview/statisticsview.component';
import { DReportComponent } from './d-report/d-report.component';
import { NgxSpinnerService } from "ngx-spinner";



@NgModule({
  declarations: [DMapComponent, DSidebarComponent, DDashboardviewComponent, DGraphComponent, StatisticsviewComponent, DReportComponent],
  imports: [
    CommonModule,
  ],
  providers: [dashboardservice,sharedataservice,NgxSpinnerService],
  bootstrap: [StatisticsviewComponent]

})
export class DashboardModule { }
