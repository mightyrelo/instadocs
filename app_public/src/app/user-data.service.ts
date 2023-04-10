import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { AuthResponse } from './auth-response';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private apiBaseUrl = environment.apiBaseUrl;
  

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User) : Promise<AuthResponse>  {
   return this.makeAuthApiCall('register', user);
  }

  public login(user: User) : Promise<AuthResponse>  {
    return this.makeAuthApiCall('login', user);
  }

  private makeAuthApiCall(path: string, user: User) {
    const url : string = `${this.apiBaseUrl}/${path}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);

  }

  public getUsers() {
    const url : string = `${this.apiBaseUrl}/users`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as User[])
      .catch(this.handleError);
  }

  public deleteUser(userId: string) {
    const url : string = `${this.apiBaseUrl}/users/${userId}`;
    return this.http
        .delete(url)
        .toPromise()
        .then(response => response as any)
        .catch(this.handleError);
  }

  public getUserByName(userName : string) {
    const url : string = `${this.apiBaseUrl}/users/username/${userName}`;
    return this.http
       .get(url)
       .toPromise()
       .then(response => response as User)
       .catch(this.handleError);
  }

  public getUser(userId : string) {
    console.log('insfds', userId);
    const url : string = `${this.apiBaseUrl}/users/${userId}`;
    return this.http
       .get(url)
       .toPromise()
       .then(response => response as User)
       .catch(this.handleError);
  }

  public updateQuotes(user : User) {
    const url : string = `${this.apiBaseUrl}/users/${user._id}`;
    return this.http
        .put(url, user)
        .toPromise()
        .then(response => response as any)
        .catch(this.handleError);
  }

  public updateInvoices(user : User) {
    const url : string = `${this.apiBaseUrl}/users/${user._id}`;
    return this.http
        .put(url, user)
        .toPromise()
        .then(response => response as any)
        .catch(this.handleError);
  }

  public updatePOs(user : User) {
    const url : string = `${this.apiBaseUrl}/users/${user._id}`;
    return this.http
        .put(url, user)
        .toPromise()
        .then(response => response as any)
        .catch(this.handleError);
  }

  public updateUser(user : User) {
    const url : string = `${this.apiBaseUrl}/users/${user._id}`;
    return this.http
        .put(url, user)
        .toPromise()
        .then(response => response as any)
        .catch(this.handleError);
  }

  private handleError(error: any) : Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }


}
