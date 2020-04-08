import { User } from './../../../models/user';
import { AuthenticationService } from './../../../services/authentication.service';
import { LeaveRequestService } from './../../../services/leave-request.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LeaveRequest } from 'src/app/models/leaveRequest';

@Component({
  selector: 'app-leave-request-list',
  templateUrl: './leave-request-list.component.html',
  styleUrls: ['./leave-request-list.component.css']
})
export class LeaveRequestListComponent implements OnInit {
  modalRef: BsModalRef;
  requestList: LeaveRequest[]=[];
  editRequest: LeaveRequest;
  currentUser: User;
  reApproved : boolean = false;
  constructor(
    private leaveRequestService: LeaveRequestService,
    private authentication: AuthenticationService,
    private modalService: BsModalService
  ) { 
    this.currentUser = this.authentication.currentUserValue.myuser;
  }

  ngOnInit() {
    console.log("***********",this.currentUser.role);
    if(this.currentUser.role === "DEPARTMENT_HEAD"){
      this.getAllRequest();
    }else{
      this.getAllRequestById(this.currentUser.id);
    }
    this.leaveRequestService.get_ngxModal_edit_$().subscribe(data =>{
      if(data){
        this.modalRef.hide();
        this.leaveRequestService._set_ngxModal_add(false);
      }
    
    })
    this.leaveRequestService._addleaveRequestToList.subscribe(data => {
      let requestL = [... this.requestList];
      requestL.unshift(data);
      this.requestList = requestL;

    })

    this.leaveRequestService._editleaveRequestToList.subscribe(data => {
      let index = this.requestList.findIndex(user => user.id === data.id);
      this.requestList[index] = data;
    })

  }


  getAllRequest(){
    this.leaveRequestService.getAll().subscribe(data =>{
      this.requestList = data;
      console.log("all dadta", data);
    },err =>{
      console.log(err);
    })
  }

  getAllRequestById(id: string){
    this.leaveRequestService.getAllByUserId(id).subscribe(data =>{
      this.requestList = data;
      console.log("all dadta by id", data);
    },err =>{
      console.log(err);
    })
  }


  delete(request: LeaveRequest ){

   this.leaveRequestService.delete(request.id).subscribe(data =>{
    console.log("delete user", data);
    let index = this.requestList.indexOf(request);
    this.requestList = this.requestList.filter((val, i) => i != index);
   },err =>{
     console.log(err);
   })
  }

  edit(request: LeaveRequest, template: TemplateRef<any>){
    console.log("edit user", request);
    this.editRequest= request;
    this.openModal(template);
  }

  approved(request: LeaveRequest){
    this.leaveRequestService.apprved(request.id).subscribe(data =>{
      console.log("aproved", data);
      this.reApproved = true;
      let index = this.requestList.findIndex(user => user.id === request.id);
      this.requestList[index].approve =true;
      // let index = this.requestList.indexOf(request);
      // this.requestList[index].approve = true;
    },err =>{
      console.log(err);
      this.reApproved = false;
    })
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }


}
