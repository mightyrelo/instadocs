import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../product';
import { ProductDataService } from '../product-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-view-product-content',
  templateUrl: './view-product-content.component.html',
  styleUrls: ['./view-product-content.component.css']
})
export class ViewProductContentComponent implements OnInit {

  @Input() dbProduct : Product;

  public displayForm : boolean = false;
  public formError = '';

  constructor(
    private authService : AuthenticationService,
    private prodDataService : ProductDataService
  ) { }

  public products : Product[];

  public currentProduct : Product[];

  public newProduct : Product = {
    _id: '',
    name: '',
    description: '',
    retail: null,
    trade: null,
    selling: null,
    flagged: false,
    userId: '',
    category: ''
  };

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  private getUserName() : string {
    if(this.isLoggedIn())
    {
      const {name} = this.authService.getCurrentUser();
      return name ? name : 'Guest';
    }

    return 'Guest';

  }

  public formIsValid() : boolean {
    return true;
  }

  public getProducts(userName: string) : void {
    this.prodDataService.getProducts(userName)
      .then(response => this.products = response);
  }

  public getProduct(id: string) : void {
    this.prodDataService.getProduct(id)
        .then(resp => this.dbProduct = resp);
  }

  public onProductSubmit(productId : string){
    if(this.formIsValid()){
      this.newProduct.userId = this.getUserName();
      console.log('in here', this.newProduct);
      this.prodDataService.updateProduct(this.newProduct, productId)
       .then (dbProd =>  {
        console.log('product saved', dbProd);
        let products = this.products.slice(0);
        products.unshift(dbProd);
        this.products = products;
        this.resetAndHideProductForm();
        this.getProduct(productId);
       })
    } else {
      	this.formError = 'Missing fields required, give it another go!'
    }
  }

  public resetAndHideProductForm() : void {
    this.formError = '';
    this.displayForm = false;
    this.newProduct.name = '',
    this.newProduct.description = '';
    this.newProduct.retail = null;
    this.newProduct.trade = null;
    this.newProduct.selling = null;
    this.newProduct.flagged = false;
    this.getProducts(this.getUserName());
  }


  ngOnInit(): void {
    this.getProducts(this.getUserName());
  }

}
