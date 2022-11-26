import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../environments/environment";
import { ILoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signUp(userName: string, email: string, fullName: string, phoneNumber: string, password: string) {
    console.log({ userName, email, fullName, phoneNumber, password })
    return this.http.post(`${API_URL}/users`, { userName, email, fullName, phoneNumber, password })
  }

  signIn(username:string, password:string){
    return this.http.post<ILoginResponse>(`${API_URL}/account`, {username, password});
  }

  isAuthenticated():boolean{
    const author = localStorage.getItem("token");
    if(author){
      return true;
    }

    return false;
  }
  isAuhorized(username:string):boolean{
    const author = localStorage.getItem("username");
    return author == username;
  }
}
