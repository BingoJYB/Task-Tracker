import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Task} from './task';

@Injectable()
export class HttpService {
    postURL = 'http://localhost:3000/tracker/api/v1/create_task';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {
    }

    addTask(task: Task): Observable<Task[]> {
        return this.http.post<Task>(this.postURL, task, this.httpOptions)
            .catch((err) => {
                return Observable.throw(err)
            });
    }
}
