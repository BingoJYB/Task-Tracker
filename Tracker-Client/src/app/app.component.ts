import {Component, OnInit} from '@angular/core';
import {Task} from './task';
import {HttpService} from "./http.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    second = '00';
    minute = '00';
    hour = '00';
    interval: any;
    selectedDate: Date;
    page = 1;
    isTextDisabled = false;
    isStartbtnClicked = false;
    startDate: Date;
    endDate: Date;
    description: String;
    tasks: Task[];
    display: Task[];

    constructor(private httpService: HttpService) {
    }

    ngOnInit() {
        this.httpService.getTasks().subscribe(tasks => {
            this.tasks = tasks;
            this.display = Object.assign([], this.tasks);
        });
    }

    startTimer(isValid) {
        if (isValid) {
            this.resumeTimer();
            this.isTextDisabled = true;
            this.isStartbtnClicked = true;
            this.startDate = new Date();
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
        } else {
            this.isStartbtnClicked = true;
        }
    }

    pauseTimer() {
        this.endDate = new Date();
        clearInterval(this.interval);
        this.httpService.addTask(new Task(this.startDate, this.endDate, this.description)).subscribe(tasks => {
            this.tasks = tasks;
            this.display = Object.assign([], this.tasks);
            this.isTextDisabled = false;
            this.isStartbtnClicked = false;
            this.description = '';
        });
    }

    resumeTimer() {
        this.second = '00';
        this.minute = '00';
        this.hour = '00';
        this.isTextDisabled = false;
        this.isStartbtnClicked = false;
        clearInterval(this.interval);
    }

    filterTask(selectedDate) {
        if (selectedDate === undefined || selectedDate === '') {
            this.display = this.tasks;
        } else {
            this.display = this.tasks.filter(task => {
                const date = new Date(String(task.startDate).split(' ')[0]);
                selectedDate = new Date(selectedDate);
                return date.getFullYear() === selectedDate.getFullYear()
                    && date.getMonth() === selectedDate.getMonth()
                    && date.getDate() === selectedDate.getDate();
            });
        }
    }
}
