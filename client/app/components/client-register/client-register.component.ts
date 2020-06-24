import { Component, OnInit } from '@angular/core';
import { ClientRegisterService } from '../../services/client-service/client-register.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { PasswordValidation } from '../../services/client-service/PasswordValidation';
import { DatepickerModule, BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ClientRegister } from 'client/app/services/client-service/client-register.model';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css'],
  providers: [ClientRegisterService]
})
export class ClientRegisterComponent implements OnInit {
  datepickerConfig: Partial<BsDatepickerConfig>;

  myDateValue: Date;

  form = new   FormGroup({
    _id : new FormControl(),
    OTP : new FormControl('',[
      // Validators.required,
      // Validators.minLength(10)
    
    ]),
    FirstName: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    LastName: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.pattern('[a-zA-Z]*')
    ]),
 
    Email: new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),

    Password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]),
    ConfirmPassword: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      // your validation method
    ])
    }, PasswordValidation.MatchPassword
  // this.passwordMatchValidator


  );

  passwordMatchValidator(form: FormGroup) {
    return form.controls['Password'].value === form.controls['ConfirmPassword'].value ? null : {'mismatch': true};
  }

    get FirstName() { return this.form.get('FirstName'); }

    get LastName() { return this.form.get('LastName'); }

    get Email() { return this.form.get('Email'); }

    get Password() { return this.form.get('Password'); }

    get ConfirmPassword() { return this.form.get('ConfirmPassword'); }

    
    get OTP() { return this.form.get('OTP'); }

  constructor(public clientRegisterService: ClientRegisterService, private toastr: ToastrService, private router: Router,private route: ActivatedRoute) {
    this.datepickerConfig = Object.assign({}, {containerClass: 'theme-blue'});
  }


  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.show = params.show;
     
    });



    this.resetForm();
    this.myDateValue = new Date();
  }
  resetForm(form?: NgForm){
    if(form != null)
    form.reset();

   this.clientRegisterService.selectedRegisterClinet= {
    _id : "",
    FirstName : "",
    LastName :"",
    Email : "",
    Password : "",
    IsAdmin: false,
    OTP: "",
    IsActive: false
    }
  }
show: boolean;

  saveData(form?: NgForm) {
    if(form.value._id === '' || form.value._id === null) {

    form.value.IsAdmin = false;
    form.value.IsActive = false;
      this.clientRegisterService.postClientRegister(form.value)
      .subscribe(res => {
        this.resetForm(form);
        if(res != null){
          this.toastr.success('Registration Succesfully!');
          this.show=true;
        }
        else{
          this.toastr.error('Registration Failed!');
        }
     
      });
    }
  }
  singleLogin;


  verifyMail(form?: NgForm){
    this.clientRegisterService.verifyOTP(form.value).subscribe((res) => {
      this.singleLogin = res as ClientRegister[];

      if (this.singleLogin.length > 0) {
        this.toastr.success('Email verify Successfull!');

        this.updateDetails(form.value);
        this.router.navigate(['/login'])
      } else {
        this.toastr.warning('Email verification Failed!');
      }
    });

  }


  updateDetails(clientReg: ClientRegister) {

    clientReg.IsActive = true;
   
    this.clientRegisterService.UpdateIsActiveClientRegister(clientReg)
      .subscribe(res => {
       
       
      });


  }

}
