import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { StateDetails } from 'src/app/shared/state.model';
import { DistrictDetails } from 'src/app/shared/district.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { TitleCasePipe } from '@angular/common';
import 'moment/locale/pt-br';
import { TestData, StateTestData } from '../tests.model';


@Component({
  selector: 'app-cluster-component',
  templateUrl: './cluster-component.component.html',
  styleUrls: ['./cluster-component.component.scss']
})
export class ClusterComponentComponent implements OnInit {

  baseStateURL = 'https://api.covid19india.org/state_district_wise.json';
  testUrl = 'https://api.covid19india.org/state_test_data.json';
  allStateData: any;
  stateDetailedList: Array<StateDetails> = [];
  allListURL = 'https://api.covid19india.org/data.json';
  allData: any;
  dataArray: [];
  totalStateCnf: any;
  totalConfirmed: string;
  totalActive: string;
  totalDeath: string;
  totalRecovered: string;
  lastUpdatedTime: string;
  todaysData: [];
  todayConfirm: string;
  todayRecover: string;
  todayActive: any;
  todayDeath: string;
  interval;
  closeAlrt = true;
  clrSrch: boolean;
  arraySort = [];
  searchValue = '';
  swtchView: boolean;
  nwAr = [];
  lArr = [];

  @ViewChild('searchState', { static: false }) searchState: ElementRef;
  srchCnf: any;
  srchDt: any;
  srchRcv: any;
  srchAct: any;
  newDt: any;
  newTestArr: Array<StateTestData> = [];
  newStateTestData: Array<TestData> = [];
  totaltested: string;
  positive: string;
  unconfirmed: string;
  negative: string;
  updatedOn: string;


  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private titlecasePipe: TitleCasePipe
  ) {
    moment.locale('en');
  }

  ngOnInit() {
    this.spinner.show();
    this.getAllList('normal');
    this.interval = setInterval(() => {
      this.getAllList('refresh');
    }, 300000);
    this.getStateList();

    this.getTempList();

  }

  getStateList() {
    this.http.get(this.baseStateURL).subscribe(res => {
      this.swtchView = true;
      this.allStateData = res;
      _.map(this.allStateData, (value, key) => {
        const stateObject = new StateDetails();
        stateObject.name = key;
        stateObject.details = this._decryptStateDetails(value);
        this.stateDetailedList.push(stateObject);
      });
    });
  }

  getAllList(data: any) {
    // this.spinner.show();
    this.http.get(this.allListURL).subscribe(res => {

      this.allData = res;
      this.dataArray = this.allData.statewise;

      this.todaysData = this.allData.statewise;

      this.getTempList();
      if (this.allData !== null && this.allData !== undefined) {
        this.totalConfirmed = this.allData.statewise[0].confirmed;
        this.totalActive = this.allData.statewise[0].active;
        this.totalRecovered = this.allData.statewise[0].recovered;
        this.totalDeath = this.allData.statewise[0].deaths;
        this.lastUpdatedTime = moment(moment(this.allData.statewise[0].lastupdatedtime, 'DD/MM/YYYY HH:mm').format('lll')).fromNow();
        this.todayConfirm = this.allData.statewise[0].deltaconfirmed;
        this.todayActive =
          (this.allData.statewise[0].deltaconfirmed -
            this.allData.statewise[0].deltarecovered) -
          this.allData.statewise[0].deltadeaths;
        this.todayRecover = this.allData.statewise[0].deltarecovered;
        this.todayDeath = this.allData.statewise[0].deltadeaths;
      }
      if (data === 'normal') {
        this.toastr.success('Last updated ' + this.lastUpdatedTime);
      }

      this.spinner.hide();
    });
  }

  private _decryptStateDetails(stateData: any): Array<DistrictDetails> {
    const districtArray: Array<DistrictDetails> = [];
    _.map(stateData.districtData, (val, key) => {
      const districtDetails = new DistrictDetails();
      districtDetails.name = key;
      districtDetails.details.active = val.active;
      districtDetails.details.confirmed = val.confirmed;
      districtDetails.details.deaths = val.deaths;
      districtDetails.details.recovered = val.recovered;
      districtDetails.details.lastupdatedtime = val.lastupdatedtime;
      districtDetails.details.delta.confirmed = val.delta.confirmed;

      districtArray.push(districtDetails);
    });
    return districtArray;
  }
  clrAlrt() {
    this.closeAlrt = false;
  }

  getTempList() {
    this.http.get('https://api.rootnet.in/covid19-in/unofficial/covid19india.org').subscribe(res => {
    });
  }

  onKeySearch(value: any) {
    this.swtchView = false;
    this.nwAr = [];
    this.lArr = [];

    let resData = {};
    this.clrSrch = true;
    const tempVal = this.titlecasePipe.transform(value);
    this.stateDetailedList.forEach(element => {
      if (tempVal === element.name) {
        resData = JSON.parse(JSON.stringify(element));

      }
    });

    this.lArr = _.filter(this.allData.statewise, ['state', tempVal]);
    this.nwAr.push(resData);
    this.srchCnf = this.lArr[0].confirmed;
    this.srchDt = this.lArr[0].deaths;
    this.srchAct = this.lArr[0].active;
    this.srchRcv = this.lArr[0].recovered;

    this.http.get(this.testUrl).subscribe(res => {
      this.newDt = res;
      let td: Array<TestData> = [];
      td = this.newDt.states_tested_data;
      console.log(td);
      this.newStateTestData = [];
      this.newStateTestData = _.filter(td, ['state', tempVal]);
      console.log(this.newStateTestData);
      let tempObj = new TestData();
      tempObj = _.last(this.newStateTestData);
      console.log(tempObj);
      if (tempObj !== null && tempObj !== undefined) {
        this.totaltested = tempObj.totaltested;
        this.positive = tempObj.positive;
        this.unconfirmed = tempObj.unconfirmed;
        this.negative = tempObj.negative;
        this.updatedOn = tempObj.updatedon;
      }

    });


  }


  clearSearch() {
    this.getStateList();
    this.searchState.nativeElement.value = '';
  }

}
