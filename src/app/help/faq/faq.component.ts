import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FaqArr, FaqObj } from './faq.modal';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
// tslint:disable-next-line: component-class-suffix

export class FaqComponent implements OnInit {

  faqUrl = 'https://api.covid19india.org/faq.json';
  faqArray: Array<FaqArr> = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getFaq();
  }

  getFaq() {
    this.http.get<FaqObj>(this.faqUrl).subscribe(res => {
      console.log(res);
      this.faqArray = res.faq;
    });
  }

}
