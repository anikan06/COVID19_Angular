import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { LivePatient } from 'src/app/shared/livePatient.modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import 'moment/locale/pt-br';
import { ServiceAvailablityService } from './service-availablity.service';
import { ResponseObject } from './service-availability.model';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-services-availablity',
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

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private availSer: ServiceAvailablityService,
    private session: SessionStorageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getCity(stateSel) {
    this.session.set('state', stateSel);
    this.allNewCities = [];
    this.allNewCities = this.availSer.getRawCity(this.allData.resources, stateSel);
  }

  getCategory(citySel) {
    this.session.set('city', citySel);
    this.allNewCategory = [];
    this.allNewCategory = this.availSer.getRawCategory(this.allData.resources, citySel);
    console.log(this.allNewCategory);
  }

  getFilterData(selDt) {
    this.filteredData = [];
    this.stateSelected = this.session.get('state');
    this.citySelected = this.session.get('city');
    this.filteredData = this.availSer.getFilterData(this.allData.resources, this.stateSelected, this.citySelected, selDt);
    console.log(this.filteredData);
  }

  getData() {
    this.http.get<ResponseObject>(this.baseUrl).subscribe(res => {
      this.allData = res;
      this.allNewState = this.availSer.getRawData(this.allData.resources);
    });
  }



}
