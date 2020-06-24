import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-client-footer',
  templateUrl: './client-footer.component.html',
  styleUrls: ['./client-footer.component.css']
})
export class ClientFooterComponent implements OnInit {

  constructor() { }
  @Input() hideFooter: boolean;
  ngOnInit() {
  }

}
