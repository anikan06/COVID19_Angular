import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { LivePatient } from 'src/app/shared/livePatient.modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import 'moment/locale/pt-br';
import { ServiceAvailablityService } from './service-availablity.service';
import { ResponseObject } from './service-availability.model';
// import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-services-availablity',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services-availablity.component.html',
  styleUrls: ['./services-availablity.component.scss']
})
export class ServicesAvailablityComponent implements OnInit {

  baseUrl = 'https://api.covid19india.org/resources/resources.json';
  allData;
  tempArr = [];
  allNewState = [];
  allNewCities = [];
  allNewCategory = [];
  selectedState = 'Select State';
  selectedCity = 'Select City';
  selectedCategory = 'Select Category';
  filteredData = [];
  stateSelected;
  citySelected;
  categorySelected;

  // temp 
  stateSortedData = [];
  citySortedData = [];

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private availSer: ServiceAvailablityService,
    // private session: SessionStorageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getCity(stateSel) {
    // this.session.set('state', stateSel);
    this.allNewCities = [];
    this.stateSortedData = this.availSer.getRawCity(this.allData.resources, stateSel);
    this.allNewCities = _.uniq(_.map(this.stateSortedData, 'city'));
  }

  getCategory(citySel) {
    // this.session.set('city', citySel);
    this.filteredData = [];
    this.citySortedData = [];
    this.citySortedData = this.availSer.getRawCategory(this.stateSortedData, citySel);

    this.allNewCategory = _.uniq(_.map(this.citySortedData, 'category'));
  }

  getFilterData(selDt) {
    this.filteredData = [];
    // this.stateSelected = this.session.get('state');
    // this.citySelected = this.session.get('city');
    this.filteredData = this.availSer.getFilterData(this.citySortedData, selDt);
  }

  getData() {
    this.http.get<ResponseObject>(this.baseUrl).subscribe(res => {
      this.allData = res;
      this.allNewState = this.availSer.getRawData(this.allData.resources);
    });
  }



}
