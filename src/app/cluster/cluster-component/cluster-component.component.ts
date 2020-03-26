import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { StateDetails } from 'src/app/shared/state.model';
import { DistrictDetails } from 'src/app/shared/district.model';


@Component({
  selector: 'app-cluster-component',
  templateUrl: './cluster-component.component.html',
  styleUrls: ['./cluster-component.component.scss']
})
export class ClusterComponentComponent implements OnInit {

  baseStateURL = 'https://api.covid19india.org/state_district_wise.json';
  allStateData: any;
  stateDetailedList: Array<StateDetails> = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getStateList();
  }

  getStateList() {
    this.http.get(this.baseStateURL).subscribe(res => {
      console.log(res);
      this.allStateData = res;
      _.map(this.allStateData, (value, key) => {
        const stateObject = new StateDetails();
        stateObject.name = key;
        stateObject.details = this._decryptStateDetails(value);
        this.stateDetailedList.push(stateObject);
      });
      console.log(this.stateDetailedList);
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

      districtArray.push(districtDetails);
    });
    return districtArray;
  }
  }
