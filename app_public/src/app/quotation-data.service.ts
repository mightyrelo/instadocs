import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BROWSER_STORAGE } from './storage';

import { environment } from '../environments/environment';

import { Quote } from './quote';

@Injectable({
  providedIn: 'root'
})
export class QuotationDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public addQuote(qId: string, formQuote: Quote) : Promise<Quote> {   
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('aqis-token')}`
      })
    }; 
    const url: string = `${this.apiBaseUrl}/customers/${qId}/quotations`;
    
    return this.http
      .post(url, formQuote, httpOptions)
      .toPromise()
      .then(response => response as Quote)
      .catch(this.handleError);
  }

  public deleteQuote(cusId: string, qId: string) : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('aqis-token')}`
      })
    };
    
    const url: string = `${this.apiBaseUrl}/customers/${cusId}/quotations/${qId}`;
    return this.http
      .delete(url, httpOptions)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  
  public readQuote(cusId: string, qId: string) : Promise<Quote> {
    const url: string = `${this.apiBaseUrl}/customers/${cusId}/quotations/${qId}`;
    return this.http
        .get(url)
        .toPromise()
        .then(resp => resp as Quote)
        .catch(this.handleError);
  }

  private handleError(error: any) : Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
