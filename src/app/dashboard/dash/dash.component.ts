import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
import { LivePatient } from 'src/app/shared/livePatient.modal';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  allListURL = 'https://api.covid19india.org/data.json';
  allData: any;
  dataArray: [];
  totalConfirmed: string;
  totalActive: string;
  totalDeath: string;
  totalRecovered: string;
  lastUpdatedTime: string;
  todaysData: [];
  latestCase: any;
  todayConfirm: string;
  todayRecover: string;
  todayActive: any;
  todayDeath: string;
  myBarChart = [];
  canvas: any;
  ctx: any;

  @ViewChild('mychart', { static: false }) mychart;
  resData: any;

  // now = moment().startOf('hour').fromNow();


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAllList();
  }
  // ngAfterViewInit() {
  //   this.canvas = this.mychart.nativeElement;
  //   this.ctx = this.canvas.getContext('2d');

  //   let myChart = new Chart(this.ctx, {
  //     type: 'line',

  //     data: {
  //       datasets: [{
  //         label: 'Höhenlinie',
  //         backgroundColor: 'rgba(255, 99, 132,0.4)',
  //         borderColor: 'rgb(255, 99, 132)',
  //         fill: true,
  //         data: [
  //           { x: 1, y: 2 },
  //           { x: 2500, y: 2.5 },
  //           { x: 3000, y: 5 },
  //           { x: 3400, y: 4.75 },
  //           { x: 3600, y: 4.75 },
  //           { x: 5200, y: 6 },
  //           { x: 6000, y: 9 },
  //           { x: 7100, y: 6 },
  //         ],
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       title: {
  //         display: true,
  //         text: 'Höhenldfdsdfdsfinie'
  //       },
  //       scales: {
  //         xAxes: [{
  //           type: 'linear',
  //           position: 'bottom',
  //           ticks: {
  //             userCallback: function (tick) {
  //               if (tick >= 1000) {
  //                 return (tick / 1000).toString() + 'km';
  //               }
  //               return tick.toString() + 'm';
  //             }
  //           },
  //           scaleLabel: {
  //             labelString: 'Länge',
  //             display: true,
  //           }
  //         }],
  //         yAxes: [{
  //           type: 'linear',
  //           ticks: {
  //             userCallback: function (tick) {
  //               return tick.toString() + 'm';
  //             }
  //           },
  //           scaleLabel: {
  //             labelString: 'Höhe',
  //             display: true
  //           }
  //         }]
  //       }
  //     }
  //   });
  // }


  getAllList() {
    this.http.get(this.allListURL).subscribe(res => {
      this.allData = res;
      this.dataArray = this.allData.statewise;
      this.todaysData = this.allData.key_values;

      this.getTempList();

      if (this.allData !== null && this.allData !== undefined) {
        this.totalConfirmed = this.allData.statewise[0].confirmed;
        this.totalActive = this.allData.statewise[0].active;
        this.totalRecovered = this.allData.statewise[0].recovered;
        this.totalDeath = this.allData.statewise[0].deaths;
        this.lastUpdatedTime = this.allData.statewise[0].lastupdatedtime;
        this.todayConfirm = this.allData.key_values[0].confirmeddelta;
        this.todayActive =
          (this.allData.key_values[0].confirmeddelta - this.allData.key_values[0].recovereddelta) - this.allData.key_values[0].deceaseddelta;
        this.todayRecover = this.allData.key_values[0].recovereddelta;
        this.todayDeath = this.allData.key_values[0].deceaseddelta;
      }
    });
  }

  getTempList() {
    this.http.get<LivePatient>('https://api.rootnet.in/covid19-in/unofficial/covid19india.org').subscribe(res => {
      const rawData = res.data.rawPatientData;
      if (rawData !== null && rawData !== undefined) {
        this.resData = _.last(rawData);
      }

    });
  }

}
