import {
  Component,
  OnInit} from '@angular/core';
// import { Chart } from 'angular-highcharts';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-test-chart',
  templateUrl: './test-chart.component.html',
  styleUrls: ['./test-chart.component.scss']
})
export class TestChartComponent implements OnInit {
  columnChart: Chart;
  donutChart: Chart;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
  ) { }

  // initColumn() {
  //   const column = new Chart({
  //     chart: {
  //       type: 'column'
  //     },
  //     title: {
  //       text: 'Unique User'
  //     },
  //     credits: {
  //       enabled: false
  //     },

  //     series: [{
  //       name: 'Line 1',
  //       data: [1, 52, 123, 90, 24, 67, 77],
  //       type: undefined
  //     }]
  //   });
  //   column.addPoint(121);
  //   this.columnChart = column;
  //   column.ref$.subscribe(console.log);
  // }
  // initDonut() {
  //   const donut = new Chart({
  //     chart: {
  //       plotBackgroundColor: null,
  //       plotBorderWidth: 0,
  //       plotShadow: false
  //     },
  //     title: {
  //       text: '<strong>1137<br>streams</strong>',
  //       align: 'center',
  //       verticalAlign: 'middle',
  //       y: 0
  //     },
  //     tooltip: {
  //       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     plotOptions: {
  //       pie: {
  //         allowPointSelect: true,
  //         cursor: 'pointer',
  //         dataLabels: {
  //           enabled: true,
  //           distance: -50,
  //           style: {
  //             fontWeight: 'bold',
  //             color: 'white'
  //           }
  //         },
  //         startAngle: -90,
  //         endAngle: -180,
  //         center: ['50%', '50%'],
  //         size: '90%',
  //         showInLegend: true
  //       }
  //     },
  //     series: [
  //       {
  //         name: 'Browsers',
  //         data: [
  //           {
  //             name: 'Chrome',
  //             y: 61.41
  //           },
  //           {
  //             name: 'Internet Explorer',
  //             y: 11.84,
  //           }, {
  //             name: 'Firefox',
  //             y: 10.85,
  //           }, {
  //             name: 'Edge',
  //             y: 4.67
  //           }, {
  //             name: 'Safari',
  //             y: 4.18
  //           }],
  //         type: 'pie',
  //         innerSize: '50%',
  //       }]
  //   });
  //   this.donutChart = donut;
  // }

  // pieChartLabels:string[];
  // pieChartData:number[];
  // pieChartType:string;

  ngOnInit() {
    // this.initColumn();
    // this.initDonut();
    

  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
