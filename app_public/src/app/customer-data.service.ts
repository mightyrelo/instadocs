import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../environments/environment';

import { Customer } from './customer';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public getCustomers(userName: string) : Promise<Customer[]> {
    const url : string = `${this.apiBaseUrl}/customers/name/${userName}`;
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('aqis-token')}`
      })
    };
    return this.http
        .get(url)
        .toPromise()
        .then(response => response as Customer[])
        .catch(this.handleError);
  }

  public getCustomer(cusId: string) : Promise<Customer> {
    const url : string = `${this.apiBaseUrl}/customers/${cusId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Customer)
      .catch(this.handleError);
  }

  public addCustomer(customer: Customer) : Promise<Customer> {
    const url : string = `${this.apiBaseUrl}/customers`;
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('ppApp-token')}`
      })
    };
    return this.http
        .post(url, customer, httpOptions)
        .toPromise()
        .then(response => response as Customer)
        .catch(this.handleError);
  }

  public deleteCustomer(customerId: string) : Promise<null> {
    if(customerId == null) {return null;}
    const url : string = `${this.apiBaseUrl}/customers/${customerId}`;
    return this.http
      .delete(url)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  public updateCustomer(customer: Customer, customerId: string) : Promise<any> {
    const url: string = `${this.apiBaseUrl}/customers/${customerId}`;
    return this.http
        .put(url, customer)
        .toPromise()
        .then(resp => resp as any)
        .catch(this.handleError);
  }

 

  private handleError(error: any) : Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);

  }
}
