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
    page: number = 1;
    interval;
    selectedDate;
    description;
    isTextDisabled = false;

    TASKS = [
        {id: '1', start: '10/09/2018 07:00:00', end: '10/09/2018 08:00:00', description: 'Breakfast'},
        {id: '2', start: '10/09/2018 11:00:00', end: '10/09/2018 12:00:00', description: 'Lunch'},
        {id: '3', start: '10/08/2018 15:00:00', end: '10/08/2018 16:00:00', description: 'Rest'},
        {id: '4', start: '10/07/2018 18:00:00', end: '10/07/2018 19:00:00', description: 'Dinner'},
        {id: '5', start: '10/07/2018 21:00:00', end: '10/07/2018 23:00:00', description: 'Watch TV'},
        {id: '6', start: '10/07/2018 21:00:00', end: '10/07/2018 23:00:00', description: 'Watch TV'},
        {id: '7', start: '10/07/2018 21:00:00', end: '10/07/2018 23:00:00', description: 'Watch TV'},
        {id: '8', start: '10/07/2018 21:00:00', end: '10/07/2018 23:00:00', description: 'Watch TV'}
    ];
    tasks = Object.assign([], this.TASKS);

    startTimer() {
        this.resumeTimer();
        this.isTextDisabled = true;
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
        this.isTextDisabled = false;
        this.description = '';
        clearInterval(this.interval);
    }

    resumeTimer() {
        this.second = '00';
        this.minute = '00';
        this.hour = '00';
        this.isTextDisabled = false;
        clearInterval(this.interval);
    }

    filterTask(selectedDate) {
        if (selectedDate === undefined || selectedDate === '') {
            this.tasks = this.TASKS;
        } else {
            this.tasks = this.TASKS.filter(task => {
                const date = new Date(task.start.split(' ')[0]);
                selectedDate = new Date(selectedDate);
                return date.getFullYear() === selectedDate.getFullYear()
                    && date.getMonth() === selectedDate.getMonth()
                    && date.getDate() === selectedDate.getDate();
            });
        }
    }
}
