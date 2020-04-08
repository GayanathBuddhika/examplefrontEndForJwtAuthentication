import { User } from './../../../models/user';
import { AuthenticationService } from './../../../services/authentication.service';
import { LeaveTypeService } from './../../../services/leave-type.service';
import { LeaveType } from 'src/app/models/LeaveType';
import { LeaveRequestService } from './../../../services/leave-request.service';
import { LeaveRequest } from './../../../models/leaveRequest';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-leave-request-add',
  templateUrl: './leave-request-add.component.html',
  styleUrls: ['./leave-request-add.component.css']
})
export class LeaveRequestAddComponent implements OnInit, AfterViewInit {
  leaveTypeList: LeaveType[];
  requestForm: FormGroup;
  loading = false;
  submitted = false;
  saveRequest = new LeaveRequest();
  currentDate = new Date()
  mindateForStart: Date;
  mindateForEnddate: Date;
  maxDateforEndDate: Date;
  currentUser: User;
  // edit: false;
  @Input() editRequest: LeaveRequest;
  @Input() edit: boolean = false;
  constructor(
    private leaveRequestService: LeaveRequestService,
    private leaveTypeService: LeaveTypeService,
    private authentication: AuthenticationService,
    private formBuilder: FormBuilder,
   

  ) {
    this.mindateForStart = new Date();
    this.currentUser = this.authentication.currentUserValue.myuser;
    
    
   }

  ngOnInit() {
    // this.getUserRole();
    
    this.getleaveType();
    this.requestForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],    
    });
  }

  
  ngAfterViewInit(): void {

    if(this.edit){
      this.requestForm.get('leaveType').patchValue(this.editRequest.leaveType);
      this.requestForm.get('description').setValue(this.editRequest.description);
      this.requestForm.get('startDate').setValue(this.editRequest.startDate);
      this.requestForm.get('endDate').setValue(this.editRequest.endDate);
  
    }
  
    }

      // convenience getter for easy access to form fields
  get f() { return this.requestForm.controls; }

    onSelectedStartDate(event: any){
  //  const  ss: Date = this.requestForm.get('startDate').value ;
  //   console.log("start  date***",this.requestForm.get('startDate').value );
  //   this.mindateForEnddate.setDate(ss.getDate());
  }
  changerole(event) {
    console.log("**************", event.target.value);
  }

  getleaveType() {
    // this.leaveTypeList = this.;
    this.leaveTypeService.getAll().subscribe(data =>{
      this.leaveTypeList = data;
    },err =>{
      console.log(err);
    })
  }

  onSubmit() {

    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }

    this.loading = true;
    this.saveRequest.leaveType = this.requestForm.get('leaveType').value;
    this.saveRequest.description = this.requestForm.get('description').value;
    this.saveRequest.startDate = this.requestForm.get('startDate').value;
    this.saveRequest.endDate = this.requestForm.get('endDate').value;
    this.saveRequest.approve = false;
    this.saveRequest.user = this.currentUser;
 
    if(this.edit){
      this.saveRequest.id = this.editRequest.id;
      this.saveRequest.edit = true;
    }else{
      this.saveRequest.edit = false;
    }
    
    this.leaveRequestService.save( this.saveRequest).subscribe(data => {
      console.log("save data", data);
      this.loading = false;
      if (this.edit) {
        if (data.action === "saved") {
          this.leaveRequestService._editleaveRequestToList.next(data.request);
          this.leaveRequestService._set_ngxModal_edit(true);
        }
      } else {
        if (data.action === "saved") {
          this.leaveRequestService._addleaveRequestToList.next(data.request);
          this.leaveRequestService._set_ngxModal_add(true);
        }
      }
    }, err => {
      console.log(err);
      this.loading = false;
    })
    console.log("form value", this.requestForm.value);
  }

}
