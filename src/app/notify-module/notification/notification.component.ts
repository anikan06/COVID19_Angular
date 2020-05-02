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
    this.getNotification('init');
    this.spinner.show();

  }

  getNotification(vl: any) {
    this.http.get<Notify>(this.notifyUrl).subscribe(res => {
      if (res.success === true) {
        let tempArr = new Notifications();
        tempArr = res.data;
        const dtArr = tempArr.notifications;
        if (vl === 'init') {
          this.notifyArray = [];
          this.notifyArray = _.reverse(_.slice(dtArr, [dtArr.length - 10], [dtArr.length]));
          console.log(this.notifyArray);
        }
        if (vl === 'loadmore') {
          this.notifyArray = [];
          this.notifyArray = _.reverse(dtArr);
          console.log(this.notifyArray);
        }
        // this.notifyArray = _.reverse(dtArr);
        
        // _.reverse(_.slice(this.newLogArr, [this.newLogArr.length - 10], [this.newLogArr.length]))
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toastr.error('Unable to get the data');
      }
    });
  }
}
