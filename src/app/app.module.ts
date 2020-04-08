import { ModalModule } from 'ngx-bootstrap/modal';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/iwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AlertComponent } from './components/alert/alert.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AdduserComponent } from './components/user/adduser/adduser.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { LeaveTypeComponent } from './components/leave-type/leave-type.component';
import { AddLeaveTypeComponent } from './components/leave-type/add-leave-type/add-leave-type.component';
import { ListleaveTypeComponent } from './components/leave-type/listleave-type/listleave-type.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { LeaveRequestAddComponent } from './components/leave-request/leave-request-add/leave-request-add.component';
import { LeaveRequestListComponent } from './components/leave-request/leave-request-list/leave-request-list.component';
import { DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [
    AppComponent,

    AlertComponent,

    HomeComponent,

    LoginComponent,

    RegisterComponent,

    UserComponent,

    AdduserComponent,

    ListUserComponent,

    LeaveTypeComponent,

    AddLeaveTypeComponent,

    ListleaveTypeComponent,

    LeaveRequestComponent,

    LeaveRequestAddComponent,

    LeaveRequestListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DropdownModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
