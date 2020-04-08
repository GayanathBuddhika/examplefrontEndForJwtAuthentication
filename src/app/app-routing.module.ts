import { LeaveTypeService } from './services/leave-type.service';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './helpers/auth.guard';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveTypeComponent } from './components/leave-type/leave-type.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'leavetype', component: LeaveTypeComponent },
  { path: 'request', component: LeaveRequestComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


// export const appRoutingModule = RouterModule.forRoot(routes);
export class AppRoutingModule { }
