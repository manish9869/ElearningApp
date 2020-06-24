import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientRegister } from './client-register.model';

@Injectable({
  providedIn: 'root'
})
export class ClientRegisterService {

  selectedRegisterClinet: ClientRegister;


  private url = 'http://localhost:3000/ClientRegister';
  constructor(private http: HttpClient) { }

  postClientRegister(clientRegister: ClientRegister) {
    return this.http.post(this.url, clientRegister);
  }

  getClientRegisterList() {
    return this.http.get(this.url);
  }

  
  getClientRegisterListByEmail(clientRegister: ClientRegister) {
    return this.http.post(this.url+'/Email',clientRegister);
  }


  putClientRegister(clientRegister: ClientRegister) {
    return this.http.put(this.url + `/${clientRegister._id}`, clientRegister);
  }


  UpdateIsActiveClientRegister(clientRegister: ClientRegister) {
    console.log(clientRegister);
    return this.http.put(this.url +'/updateByMail'+`/${clientRegister.Email}`, clientRegister);
  }


  deleteClientRegister(_id: string) {
    return this.http.delete(this.url + `/${_id}`);
  }

  getSingleLogin(clientRegister: ClientRegister) {
    return this.http.post(this.url + '/byEmail', clientRegister);
  }

  verifyOTP(clientRegister: ClientRegister) {
    return this.http.post(this.url + '/byEmailOTP', clientRegister);
  }

  checkEmailIsActive(clientRegister: ClientRegister) {
    return this.http.post(this.url + '/byEmailIsActive', clientRegister);
  }


  userObject: any;

  setUser(obj) {
    this.userObject = obj;
    localStorage.setItem('userObj', JSON.stringify(this.userObject));

  }


  loginCheck(){

    return this.getUser();
  }

   isAdmin(){
    
   var item= this.getUser();

    if(item != null && item.IsAdmin == true  ){
      return true;
    }
    else{
      return false;
    }

  }

  getUser() {
    if (!this.userObject && !localStorage.getItem('userObj')) {
      return null;
    }
    if (localStorage.getItem('userObj')) {
      this.userObject = JSON.parse(localStorage.getItem('userObj'))
    }
    return this.userObject;
  }
}
