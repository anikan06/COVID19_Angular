import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notify, Notifications, NotifyData } from './notification.model';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifyUrl = 'https://api.rootnet.in/covid19-in/notifications';
  notifyArray = [];

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getNotification();
    this.spinner.show();

  }

  getNotification() {
    this.http.get<Notify>(this.notifyUrl).subscribe(res => {
      if (res.success === true) {
        let tempArr = new Notifications();
        tempArr = res.data;
        const dtArr = tempArr.notifications;
        this.notifyArray = _.reverse(dtArr);
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toastr.error('Unable to get the data');
      }
    });
  }
}
