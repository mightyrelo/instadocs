import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../environments/environment';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getTasks(): Promise<Task[]> {
    const url: string = `${this.apiBaseUrl}/tasks`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Task[])
      .catch(this.handleError);
  }

  public deleteTask(taskId: string) : Promise<null> {
    if(taskId == null) {return null;}
    const url : string = `${this.apiBaseUrl}/tasks/${taskId}`;
    return this.http
      .delete(url)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
