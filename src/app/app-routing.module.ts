import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { AuthModule } from './auth/auth.module';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { AuthGuard } from './auth/guard/AuthGuard';


const routes: Routes = [  {path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'resetpassword',component:ResetPasswordComponent},
{path:'main',component:SidebarNavComponent,canActivate:[AuthGuard]},
{path:'profile',component:ProfileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
