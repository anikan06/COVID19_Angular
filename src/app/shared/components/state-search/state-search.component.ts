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
import { TestData, StateTestData } from 'src/app/cluster/tests.model';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { StateDetailsFil } from './state-search.modal';

@Component({
  selector: 'app-state-search',
  templateUrl: './state-search.component.html',
  styleUrls: ['./state-search.component.scss']
})
export class StateSearchComponent implements OnInit {
  totaltested: any;
  positive: any;
  baseStateURL = 'https://api.covid19india.org/state_district_wise.json';
  testUrl = 'https://api.covid19india.org/state_test_data.json';
  allListURL = 'https://api.covid19india.org/data.json';
  unconfirmed: any;
  negative: any;
  updatedOn: any;
  agoUpdatedOn: any;
  swtchView: boolean;
  nwAr: Array<StateDetailsFil> = [];
  lArr: any[];
  labelArr = [];
  valueArr = [];
  btnhd: boolean;
  clrSrch: boolean;
  srchCnf: any;
  srchDt: any;
  srchRcv: any;
  srchAct: any;
  newDt: any;
  newTestArr: Array<StateTestData> = [];
  newStateTestData: Array<TestData> = [];
  stateDetailedList: Array<StateDetails> = [];

  @ViewChild('searchState', { static: false }) searchState: ElementRef;
  allStateData: any;
  allData: any;
  interval;

  


  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private titlecasePipe: TitleCasePipe
  ) {
    moment.locale('en');
  }

  ngOnInit() {
    this.getStateList();
    this.getAllList('normal');
    this.interval = setInterval(() => {
      this.getAllList('refresh');
    }, 300000);
  }

  //chart

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  getAllList(data: any) {
    // this.spinner.show();
    this.http.get(this.allListURL).subscribe(res => {

      this.allData = res;
    });
  }

  clearSearch() {
    this.btnhd = false;
    this.getStateList();
    this.searchState.nativeElement.value = '';
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

  onKeySearch(value: any) {
    this.swtchView = false;
    this.nwAr = [];
    this.lArr = [];
    // this.valueArr = [];
    // this.labelArr = [];
    this.btnhd = true;
    let resData = new StateDetailsFil();
    this.clrSrch = true;
    const tempVal = this.titlecasePipe.transform(value);
    this.stateDetailedList.forEach(element => {
      if (tempVal === element.name) {
        resData = JSON.parse(JSON.stringify(element));
      }
    });

    this.lArr = _.filter(this.allData.statewise, ['state', tempVal]);
    this.nwAr.push(resData);
    this.nwAr.forEach(ele => {
      ele.details.forEach(el => {
        this.labelArr.push(el.name);
        this.valueArr.push(el.details.active);
      })
      console.log(this.labelArr);
      console.log(this.valueArr);
    })



    this.srchCnf = this.lArr[0].confirmed;
    this.srchDt = this.lArr[0].deaths;
    this.srchAct = this.lArr[0].active;
    this.srchRcv = this.lArr[0].recovered;

    this.http.get(this.testUrl).subscribe(res => {
      this.newDt = res;
      let td: Array<TestData> = [];
      td = this.newDt.states_tested_data;
      this.newStateTestData = [];
      this.newStateTestData = _.filter(td, ['state', tempVal]);
      let tempObj = new TestData();
      tempObj = _.last(this.newStateTestData);
      let prevTempObj = new TestData();
      prevTempObj = _.nth(this.newStateTestData, -2);
      const todayDt = (moment(new Date()).format('DD/MM/YYYY'));

      if (tempObj.totaltested !== '') {
        this.totaltested = tempObj.totaltested;
        this.positive = tempObj.positive;
        this.unconfirmed = tempObj.unconfirmed;
        this.negative = tempObj.negative;
        this.updatedOn = tempObj.updatedon;
        this.agoUpdatedOn = moment(moment(tempObj.updatedon, 'DD/MM/YYYY').format('ll')).fromNow();
      }

      if (tempObj.totaltested === '') {
        this.totaltested = prevTempObj.totaltested;
        this.positive = prevTempObj.positive;
        this.unconfirmed = prevTempObj.unconfirmed;
        this.negative = prevTempObj.negative;
        this.updatedOn = prevTempObj.updatedon;
      }

    });


  }

  public doughnutChartLabels: Label[] = this.labelArr;
  public doughnutChartData: MultiDataSet = this.valueArr;
  public doughnutChartType: ChartType = 'doughnut';

}
