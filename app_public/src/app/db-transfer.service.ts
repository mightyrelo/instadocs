import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

import { Task } from './task';


@Injectable({
  providedIn: 'root'
})
export class DbTransferService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http : HttpClient
  ) { }

  public transferDB(formUser: any) : Promise<null> {
    const url : string = `${this.apiBaseUrl}/transfer/${formUser.name}/pricelist/${formUser.pricelist}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);

  }

  public transferTasks() : Promise<Task[]> {
    const url : string = `${this.apiBaseUrl}/transfer/tasks`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Task[])
      .catch(this.handleError);

  }

  private handleError(error: any) : Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
