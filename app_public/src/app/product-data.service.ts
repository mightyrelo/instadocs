import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../environments/environment';

import { Product } from './product';



//vName: vType = vValue;

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getProducts(userName : string): Promise<Product[]> {
    const url: string = `${this.apiBaseUrl}/products/userName/${userName}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);

  }
  public getCategoryProducts(userName: string, category : string): Promise<Product[]> {
    const url: string = `${this.apiBaseUrl}/products/userName/${userName}/categories/${category}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);

  }

  public getSubCategoryProducts(userName: string, subCategory: string) : Promise<Product[]> {
    console.log('service send', subCategory);
    const url: string = `${this.apiBaseUrl}/products/userName/${userName}/subcategories/${subCategory}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);
  }

  public getProduct(prodId: string) : Promise<Product> {
    const url : string = `${this.apiBaseUrl}/products/${prodId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
  }

  public getProductByName(name: string) : Promise<Product> {
    if(name){
      const url: string = `${this.apiBaseUrl}/products/name/${name}`;
      return this.http
      .get(url)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
    }
    else {
      const url: string = `${this.apiBaseUrl}/products/name/default`;
      return this.http
      .get(url)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
    }
 }

 

  public addProduct(prod: Product) : Promise<Product> {
    const url: string = `${this.apiBaseUrl}/products`;
    return this.http
        .post(url, prod)
        .toPromise()
        .then(response => response as Product)
        .catch(this.handleError);
  }

  public deleteProduct(prodId: string) : Promise<null> {
    const url: string = `${this.apiBaseUrl}/products/${prodId}`;
    return this.http
        .delete(url)
        .toPromise()
        .then(resp => resp as any)
        .catch(this.handleError);
  }

  public updateProduct(product: Product, productId: string) : Promise<null> {
    const url: string = `${this.apiBaseUrl}/products/${productId}`;
    return this.http
        .put(url, product)
        .toPromise()
        .then(resp => resp as any)
        .catch(this.handleError);
  };

  public getProductsByUserName(userName : string) : Promise<Product[]> {
    const url: string = `${this.apiBaseUrl}/products/userName/${userName}`;
    return this.http
        .get(url)
        .toPromise()
        .then(resp => resp as Product[])
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
