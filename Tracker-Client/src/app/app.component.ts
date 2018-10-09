import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  second = '00';
  minute = '00';
  hour = '00';
  interval;

  tasks = [
    { id: '1', start: '07:00:00', end: '08:00:00', description: 'Breakfast' },
    { id: '2', start: '11:00:00', end: '13:00:00', description: 'Lunch' }
  ];

  startTimer() {
    this.pauseTimer();
    this.interval = setInterval(() => {
      let s = +this.second;
      let m = +this.minute;
      let h = +this.hour;
      s++;
      if (s > 59) {
        s = 0;
        m++;
      }
      if (m > 59) {
        m = 0;
        h++;
      }
      if (s < 10) {
        this.second = '0' + String(s);
      } else {
        this.second = String(s);
      }
      if (m < 10) {
        this.minute = '0' + String(m);
      } else {
        this.minute = String(m);
      }
      if (h < 10) {
        this.hour = '0' + String(h);
      } else {
        this.hour = String(h);
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resumeTimer() {
    this.second = '00';
    this.minute = '00';
    this.hour = '00';
    this.pauseTimer();
  }
}
