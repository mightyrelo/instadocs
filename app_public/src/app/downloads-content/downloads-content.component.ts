import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { DbTransferService } from '../db-transfer.service';
import { Product } from '../product';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-downloads-content',
  templateUrl: './downloads-content.component.html',
  styleUrls: ['./downloads-content.component.css']
})
export class DownloadsContentComponent implements OnInit {
  public formError  = '';
  //public displayForm : boolean = true;

  public products : Product[];
  public tempProducts : Product[];
  public userProducts : Product[];
  public formUser = {
    name: '',
    pricelist: ''
  }

  public counts = [];

  public itemAdded : boolean;

  public closedForm : boolean = false;

  public productsUpdated : number = 0;
  public productsCreated : number = 0;

  public dataTransferred = '';

  public pricelists = ['cameras','intrusion','intercom','access_control','fence_prices','automation','gd_automation','adv_automation','power','cable','switches','tools','fire'];
  public pricelistsFull = ['surveillance','intruder detection','intercoms','access control','electric fencing','gate automation','garage-door automation','advanced automation','power supplies','cabling','switches','tools','fire equipment'];


  constructor(
    private authService: AuthenticationService,
    private dbTransferService: DbTransferService,
    private productDataService: ProductDataService
  ) { }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  private getUserName() : string {
    if(this.isLoggedIn())
    {
      const {name} = this.authService.getCurrentUser();
     return name ? name : 'Guest'
    }
    return 'Guest';
  }

  public onPricelistSubmit() : void {
    this.formUser.name = this.getUserName();
    this.productsCreated = 0;
    this.productsUpdated = 0;
    const idx = this.pricelistsFull.indexOf(this.formUser.pricelist);
    this.formUser.pricelist = this.pricelists[idx];
    this.dbTransferService.transferDB(this.formUser)
      .then(products => { 
        this.tempProducts = products;
        this.updateProducts();
      });
     
  }

  private deleteTempProducts() : void {

    this.productDataService.getProductsByUserName('tempUser')
      .then(products => {
        this.tempProducts = products;
        for(let i = 0; i < this.tempProducts.length; i++){
          this.productDataService.deleteProduct(this.tempProducts[i]._id)
             .then(rsp => {
              console.log('del');
          });
        }
      });
  }

  private productExists(desc: string) : boolean {
   for(let i = 0; i < this.userProducts.length; i++){
    if(this.userProducts[i].description == desc){
      return true;
    }
   }
   return false;
  }

  private updateProducts() : void {
    for(let i = 0; i < this.tempProducts.length; i++){
        if(this.productExists(this.tempProducts[i].description)){
          this.updateProduct(this.tempProducts[i]);
          this.productsUpdated++;
        }
        else{
          this.productsCreated++;
          this.createProduct(this.tempProducts[i]);
        }
    }
   // 
    this.dataTransferred = `${this.productsCreated} products downloaded, ${this.productsUpdated} updated.`;
   
  }

  private updateProduct(tempProduct: Product) : void {
    for(let i = 0; i < this.userProducts.length; i++){
      if(this.userProducts[i].name == tempProduct.name){
        tempProduct.userId = this.getUserName();
        this.productDataService.updateProduct(tempProduct, this.userProducts[i]._id)
          .then(pr => {
          });
      }
    }
  }

  private createProduct(tempProduct: Product) : void {
   tempProduct.userId = this.getUserName();
   tempProduct.selling = tempProduct.retail; 
   this.productDataService.addProduct(tempProduct)
      .then(pr => {
         this.userProducts.push(pr);
      });
  }

  ngOnInit() : void{
    this.productDataService.getProductsByUserName(this.getUserName())
      .then(products => {
        this.userProducts = products;
        this.deleteTempProducts();
      });
  }

}
