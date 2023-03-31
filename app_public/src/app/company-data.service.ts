import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {environment} from '../environments/environment';

import { Company } from './company';


@Injectable({
  providedIn: 'root'
})

export class CompanyDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public readCompanies() : Promise<Company[]> {
    const url: string = `${this.apiBaseUrl}/companies`;
    return this.http
        .get(url)
        .toPromise()
        .then(resp => resp as Company[])
        .catch(this.handleError);
  }

  public readCompany(id: string) : Promise<Company> {
    const url: string = `${this.apiBaseUrl}/companies/${id}`;
    return this.http
        .get(url)
        .toPromise()
        .then(resp => resp as Company)
        .catch(this.handleError);
  }

  public addCompany(company: Company) : Promise<Company> {
    const url: string = `${this.apiBaseUrl}/companies`;
    return this.http
        .post(url, company)
        .toPromise()
        .then(resp => resp as Company)
        .catch(this.handleError);
  }

  public removeCompany(id: string) : Promise<null> {
    const url: string = `${this.apiBaseUrl}/companies/${id}`;
    return this.http
        .delete(url)
        .toPromise()
        .then(resp => resp as any)
        .catch(this.handleError);
  }

  private handleError(error: any) : Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
