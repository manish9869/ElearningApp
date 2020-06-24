import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ElearningApp';
  hideFooter = false;
  hideNavbar = false;
  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe(() => {
    
      if (this.router.url.indexOf('singletopic') > -1) {
        this.hideFooter = true
        this.hideNavbar=true
      }else{
        this.hideFooter = false
        this.hideNavbar=false
      }
    })

  }
}
