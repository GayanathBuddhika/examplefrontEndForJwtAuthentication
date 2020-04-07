import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  modalRef: BsModalRef;
  userList: User[]=[];
  editUser: User;
  constructor(
    private userService: UserService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.getAllUser();
    this.userService.get_ngxModal_edit_$().subscribe(data =>{
      if(data){
        this.modalRef.hide();
        this.userService._set_ngxModal_add(false);
      }
    
    })
    this.userService._addUserToList.subscribe(data => {
      let userL = [... this.userList];
      userL.unshift(data);
      this.userList = userL;

    })

    this.userService._editUserToList.subscribe(data => {
      let index = this.userList.findIndex(user => user.id === data.id);
      this.userList[index] = data;
    })


  }

  getAllUser(){
    this.userService.getAll().subscribe(data =>{
      this.userList = data;
      console.log("all Users", data);
    },err =>{
      console.log(err);
    })
  }

  delete(user: User){

   this.userService.delete(user.id).subscribe(data =>{
    console.log("delete user", data);
   },err =>{
     console.log(err);
   })
  }

  edit(user: User, template: TemplateRef<any>){
    console.log("edit user", user);
    this.editUser= user;
    this.openModal(template);
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

}
