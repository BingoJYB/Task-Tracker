import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
    @Input() task: any;
    @Output() getId = new EventEmitter<String>();
    isCollapsed = true;

    ngOnInit() {
    }

    // pass id from child component to parent component
    popId(id) {
        this.getId.emit(id);
    }
}
