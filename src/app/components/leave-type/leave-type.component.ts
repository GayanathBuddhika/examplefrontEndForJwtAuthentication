import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LeaveTypeService } from './../../services/leave-type.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private leaveTypeService: LeaveTypeService
  ) { }

  ngOnInit() {
       
  this.leaveTypeService.get_ngxModal_add_$().subscribe(data =>{
    if(data){
      this.modalRef.hide();
      this.leaveTypeService._set_ngxModal_add(false);
    }
  
  })
  }

  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
}


