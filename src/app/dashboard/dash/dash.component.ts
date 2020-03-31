import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
import { LivePatient } from 'src/app/shared/livePatient.modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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

  latpatientId: number;
  latReportedOn: string;
  latonsetEstimate: string;
  latageEstimate: string;
  latgender: string;
  latcity: string;
  latdistrict: string;
  latstate: string;
  latstatus: string;
  latnotes: string;
  latcontractedFrom: string;
  lattravel: string;

  myBarChart = [];
  canvas: any;
  ctx: any;

  @ViewChild('mychart', { static: false }) mychart;
  resData: any;
  latsource: any;

  // now = moment().startOf('hour').fromNow();


  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.getAllList();
  }

  sortArrayOfObjects = (arr, key) => {
    return arr.sort((a, b) => {
      return b[key] - a[key];
    });
  };
  
  getAllList() {
    // this.spinner.show();
    this.http.get(this.allListURL).subscribe(res => {

      this.toastr.success('Fetched Data Successfully');
      this.allData = res;
      this.dataArray = this.allData.statewise;

      this.todaysData = this.allData.key_values;
      this.sortArrayOfObjects(this.dataArray, "confirmed");
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
      this.spinner.hide();
    });
  }

  getTempList() {
    this.http.get<LivePatient>('https://api.rootnet.in/covid19-in/unofficial/covid19india.org').subscribe(res => {
      const rawData = res.data.rawPatientData;
      if (rawData !== null && rawData !== undefined) {
        this.resData = _.last(rawData);
        this.latpatientId = this.resData.patientId;
        this.latReportedOn = this.resData.reportedOn;
        this.latonsetEstimate = this.resData.onsetEstimate;
        this.latageEstimate = this.resData.ageEstimate;

        if (this.resData.gender !== '') {
          this.latgender = this.resData.gender;
        } else {
          this.latgender = 'N/A';
        }
        if (this.resData.ageEstimate !== '') {
          this.latageEstimate = this.resData.ageEstimate;
        } else {
          this.latageEstimate = 'N/A';
        }
        if (this.resData.district !== '') {
          this.latdistrict = this.resData.district;
        } else {
          this.latdistrict = 'N/A';
        }


        if (this.resData.sources) {
          if (this.resData.sources < 0) {
            this.latsource = this.resData.sources[0];
          }
        } else {
          this.latsource = 'Not Known';
        }

        if (this.resData.state !== '') {
          this.latstate = this.resData.state;
        } else {
          this.latstate = 'N/A';
        }
        if (this.resData.status !== '') {
          this.latstatus = this.resData.status;
        } else {
          this.latstatus = 'N/A';
        }
        if (this.resData.city !== '') {
          this.latcity = this.resData.city;
        } else {
          this.latcity = 'N/A';
        }
        if (this.resData.notes !== '') {
          this.latnotes = this.resData.notes;
        } else {
          this.latnotes = 'Awaiting response';
        }
        if (this.resData.contractedFrom !== '') {
          this.latcontractedFrom = this.resData.contractedFrom;
        } else {
          this.latcontractedFrom = 'N/A';
        }

        if (this.resData.travel) {
          if (this.resData.travel.length > 0) {
            this.lattravel = this.resData.travel[0];
          } else {
            this.lattravel = 'N/A';
          }
        } else {
          this.lattravel = 'Not Available';
        }


      }
      this.spinner.hide();
    });
  }

}
