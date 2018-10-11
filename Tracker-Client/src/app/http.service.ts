import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch'
import {Task} from './task';

@Injectable()
export class HttpService {
    baseURL = 'http://localhost:3000/tracker/api/v1';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {
    }

    getTasks(): Observable<Task[]> {
        return this.http.get(`${this.baseURL}/get_tasks`, this.httpOptions)
            .catch((err) => {
                return Observable.throw(err)
            });
    }

    addTask(task: Task): Observable<Task[]> {
        return this.http.post<Task>(`${this.baseURL}/create_task`, task, this.httpOptions)
            .catch((err) => {
                return Observable.throw(err)
            });
    }

    deleteTask(id: String): Observable<Task[]> {
        return this.http.delete(`${this.baseURL}/delete_task/${id}`, this.httpOptions)
            .catch((err) => {
                return Observable.throw(err)
            });
    }
}
