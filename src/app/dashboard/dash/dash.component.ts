import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { LivePatient } from 'src/app/shared/livePatient.modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DashService } from './dash.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';

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
  prevPatient = false;
  latdistrict: string;
  latstate: string;
  latstatus: string;
  latnotes: string;
  latcontractedFrom: string;
  lattravel: string;
  arraySort = [];
  searchValue = '';

  @ViewChild('searchValue', { static: false }) input: ElementRef;

  resData: any;
  latsource: any;
  newSortArr = {};
  prevPatientClicked = false;
  nextPatient = false;
  nextPatientClicked = false;
  clrSrch = false;
  closeAlrt = true;
  notifyAlrt = true;
  nextBtnDisabled = true;
  prevBtnDisabled = false;
  interval;
  livePatientUrl = 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org';

  // now = moment().startOf('hour').fromNow();


  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private dashService: DashService) {

      moment.locale('en');

  }

  ngOnInit() {
    this.spinner.show();
    this.getAllList('normal');
    this.interval = setInterval(() => {
      this.getAllList('refresh');
    }, 300000);
  }



  getAllList(data: any) {
    // this.spinner.show();
    this.http.get(this.allListURL).subscribe(res => {

      this.allData = res;
      this.dataArray = this.allData.statewise;

      this.todaysData = this.allData.statewise;

      this.dashService.sortArrayOfObjects(this.dataArray, 'confirmed');
      // if (data === 'normal') {
      this.getTempList();
      // }
      if (this.allData !== null && this.allData !== undefined) {
        this.totalConfirmed = this.allData.statewise[0].confirmed;
        this.totalActive = this.allData.statewise[0].active;
        this.totalRecovered = this.allData.statewise[0].recovered;
        this.totalDeath = this.allData.statewise[0].deaths;
        // this.lastUpdatedTime = this.allData.statewise[0].lastupdatedtime;
        this.lastUpdatedTime = moment(moment(this.allData.statewise[0].lastupdatedtime).format('DD-MM-YYYY HH:mm')).fromNow();
        // console.log(this.allData.statewise[0].lastupdatedtime);
        // console.log(moment(this.allData.statewise[0].lastupdatedtime).format('DD-MM-YYYY HH:mm'));
        // console.log(moment(moment(this.allData.statewise[0].lastupdatedtime).format('DD-MM-YYYY HH:mm')).fromNow());
        // this.todayConfirm = this.allData.key_values[0].confirmeddelta;
        this.todayConfirm = this.allData.statewise[0].deltaconfirmed;
        this.todayActive =
          (this.allData.statewise[0].deltaconfirmed -
            this.allData.statewise[0].deltarecovered) -
          this.allData.statewise[0].deltadeaths;
        this.todayRecover = this.allData.statewise[0].deltarecovered;
        this.todayDeath = this.allData.statewise[0].deltadeaths;
      }
      if (data === 'normal') { 
        // this.toastr.success('Fetched Data Successfully as on ' + this.lastUpdatedTime);
      }

      this.spinner.hide();
    });
  }

  getTempList() {
    this.http.get<LivePatient>(this.livePatientUrl).subscribe(res => {
      if (!this.prevPatientClicked && this.prevPatient) {
        this.resData = res.data.rawPatientData[res.data.rawPatientData.length - 1];
      }
      if (!this.prevPatient && !this.nextPatient) {
        const rawData = res.data.rawPatientData;
        if (rawData !== null && rawData !== undefined) {
          this.arraySort = rawData;

          this.resData = _.last(rawData);

          this.mapping(this.resData);

        }
      } else if (!this.nextPatient) {
        this.resData = res.data.rawPatientData[this.resData.patientId - 2];
        this.prevPatientClicked = true;
        if (this.resData.patientId === 1) {
          this.prevBtnDisabled = true;
        } else {
          this.prevBtnDisabled = false;
        }
        this.mapping(this.resData);
      } else {
        this.resData = res.data.rawPatientData[this.resData.patientId];
        this.nextPatientClicked = true;
        if (this.resData.patientId === res.data.rawPatientData.length) {
          this.nextBtnDisabled = true;
        } else {
          this.nextBtnDisabled = false;
        }
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
    this.clrSrch = true;
    this.arraySort.forEach(element => {
      if (Number(value) === element.patientId) {
        // this.newSortArr.push(element);
        this.resData = JSON.parse(JSON.stringify(element));
        if (element.patientId !== this.arraySort.length) {
          this.nextBtnDisabled = false;
        } else {
          this.nextBtnDisabled = true;
        }
        if (element.patientId === 1) {
          this.prevBtnDisabled = true;
        }
      }
    });
    this.mapping(this.resData);
  }
  prevPat() {
    this.input.nativeElement.value = '';
    this.clrSrch = false;
    this.prevPatient = true;
    this.nextPatient = false;
    this.nextBtnDisabled = false;
    this.getTempList();
  }
  nextPat() {
    this.input.nativeElement.value = '';
    this.clrSrch = false;
    this.prevBtnDisabled = false;
    this.nextPatient = true;
    this.prevPatient = false;
    this.getTempList();
  }

  clearSearch() {
    this.input.nativeElement.value = '';
    this.clrSrch = false;
    this.nextBtnDisabled = true;
    this.getTempList();
  }

  clrAlrt(d) {
    if (d === 'notify') {
      this.notifyAlrt = false;
    }
    if (d === 'time') {
      this.closeAlrt = false;
    }

  }
}
