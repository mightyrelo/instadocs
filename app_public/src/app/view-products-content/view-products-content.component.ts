import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductDataService } from '../product-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-view-products-content',
  templateUrl: './view-products-content.component.html',
  styleUrls: ['./view-products-content.component.css']
})
export class ViewProductsContentComponent implements OnInit {

 
  //variableName: variableType = variableValue
  public products: Product[];

  public displayForm = false;
  public formError = '';
  public formError2 = '';

  public categories = ['user','suv','aut','intr','pow','cab','tool','int','acc','fir','swt','efe', 'auto'];
  public categoriesFull = ['user','surveillance','automation','intrusion','power','cabling','tools','intercom','access control','fire','switches','electric fencing', 'automation advanced'];
  public formCat = {
    category: ''
  }; 

  public newProduct : Product = {
    _id: '',
    name: '',
    description: '',
    retail: null,
    trade: null,
    selling: null,
    flagged: false,
    userId: '',
    category: '',
    subCategory: ''
  };

  constructor(private productDataService: ProductDataService,
    private auth : AuthenticationService) { }

  private formIsValid(): boolean {
    if(this.newProduct.name && this.newProduct.description && this.newProduct.trade && this.newProduct.selling) {
      return true;
    } else {
      return false;
    }
  }

  public resetAndHideProductForm() : void {
    this.formError = '';
    this.newProduct.name = '';
    this.newProduct.description = '';
    this.newProduct.retail = null;
    this.newProduct.trade = null;
    this.newProduct.selling = null;
    this.displayForm = false;
    this.newProduct.category = '';
    this.getProducts();
  }

  //deleting quote
  flagged(prodId: string) {
    for(let i = 0; i < this.products.length; i++){
      if(this.products[i]._id == prodId){
        this.products[i].flagged = true;
      }
    }
  }

  isFlagged(prodId: string) {
    for(let i = 0; i < this.products.length; i++){
      if(this.products[i]._id == prodId){
        if(this.products[i].flagged){
          return true;
        } else return false;

      }
    }
  }

  setFlagOff(prodId: string) {
    for(let i = 0; i < this.products.length; i++) {
      if(this.products[i]._id === prodId) {
        this.products[i].flagged = false;
      }
    }
  }

  deleteProduct(prodId: string) {
    this.productDataService.deleteProduct(prodId)
      .then(response => {if(!response){console.log('deleted');this.getProducts()}});
  }


  private doAddProduct() : void {
    this.productDataService.addProduct(this.newProduct)
      .then((prod: Product) => {
        console.log('product saved', prod.category);
        this.resetAndHideProductForm();
      });
  }

  public onProductSubmit() : void {
    this.formError = '';
    this.newProduct.userId = this.getUserName();
    if(this.formIsValid()) {
      //get last item and set its summary
      this.doAddProduct();
    } else {
      this.formError = 'product details missing, please try again.';
    }
  }
  public onCategorySubmit() : void {
    //this.formError2 = '';
    const idx = this.categoriesFull.indexOf(this.formCat.category);
    this.productDataService.getCategoryProducts(this.getUserName(), this.categories[idx])
      .then(foundProducts => {this.products = foundProducts;});
    
  }

  private getProducts() : void {
    this.productDataService
      .getProducts(this.getUserName())
      .then(foundProducts => this.products = foundProducts)
  }

  public isLoggedIn() : boolean {
    return this.auth.isLoggedIn();
  }


  public getUserName() : string
  {
    if(this.isLoggedIn())
    {
      const {name} = this.auth.getCurrentUser();
      return name ? name : 'Guest'
    }
    return 'Guest';
  }

  ngOnInit() {
    //this.getProducts();
  }

}
