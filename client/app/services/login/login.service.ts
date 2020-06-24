import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  selectedLogin: Login;
  loginList: Login[];

  private url = 'http://localhost:3000/Login';
  constructor(private http : HttpClient) { }

  postLogin(login: Login){
    return this.http.post(this.url,login);
  }

  getLoginList(){
   return this.http.get(this.url);
   }
   

  putLogin(login: Login) {
    return this.http.put(this.url + `/${login._id}`, login);
  }

  deleteLogin(_id: string) {
    return this.http.delete(this.url + `/${_id}`);
  }

}
