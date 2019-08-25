import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Data, Timesheet} from './timelog-day/timelog-day.component';

const data2 = {
  timesheets: [
    {
      date: '08/25/2019',
      saveTime: '11:22 PM',
      timesheet: [
        {project: 'Windows', time: 2.25, comment: '#435: added localization on landing page'},
        {project: 'Microsoft', time: 4.5, comment: 'never work'}
      ]}
  ]
  ,
  projects: [
    {name: 'Windows', color: 'red'},
    {name: 'Skype', color: 'yellow'},
    {name: 'Mifot', color: 'blue'},
    {name: 'Microsoft', color: 'green'}
  ]
};

let dataSourse: Data;

@Injectable()
export class DataService {
  constructor(
    private http: HttpClient
  ) {
  }

  setTestData() {
    console.log(dataSourse);
    const lock = new HttpParams()
      .append('f', 'LOCKGET')
      .append('n', 'GLEB_TIMESHEET')
      .append('p', '12345');

    const update = new HttpParams()
      .append('f', 'UPDATE')
      .append('n', 'GLEB_TIMESHEET')
      .append('p', '12345')
      .append('v', JSON.stringify(data2));



    // this.http
    //   .post('https://fe.it-academy.by/AjaxStringStorage2.php', lock)
    //   .subscribe((requestValue) => {
    //     this.http
    //       .post('https://fe.it-academy.by/AjaxStringStorage2.php', update)
    //       .subscribe((requestValue2) => {
    //         console.log(requestValue2);
    //       });
    //   });
  }

  setTimesheetData(timesheet: Timesheet[], date, saveTime): void {
    const newTimesheet = {date, saveTime, timesheet};
    const index = dataSourse.timesheets.findIndex((elem) => elem.date === date);
    if (index !== -1) {
      dataSourse.timesheets = [
        ...dataSourse.timesheets.slice(0, index),
        newTimesheet,
        ...dataSourse.timesheets.slice(index + 1, dataSourse.timesheets.length),
      ];
    }
    if (index === -1) {
      dataSourse.timesheets.push(newTimesheet);
    }
    console.log(dataSourse);
    this.setData();
  }

  setData() {
    const lock = new HttpParams()
      .append('f', 'LOCKGET')
      .append('n', 'GLEB_TIMESHEET')
      .append('p', '12345');

    const update = new HttpParams()
      .append('f', 'UPDATE')
      .append('n', 'GLEB_TIMESHEET')
      .append('p', '12345')
      .append('v', JSON.stringify(dataSourse));

    this.http
      .post('https://fe.it-academy.by/AjaxStringStorage2.php', lock)
      .subscribe((requestValue) => {
        this.http
          .post('https://fe.it-academy.by/AjaxStringStorage2.php', update)
          .subscribe((requestValue2) => {
            console.log(requestValue2);
          });
      });
  }

  getData() {
    const read = new HttpParams()
      .append('f', 'READ')
      .append('n', 'GLEB_TIMESHEET');

    return this.http
      .post('https://fe.it-academy.by/AjaxStringStorage2.php', read)
      .pipe(
        map((data: {result: string}) => {
          return dataSourse = JSON.parse(data.result);
        })
      );
  }
}
