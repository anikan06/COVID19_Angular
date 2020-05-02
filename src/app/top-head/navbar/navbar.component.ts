import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  baseNotiUrl = 'https://api.rootnet.in/covid19-in/notifications';
  trimedArr = [];
  fullArr = [];
  constructor(

  ) { }

  ngOnInit() {
  }

}
