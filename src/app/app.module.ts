import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TraficitymapComponent } from './traficitymap/traficitymap.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatCheckboxModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { GraphComponent } from './graph/graph.component';
import {gdataresponse} from './services/gdataresponse.service'
import {shareresservice} from './services/shareres.service'
import { ChartsModule } from 'ng2-charts';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http'; 
import { from } from 'rxjs';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import { UserService } from './services/userservice';
import { AlertService } from './services/alertservice';
import {MatMenuModule} from '@angular/material/menu';
import { DMapComponent } from './dashboard/d-map/d-map.component';
import { DDashboardviewComponent } from './dashboard/d-dashboardview/d-dashboardview.component';
import { DSidebarComponent } from './dashboard/d-sidebar/d-sidebar.component';
import { dashboardservice } from './dashboard/d_services/dashboardservice';
import { DGraphComponent } from './dashboard/d-graph/d-graph.component';
import { AlertComponent } from './auth/components/alert/alert.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { loadingprogress } from './services/loadingservice';
import { routing } from './auth/auth-routing.module';
import { StatisticsviewComponent } from './dashboard/statisticsview/statisticsview.component';
import { ProfileComponent } from './auth/components/profile/profile.component';
import {LayoutModule} from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';
import { DReportComponent } from './dashboard/d-report/d-report.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    TraficitymapComponent,
    SidebarNavComponent,
    AboutComponent,
    GraphComponent,
    HeaderComponent,
    DMapComponent,
    DDashboardviewComponent,
    DSidebarComponent,
    DMapComponent,
    DGraphComponent,
    StatisticsviewComponent,
    DReportComponent
  ],
  entryComponents:[AboutComponent,DGraphComponent],
  imports: [
  
    NgxSpinnerModule,
    MatExpansionModule,
    MatProgressBarModule,
    LayoutModule,
    FlexLayoutModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule,
    ChartsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AuthModule,
    RouterModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    
    MatFormFieldModule,
    MatInputModule,
    
    MatCheckboxModule,
  
    MatProgressSpinnerModule,
  ],
    providers: [loadingprogress,AlertService,gdataresponse,shareresservice,dashboardservice,NgxSpinnerService],
  bootstrap: [AppComponent,HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {

 }
