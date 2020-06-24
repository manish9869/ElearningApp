
import { Component, OnInit, Input } from '@angular/core';
import { ClientRegisterService } from '../../services/client-service/client-register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit {

  constructor(public clientRegisterService: ClientRegisterService) { }
  loggs;
  isLogin;
  login:boolean;
  
  @Input() hideNavbar: boolean;
  ngOnInit() {

    this.isLogin = this.clientRegisterService.loginCheck();

   // console.log(this.isLogin);
    
    if (this.isLogin == null) {
      this.login = false;
      
      console.log(this.login);
    } else {

      this.login = true;
      console.log(this.login);
    }
  }

  allNav = [
    {
      routerLink: "/course",
      text: "Manage Course",
      IsClient: false
    },
    {
      routerLink: "/chapter",
      text: "Manage Chapter",
      IsClient: false
    },
    {
      routerLink: "/topic",
      text: "Manage Topic",
      IsClient: false
    },
    {
      routerLink: "/blog",
      text: "Manage Blog",
      IsClient: false
    },
    {
      routerLink: "/users",
      text: "Manage users",
      IsClient: false
    },
    {
      routerLink: "/home",
      text: "Home",
      IsClient: true
    },
    {
      routerLink: "/allcourses",
      text: "All Courses",
      IsClient: true
    },
    {
      routerLink: "/blogs",
      text: "Blogs",
      IsClient: true
    },

    // {
    //   routerLink: "/login",
    //   text: "Login",
    //   IsClient: true
    // },
    {
      routerLink: "/contact",
      text: "Contact Us",
      IsClient: true
    }

  ]


  adminNav = [

    {
      routerLink: "/course",
      text: "Manage Course",
      IsClient: false
    },
    {
      routerLink: "/chapter",
      text: "Manage Chapter",
      IsClient: false
    },
    {
      routerLink: "/topic",
      text: "Manage Topic",
      IsClient: false
    },
    {
      routerLink: "/blog",
      text: "Manage Blog",
      IsClient: false
    },
    {
      routerLink: "/users",
      text: "Manage users",
      IsClient: false
    }
  ]


  clientNav = [
    {
      routerLink: "/home",
      text: "Home",
      IsClient: true
    },
    {
      routerLink: "/blogs",
      text: "Blogs",
      IsClient: true
    },

    {
      routerLink: "/login",
      text: "Login",
      IsClient: true
    },
    {
      routerLink: "/contact",
      text: "Contact Us",
      IsClient: true
    }
  ]

  signout() {
    this.login = false;
    this.clientRegisterService.setUser(null);

  }


}
