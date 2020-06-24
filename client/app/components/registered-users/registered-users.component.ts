import { Component, OnInit } from '@angular/core';
import { ClientRegisterService } from '../../services/client-service/client-register.service';
import { ToastrService } from 'ngx-toastr';
import { ClientRegister } from '../../services/client-service/client-register.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {

  constructor(public clientRegisterService: ClientRegisterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshUsersList();
  }
  UsersList;
  refreshUsersList() {
    this.clientRegisterService.getClientRegisterList().subscribe((res) => {
      this.UsersList = res as ClientRegister[];
    });
  }

  UserDetail;
  onView(clientReg: ClientRegister) {
    this.UserDetail = clientReg;
  }

  updateDetails(clientReg: ClientRegister) {

    clientReg.IsAdmin = !clientReg.IsAdmin;
    //console.log(!clientReg.IsAdmin);
    this.clientRegisterService.putClientRegister(clientReg)
      .subscribe(res => {
        this.refreshUsersList();
      
      });


  }

  onEdit(clientReg: ClientRegister) {
    this.UserDetail = clientReg;
  }

  onDelete(_id: string, form: NgForm) {

    if (confirm('Are you sure to delete this record ?') == true) {
      
      this.clientRegisterService.deleteClientRegister(_id).subscribe((res) => {
        this.refreshUsersList() ;
        this.toastr.info('Record Deleted Succesfully');

      });

    }

  }
}
