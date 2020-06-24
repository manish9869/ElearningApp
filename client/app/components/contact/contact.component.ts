import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../services/client-contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  newUser = {
    Name: '',
    Email: '',
    Message: ''
  };

  form = new FormGroup ({
    Name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]),
    Email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200),
      Validators.email
    ]),
    Message: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(1000)
    ])
  });

  get Name() { return this.form.get('Name'); }
  get Email() { return this.form.get('Email'); }
  get Message() { return this.form.get('Message'); }

  constructor(public contactService: ContactService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
  }


  onSubmit(form?: NgForm) {
    // return this.contactService.sendEmail(this.newUser);
    // return this.contactService.sendEmail(this.newUser);
    this.contactService.postContact(form.value)
      .subscribe(res => {
        this.resetForm(form);
       // this.courseService.getCourseList();

      this.toastr.success('Mail sent Sucessfully!');
      });
  }

}
