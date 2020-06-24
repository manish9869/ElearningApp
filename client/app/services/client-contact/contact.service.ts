import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Headers } from '@angular/http';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  selectedContact: Contact;
  private url = 'http://localhost:3000/Contact';
  constructor(private http : HttpClient, ) { }

  // sendEmail(contact: Contact) {

  //   var emailid = 'email='+contact.Email;
  //   console.log(emailid);
  //   return this.http.post(this.url, emailid,).subscribe((data) => {
  //     console.log('mail send');
  //   });
  // }

  postContact(Contact: Contact){
    return this.http.post(this.url,Contact);
  }
}
