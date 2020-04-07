import { LeaveTypeService } from './../../../services/leave-type.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeaveType } from 'src/app/models/LeaveType';

@Component({
  selector: 'app-add-leave-type',
  templateUrl: './add-leave-type.component.html',
  styleUrls: ['./add-leave-type.component.css']
})
export class AddLeaveTypeComponent implements OnInit {
  roleList: any[];
  leaveTypeForm: FormGroup;
  loading = false;
  submitted = false;
  saveLeaveType: LeaveType;
  // edit: false;
  @Input() editLeaveType: LeaveType;
  @Input() edit: boolean = false;
  constructor(
    private leaveTypeService: LeaveTypeService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.leaveTypeForm = this.formBuilder.group({
      type: ['', Validators.required],
      leaveDays: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {

    if (this.edit) {
      this.leaveTypeForm.get('type').patchValue(this.editLeaveType.type);
      this.leaveTypeForm.get('leaveDays').setValue(this.editLeaveType.leaveDays);
    }

  }


  // convenience getter for easy access to form fields
  get f() { return this.leaveTypeForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.leaveTypeForm.invalid) {
      return;
    }

    this.loading = true;
    this.saveLeaveType = this.leaveTypeForm.value;
    if (this.edit) {
      this.saveLeaveType.id = this.editLeaveType.id;
      this.saveLeaveType.edit = true;
    } else {
      this.saveLeaveType.edit = false;
    }
    this.leaveTypeService.save(this.saveLeaveType).subscribe(data => {
      console.log("save user data", data);
      this.loading = false;
      if (this.edit) {
        if (data.action === "saved") {
          this.leaveTypeService._editleaveTypeToList.next(data.leaveType);
          this.leaveTypeService._set_ngxModal_edit(true);
        }
      } else {
        if (data.action === "saved") {
          this.leaveTypeService._addleaveTypeToList.next(data.leaveType);
          this.leaveTypeService._set_ngxModal_add(true);
        }
      }
    }, err => {
      console.log(err);
      this.loading = false;
    })
    console.log("form value", this.leaveTypeForm.value);
  }

}
