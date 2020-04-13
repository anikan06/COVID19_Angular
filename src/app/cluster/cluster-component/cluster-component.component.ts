import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { StateDetails } from 'src/app/shared/state.model';
import { DistrictDetails } from 'src/app/shared/district.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import 'moment/locale/pt-br';


@Component({
  selector: 'app-cluster-component',
  templateUrl: './cluster-component.component.html',
  styleUrls: ['./cluster-component.component.scss']
})
export class ClusterComponentComponent implements OnInit {

  baseStateURL = 'https://api.covid19india.org/state_district_wise.json';
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


  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
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
      this.allStateData = res;
      _.map(this.allStateData, (value, key) => {
        const stateObject = new StateDetails();
        stateObject.name = key;
        stateObject.details = this._decryptStateDetails(value);
        this.stateDetailedList.push(stateObject);

        // this.stateDetailedList.forEach(element => {
        //   // console.log(element.details) ;
        //   element.details.forEach(ele => {
        //     console.log(ele.name);
        //     console.log(ele.details);
        //   })
        // });
      });
    });
  }

  getAllList(data: any) {
    // this.spinner.show();
    this.http.get(this.allListURL).subscribe(res => {

      this.allData = res;
      this.dataArray = this.allData.statewise;

      this.todaysData = this.allData.statewise;
      console.log(this.dataArray);

      // this.dashService.sortArrayOfObjects(this.dataArray, 'confirmed');
      // if (data === 'normal') {
      this.getTempList();
      // }
      if (this.allData !== null && this.allData !== undefined) {
        this.totalConfirmed = this.allData.statewise[0].confirmed;
        this.totalActive = this.allData.statewise[0].active;
        this.totalRecovered = this.allData.statewise[0].recovered;
        this.totalDeath = this.allData.statewise[0].deaths;
        // this.lastUpdatedTime = this.allData.statewise[0].lastupdatedtime;
        this.lastUpdatedTime = moment(moment(this.allData.statewise[0].lastupdatedtime, 'DD/MM/YYYY HH:mm').format('lll')).fromNow();
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
}
