import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  icons = [
    { name: 'camera' },
    { name: 'user' },
    { name: 'users' },
    { name: 'flag' },
    { name: 'clock' },
    { name: 'activity'},
    { name: 'check-circle'},
    { name: 'loader'},
    { name: 'bar-chart-2'}






  ]
  constructor() { }

  ngOnInit(): void {
  }

}
