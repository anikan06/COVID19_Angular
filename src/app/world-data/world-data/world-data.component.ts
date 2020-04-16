import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { LivePatient } from 'src/app/shared/livePatient.modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { NoCommaPipe } from 'src/app/shared/pipes/no-comma.pipe';



@Component({
  selector: 'app-world-data',
  templateUrl: './world-data.component.html',
  styleUrls: ['./world-data.component.scss']
})
export class WorldDataComponent implements OnInit {

  baseUrl = 'https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats';
  totalCnf: any;
  totalAct: any;
  totalRcv: any;
  totalDth: any;
  lastUpdated: any;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private nocomma: NoCommaPipe
  ) { }

  ngOnInit() {
    this.getWorldData();
  }

  getWorldData() {
    let tempData;
    this.http.get(this.baseUrl).subscribe(res => {
      console.log(res);
      tempData = res;
      console.log(tempData.data);
      this.totalCnf = tempData.data.total_cases;
      this.totalRcv = tempData.data.recovery_cases;
      this.totalDth = tempData.data.death_cases;
      this.totalAct = tempData.data.currently_infected;
      this.lastUpdated = tempData.data.last_update;
    })
  }

}
