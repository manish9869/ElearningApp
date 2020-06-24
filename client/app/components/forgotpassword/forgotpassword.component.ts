import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientRegisterService } from '../../services/client-service/client-register.service';
import { ClientRegister } from '../../services/client-service/client-register.model';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  form = new FormGroup({
    _id : new FormControl(),
    Email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  get Email() { return this.form.get('Email'); }


  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
  }

  constructor(public clientRegisterService: ClientRegisterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  

  singleLogin;

  forgotpassword(form?: NgForm) {
    this.clientRegisterService.getClientRegisterListByEmail(form.value).subscribe((res) => {
      this.singleLogin = res as ClientRegister[];
console.log(this.singleLogin);
      //this.clientRegisterService.setUser(res[0]);


      if(this.singleLogin._id != null){
        this.toastr.success('Mail sent Successfull!');


      }
      else
      this.toastr.warning('Email address does not exist!');

    });
  }

}
