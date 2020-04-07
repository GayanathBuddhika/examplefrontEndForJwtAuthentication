import { map } from 'rxjs/operators';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  role = [
    {
      label: 'ADMIN',
      value: 'ADMIN'
    },
    {
      label: 'DEPARTMENT_HEAD',
      value: 'DEPARTMENT_HEAD'
    },
    {
      label: 'USER',
      value: 'USER'
    },
  ]

  private _ngxModal_add = new BehaviorSubject<boolean>(false);
  private _ngxModal_edit = new BehaviorSubject<boolean>(false);

  public _addUserToList = new Subject<User>();
  public _editUserToList = new Subject<User>();
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>("http://localhost:8080/user/findAll")
  }

  register(user: User) {
    return this.http.post<any>("http://localhost:8080/register", user)

  }


   save(user: User){
    return this.http.post<any>("http://localhost:8080/user/addUser", user)
   }

  delete(userId: string) {
    return this.http.post<any>("http://localhost:8080/user/delete",userId);
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
