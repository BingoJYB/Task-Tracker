import {Component, OnInit} from '@angular/core';
import {Task} from './task';
import {HttpService} from "./http.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // timer
    second = '00';
    minute = '00';
    hour = '00';
    interval: any;
    // filter
    selectedDate: Date;
    // pagination
    page = 1;
    isTextDisabled = false;
    isStartbtnClicked = false;
    started = false;
    // sort
    key = 'startDate';
    reverse = true;
    // Task object fields
    startDate: String;
    endDate: String;
    description: String;
    // storage
    tasks: Task[];
    display: Task[];

    constructor(private httpService: HttpService) {
    }

    // get all tasks from db at the beginning
    ngOnInit() {
        this.httpService.getTasks().subscribe(tasks => {
            this.tasks = tasks;
            this.display = Object.assign([], this.tasks);
        });
    }

    // if description exists, start timer
    startTimer(isValid) {
        if (isValid) {
            if (this.started === false) {
                this.resumeTimer();
                this.isTextDisabled = true;
                this.started = true;
                this.startDate = this.haveNiceDateFormat(new Date());
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
        } else {
            this.isStartbtnClicked = true;
        }
    }

    // stop timer and create new task
    pauseTimer() {
        if (this.started === true) {
            this.endDate = this.haveNiceDateFormat(new Date());
            clearInterval(this.interval);
            this.httpService.addTask({
                startDate: this.startDate,
                endDate: this.endDate,
                description: this.description
            }).subscribe(tasks => {
                this.tasks = tasks;
                this.filterTask(this.selectedDate);
                this.isTextDisabled = false;
                this.started = false;
                this.isStartbtnClicked = false;
                this.description = '';
            });
        }
    }

    // resume the timer
    resumeTimer() {
        this.second = '00';
        this.minute = '00';
        this.hour = '00';
        this.isTextDisabled = false;
        this.started = false;
        this.isStartbtnClicked = false;
        clearInterval(this.interval);
    }

    // delete a task by id
    deleteTask(id) {
        this.httpService.deleteTask(id).subscribe(tasks => {
            this.tasks = tasks;
            this.filterTask(this.selectedDate);
        });
    }

    // filter all tasks by start date
    filterTask(selectedDate) {
        if (selectedDate === undefined || selectedDate === '') {
            this.display = this.tasks;
        } else {
            this.display = this.tasks.filter(task => {
                const date = new Date(task.startDate.split(' ')[0]);
                selectedDate = new Date(selectedDate);
                return date.getFullYear() === selectedDate.getFullYear()
                    && date.getMonth() === selectedDate.getMonth()
                    && date.getDate() === selectedDate.getDate();
            });
        }
    }

    // format the timestamp as mm/dd/yyyy hh:mm:ss
    haveNiceDateFormat(timestamp) {
        let yyyy = timestamp.getFullYear().toString();
        let MM = (timestamp.getMonth() + 1).toString();
        let dd = timestamp.getDate().toString();
        let hh = timestamp.getHours().toString();
        let mm = timestamp.getMinutes().toString();
        let ss = timestamp.getSeconds().toString();
        return (MM[1] ? MM : "0" + MM[0]) + '/' + (dd[1] ? dd : "0" + dd[0]) + '/' + yyyy + ' ' + (hh[1] ? hh : "0" +
            hh[0]) + ':' + (mm[1] ? mm : "0" + mm[0]) + ':' + (ss[1] ? ss : "0" + ss[0]);
    }
}
