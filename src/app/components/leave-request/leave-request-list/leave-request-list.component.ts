import { User } from './../../../models/user';
import { AuthenticationService } from './../../../services/authentication.service';
import { LeaveRequestService } from './../../../services/leave-request.service';
import { Component, OnInit } from '@angular/core';
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
  constructor(
    private leaveRequestService: LeaveRequestService,
    private authentication: AuthenticationService;
    private modalService: BsModalService
  ) { 
    this.currentUser = this.authentication.currentUserValue.myuser;
  }

  ngOnInit() {
    
    if(this.currentUser.role === "DEPARTMENT_HEAD"){
      this.getAllRequest();
    }else{
      this.getAllRequestById(this.currentUser.id);
    }
    // this.userService.get_ngxModal_edit_$().subscribe(data =>{
    //   if(data){
    //     this.modalRef.hide();
    //     this.userService._set_ngxModal_add(false);
    //   }
    
    // })
    // this.userService._addUserToList.subscribe(data => {
    //   let userL = [... this.userList];
    //   userL.unshift(data);
    //   this.userList = userL;

    // })

    // this.userService._editUserToList.subscribe(data => {
    //   let index = this.userList.findIndex(user => user.id === data.id);
    //   this.userList[index] = data;
    // })

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
    this.leaveRequestService.getAllByUserId().subscribe(data =>{
      this.requestList = data;
      console.log("all dadta by id", data);s
    },err =>{
      console.log(err);
    })
  }


  // delete(user: User){

  //  this.userService.delete(user.id).subscribe(data =>{
  //   console.log("delete user", data);
  //   let index = this.userList.indexOf(user);
  //   this.userList = this.userList.filter((val, i) => i != index);
  //  },err =>{
  //    console.log(err);
  //  })
  // }

  // edit(user: User, template: TemplateRef<any>){
  //   console.log("edit user", user);
  //   this.editUser= user;
  //   this.openModal(template);
  // }
  
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  // }


}
