import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit, AfterViewInit {
  roleList: any[];
  userForm: FormGroup;
  loading = false;
  submitted = false;
  saveUser: User;
  // edit: false;
  @Input() editUser: User;
  @Input() edit: boolean = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.getUserRole();
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      employeeId: ['', Validators.required],
      phoneNo: ['', Validators.required],
      address: ['', Validators.required],
    });

  }

  ngAfterViewInit(): void {

  if(this.edit){
    this.userForm.get('role').patchValue(this.editUser.role);
    this.userForm.get('name').setValue(this.editUser.name);
    this.userForm.get('email').setValue(this.editUser.email);  
    this.userForm.get('employeeId').setValue(this.editUser.employeeId);
    this.userForm.get('phoneNo').setValue(this.editUser.phoneNo);
    this.userForm.get('address').setValue(this.editUser.address);
    // this.userForm.get('name').setValue(this.editUser.name);

  }

  }
  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  changerole(event) {
    console.log("**************", event.target.value);
  }
  getUserRole() {
    this.roleList = this.userService.role;
  }
  onSubmit() {

    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    this.saveUser = this.userForm.value;
    if(this.edit){
      this.saveUser.id = this.editUser.id;
      this.saveUser.edit = true;
    }else{
      this.saveUser.edit = false;
    }
    
    this.userService.save(this.saveUser).subscribe(data => {
      console.log("save user data", data);
      this.loading = false;
      if (this.edit) {
        if (data.action === "saved") {
          this.userService._editUserToList.next(data.user);
          this.userService._set_ngxModal_edit(true);
        }
      } else {
        if (data.action === "saved") {
          this.userService._addUserToList.next(data.user);
          this.userService._set_ngxModal_add(true);
        }
      }
    }, err => {
      console.log(err);
      this.loading = false;
    })
    console.log("form value", this.userForm.value);
  }
}
