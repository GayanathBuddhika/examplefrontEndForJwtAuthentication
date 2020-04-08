import { LeaveRequestService } from './../../services/leave-request.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private leaveRequestService: LeaveRequestService
  ) { }

  ngOnInit() {

    
  this.leaveRequestService.get_ngxModal_add_$().subscribe(data =>{
    if(data){
      this.modalRef.hide();
      this.leaveRequestService._set_ngxModal_add(false);
    }
  
  })
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

}
