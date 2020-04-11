import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import * as _ from 'lodash';
import { LogDetails } from './log.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
}) 
export class LogComponent implements OnInit {

  logUrl = 'https://api.covid19india.org/updatelog/log.json';
  dataLog: any;
  newLogArr = [];
  slicedLogs = [];
  interval;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {
    moment.locale('en');
  }

  ngOnInit() {
    this.getLogs();
    this.interval = setInterval(() => {
      this.getLogs();
    }, 120000);
  }

  getLogs() {
    this.http.get(this.logUrl).subscribe(res => {
      this.dataLog = res;
      const dt = moment(moment(this.dataLog[49].timestamp * 1000).format('YYYY-MM-DD HH:mm')).fromNow();
      const logArray: Array<LogDetails> = [];
      _.map(this.dataLog, (val, key) => {
        const newLogObj = new LogDetails();
        newLogObj.update = val.update;
        newLogObj.time = moment(moment(this.dataLog[key].timestamp * 1000).format('YYYY-MM-DD HH:mm')).fromNow();

        this.newLogArr.push(newLogObj);
      });
      // slicing for last five records
      this.newLogArr = _.reverse(_.slice(this.newLogArr, [this.newLogArr.length - 10], [this.newLogArr.length]));
      this.periodicFetch('inside');
    });
  }

  periodicFetch(data) {
    if (data === 'inside') {
      this.toastr.warning('Latest: ' + (_.head(this.newLogArr)).update);
    }
  }

}
