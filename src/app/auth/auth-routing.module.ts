import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';
import { AppComponent } from '../app.component';
import { HeaderComponent } from '../header/header.component';
import { UserverificationComponent } from './components/userverification/userverification.component';
import { DDashboardviewComponent } from '../dashboard/d-dashboardview/d-dashboardview.component';
import { AuthGuard } from './guard/AuthGuard';
import { DReportComponent } from '../dashboard/d-report/d-report.component';


const routes: Routes = [
  {path:'login',component:AppComponent},
  {path:'register',component:RegisterComponent},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'main',component:SidebarNavComponent,canActivate:[AuthGuard]},
  {path:'userverified/:email',component:UserverificationComponent},
  {path:'studio',component:DDashboardviewComponent},
  {path:'report',component:DReportComponent},


 {  path: '**',   redirectTo: '/main' }




];
export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
