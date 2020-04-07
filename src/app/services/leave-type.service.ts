import { LeaveType } from './../models/LeaveType';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
  private _ngxModal_add = new BehaviorSubject<boolean>(false);
  private _ngxModal_edit = new BehaviorSubject<boolean>(false);

  public _addleaveTypeToList = new Subject<LeaveType>();
  public _editleaveTypeToList = new Subject<LeaveType>();
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>("http://localhost:8080/leaveType/findAll")
  }

   save(leaveType: LeaveType){
    return this.http.post<any>("http://localhost:8080/leaveType/addLeaveType", leaveType)
   }

  delete(leaveTypeId: string) {
    return this.http.post<any>("http://localhost:8080/leaveType/delete",leaveTypeId);
  }


  _set_ngxModal_add(value: boolean) {
    this._ngxModal_add.next(value);
  }

  get_ngxModal_add_$(): Observable<boolean> {
    return this._ngxModal_add.asObservable();
  }

  _set_ngxModal_edit(value: boolean) {
    this._ngxModal_edit.next(value);
  }

  get_ngxModal_edit_$(): Observable<boolean> {
    return this._ngxModal_edit.asObservable();
  }
}
