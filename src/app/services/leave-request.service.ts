import { LeaveRequest } from './../models/leaveRequest';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {


  private _ngxModal_add = new BehaviorSubject<boolean>(false);
  private _ngxModal_edit = new BehaviorSubject<boolean>(false);

  public _addleaveRequestToList = new Subject<LeaveRequest>();
  public _editleaveRequestToList = new Subject<LeaveRequest>();
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>("http://localhost:8080/leaveRequest/findAll")
  }
  getAllByUserId(requestId: string) {
    return this.http.get<any>("http://localhost:8080/leaveRequest/findAllByUserId")
  }

  apprved(requestId: string) {
    return this.http.post<any>("http://localhost:8080/leaveRequest/approve",requestId);

  }


   save(leaveRequest: LeaveRequest){
    return this.http.post<any>("http://localhost:8080/leaveRequest/addRequest", leaveRequest);
   }

  delete(requestId: string) {
    return this.http.post<any>("http://localhost:8080/leaveRequest/delete",requestId);
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
