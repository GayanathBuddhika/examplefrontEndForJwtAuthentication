import { map } from 'rxjs/operators';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<[]>(`/users`);
  }

  register(user: User) {
    return this.http.post<any>("http://localhost:8080/register", user)
     
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
