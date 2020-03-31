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
  arraySort = [];

  myBarChart = [];
  canvas: any;
  ctx: any;

  @ViewChild('mychart', { static: false }) mychart;
  resData: any;
  latsource: any;
  newSortArr = {};

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
      this.toastr.success('Fetched Data Successfully as on ' + this.lastUpdatedTime);
      this.spinner.hide();
    });
  }

  getTempList() {
    this.http.get<LivePatient>('https://api.rootnet.in/covid19-in/unofficial/covid19india.org').subscribe(res => {
      const rawData = res.data.rawPatientData;
      if (rawData !== null && rawData !== undefined) {
        this.arraySort = rawData;

        this.resData = _.last(rawData);

        console.log(this.resData);

        this.mapping(this.resData);

      }
      this.spinner.hide();
    });
  }

  mapping(data) {
    this.latpatientId = data.patientId;
    this.latReportedOn = data.reportedOn;
    this.latonsetEstimate = data.onsetEstimate;
    this.latageEstimate = data.ageEstimate;

    if (data.gender !== '') {
      this.latgender = data.gender;
    } else {
      this.latgender = 'N/A';
    }
    if (data.ageEstimate !== '') {
      this.latageEstimate = data.ageEstimate;
    } else {
      this.latageEstimate = 'N/A';
    }
    if (data.district !== '') {
      this.latdistrict = data.district;
    } else {
      this.latdistrict = 'N/A';
    }


    if (data.sources) {
      if (data.sources < 0) {
        this.latsource = data.sources[0];
      }
    } else {
      this.latsource = 'Not Known';
    }

    if (data.state !== '') {
      this.latstate = data.state;
    } else {
      this.latstate = 'N/A';
    }
    if (data.status !== '') {
      this.latstatus = data.status;
    } else {
      this.latstatus = 'N/A';
    }
    if (data.city !== '') {
      this.latcity = data.city;
    } else {
      this.latcity = 'N/A';
    }
    if (data.notes !== '') {
      this.latnotes = data.notes;
    } else {
      this.latnotes = 'Awaiting response';
    }
    if (data.contractedFrom !== '') {
      this.latcontractedFrom = data.contractedFrom;
    } else {
      this.latcontractedFrom = 'N/A';
    }

    if (data.travel) {
      if (data.travel.length > 0) {
        this.lattravel = data.travel[0];
      } else {
        this.lattravel = 'N/A';
      }
    } else {
      this.lattravel = 'Not Available';
    }

  }

  onKeySearch(value: number) {
    this.resData = {};
    this.arraySort.forEach(element => {
      if (Number(value) === element.patientId) {
        // this.newSortArr.push(element);
        this.resData = JSON.parse(JSON.stringify(element));
      }
    });
    this.mapping(this.resData);
    // console.log(this.resData);
  }
}
