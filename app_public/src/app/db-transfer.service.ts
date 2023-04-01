import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DbTransferService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http : HttpClient
  ) { }

  public transferDB(userName: string) : Promise<null> {
    const url : string = `${this.apiBaseUrl}/transfer/${userName}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);

  }

  private handleError(error: any) : Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
