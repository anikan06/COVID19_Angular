import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { OnlyState, ResponseObject } from './service-availability.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceAvailablityService {

  baseUrl = 'https://api.covid19india.org/resources/resources.json';
  allData;
  tempArr = [];
  allState = [];
  allCities = [];
  allCtgry = [];
  filterData = [];

  constructor(
    private http: HttpClient,
  ) { }

  getRawData(data) {
    data.forEach(e => {

      this.tempArr.push(e.state);

    });

    return _.uniq(this.tempArr);

  }

  getRawCity(allDt, dt) {
    if (allDt.length !== 0 && allDt.length !== undefined) {
      this.allCities = [];
      allDt.forEach(ele => {
        if (dt === ele.state) {

          const ctyTmp = ele.city;
          this.allCities.push(ctyTmp);
        }
      });
    }

    return _.uniq(this.allCities);
  }

  getRawCategory(allDta, cat) {
    if (allDta.length !== 0 && allDta.length !== undefined) {
      this.allCities = [];
      this.filterData = [];
      allDta.forEach(ele => {
        if (cat === ele.city) {

          const ctTmp = ele.category;
          this.allCtgry.push(ctTmp);
          
        }
      });
    }

    return _.uniq(this.allCtgry);
  }

  getFilterData(allData, st, ct, val) {
    if (allData.length !== 0 && allData.length !== undefined) {
      this.filterData = [];
      allData.forEach(ele => {
        if (st === ele.state) {
          if (ct === ele.city) {
            if (val === ele.category) {

              const ctTmp = ele;
              this.filterData.push(ctTmp);
            }
          }
        }

      });
    }

    return this.filterData;
  }







}
