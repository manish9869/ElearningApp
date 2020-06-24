import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-demo-test',
  templateUrl: './demo-test.component.html',
  styleUrls: ['./demo-test.component.css']
})
export class DemoTestComponent implements OnInit {
  @Input('title') title: string;
  isExpanded = true;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor() { }

  ngOnInit() {
  }

}
