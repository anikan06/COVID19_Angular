import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  todayConfirm: string;
  todayRecover: string;
  todayActive: any;
  todayDeath: string;



  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAllList();
  }


  getAllList() {
    this.http.get(this.allListURL).subscribe(res => {
      console.log(res);
      this.allData = res;
      this.dataArray = this.allData.statewise;
      this.todaysData = this.allData.key_values;

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
    });
  }

}
