import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';

import { Quote } from './quote';
import { Invoice } from './customer';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }


  public addInvoice(cusId: string, qId: string) : Promise<Invoice>{
    const url: string = `${this.apiBaseUrl}/customers/${cusId}/quotations/${qId}/invoice`;
    return this.http
        .post(url, {})
        .toPromise()
        .then(resp => resp as Invoice)
        .catch(this.handleError);
  }

  public readInvoices(cusId: string) : Promise<Invoice[]> {
    const url: string = `${this.apiBaseUrl}/customers/${cusId}/invoices`;
    return this.http
        .get(url)
        .toPromise()
        .then(resp => resp as Invoice[])
        .catch(this.handleError);
  }

  public readInvoice(cusId: string, iId: string) {
    const url: string = `${this.apiBaseUrl}/customers/${cusId}/invoices/${iId}`;
    return this.http
        .get(url)
        .toPromise()
        .then(resp => resp as Invoice)
        .catch(this.handleError);
  }

  public deleteInvoice(cusId: string, iId: string){
    const url: string = `${this.apiBaseUrl}/customers/${cusId}/invoices/${iId}`;
    return this.http
      .delete(url)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  private handleError(error: any) : Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
