import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// @ts-ignore
import ApexCharts from 'apexcharts';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
})
export class DashboardMainComponent implements OnInit {
  userteams: number[] = [];
  env = environment;
  admin = false;
  student = false;
  teacher = false;
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {

    this.userteams.push(...this.auth.getLoggedValidUserTeamCodes());
    const type = this.getType();
    if (this.admin === true) {
       this.router.navigate(['/dashboard/dashboard-main']);

    } else if (this.teacher === true) {
       this.router.navigate(['/dashboard/dashboard-teacher']);

    } else if (this.student === true) {
       this.router.navigate(['/dashboard/dashboard-student']);

    }

    // Area chart

    var options = {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'Sales',
          data: [45, 60, 75, 51, 42, 42, 30],
        },
        {
          name: 'Expenses',
          color: '#FFBC53',
          data: [24, 48, 56, 32, 34, 52, 25],
        },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
    };
    var chart = new ApexCharts(
      document.querySelector('#apexcharts-area'),
      options
    );
    chart.render();

    // Bar chart

    var optionsBar = {
      chart: {
        type: 'bar',
        height: 350,
        width: '100%',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
        },
      },
      series: [
        {
          name: 'Boys',
          color: '#fdbb38',
          data: [
            420,
            532,
            516,
            575,
            519,
            517,
            454,
            392,
            262,
            383,
            446,
            551,
            563,
            421,
            563,
            254,
            452,
          ],
        },
        {
          name: 'Girls',
          color: '#19affb',
          data: [
            336,
            612,
            344,
            647,
            345,
            563,
            256,
            344,
            323,
            300,
            455,
            456,
            526,
            652,
            325,
            425,
            436,
          ],
        },
      ],
      labels: [
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
      ],
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: '#777',
          },
        },
      },
      title: {
        text: '',
        align: 'left',
        style: {
          fontSize: '18px',
        },
      },
    };

    var chartBar = new ApexCharts(document.querySelector('#bar'), optionsBar);
    chartBar.render();
  }

  getType() {
    if (this.userteams.includes(this.env.esylangTeams.admin) || this.userteams.includes(this.env.esylangTeams.superAdmin)) {
      return this.admin = true;
    } else if (this.userteams.includes(this.env.esylangTeams.teacher)) {
      return this.teacher = true;
    } else if (this.userteams.includes(this.env.esylangTeams.student)) {
      return this.student = true;
    }
  }
}
