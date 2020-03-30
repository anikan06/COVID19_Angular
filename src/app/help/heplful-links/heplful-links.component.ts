import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotifyArray, HelpfulLinks } from './helpful.modal';

@Component({
  selector: 'app-heplful-links',
  templateUrl: './heplful-links.component.html',
  styleUrls: ['./heplful-links.component.scss']
})
export class HeplfulLinksComponent implements OnInit {
  helpUrls = 'https://api.rootnet.in/covid19-in/notifications';
  notificationsArray: Array<NotifyArray> = [];

  constructor(
    private http: HttpClient
  ) { }


  ngOnInit() {
    this.getLinks();
  }

  getLinks() {
    this.http.get<HelpfulLinks>(this.helpUrls).subscribe(res => {
      this.notificationsArray = res.data.notifications;
      console.log(this.notificationsArray);
    });
  }
}
