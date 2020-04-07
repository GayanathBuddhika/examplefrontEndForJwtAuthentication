import { LeaveTypeService } from './../../../services/leave-type.service';
import { LeaveType } from './../../../models/LeaveType';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-listleave-type',
  templateUrl: './listleave-type.component.html',
  styleUrls: ['./listleave-type.component.css']
})
export class ListleaveTypeComponent implements OnInit {
  modalRef: BsModalRef;
  leaveTypeList: LeaveType[]=[];
  editLeaveType: LeaveType;

  constructor(
    private leaveTypeService: LeaveTypeService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getAllLeaveType();
    this.leaveTypeService.get_ngxModal_edit_$().subscribe(data =>{
      if(data){
        this.modalRef.hide();
        this.leaveTypeService._set_ngxModal_add(false);
      }    
     })

    this.leaveTypeService._addleaveTypeToList.subscribe(data => {
      let leaveLi = [... this.leaveTypeList];
      leaveLi.unshift(data);
      this.leaveTypeList = leaveLi;
    });

    this.leaveTypeService._editleaveTypeToList.subscribe(data => {
      let index = this.leaveTypeList.findIndex(user => user.id === data.id);
      this.leaveTypeList[index] = data;
    })

  }



  getAllLeaveType(){
    this.leaveTypeService.getAll().subscribe(data =>{
      this.leaveTypeList = data;
      console.log("all leaveType", data);
    },err =>{
      console.log(err);
    })
  }

  delete(leaveType: LeaveType){

   this.leaveTypeService.delete(leaveType.id).subscribe(data =>{
    console.log("delete leave Type", data);
    let index = this.leaveTypeList.indexOf(leaveType);
    this.leaveTypeList = this.leaveTypeList.filter((val, i) => i != index);
   },err =>{
     console.log(err);
   })
  }

  edit(leavetype: LeaveType, template: TemplateRef<any>){
    console.log("edit leave", leavetype);
    this.editLeaveType= leavetype;
    this.openModal(template);
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }


}
