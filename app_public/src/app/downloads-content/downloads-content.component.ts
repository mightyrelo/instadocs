import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { DbTransferService } from '../db-transfer.service';
import { Product } from '../product';

@Component({
  selector: 'app-downloads-content',
  templateUrl: './downloads-content.component.html',
  styleUrls: ['./downloads-content.component.css']
})
export class DownloadsContentComponent implements OnInit {
  public formError  = '';
  //public displayForm : boolean = true;

  public products : Product[];
  public formUser = {
    name: '',
    pricelist: ''
  }

  public counts = [];

  public itemAdded : boolean;

  public closedForm : boolean = false;

  public dataTransferred = '';

  public pricelists = ['cameras','intrusion','intercom','access_control','fence_prices','automation','gd_automation','adv_automation','power','cable','switches','tools','fire'];
  public pricelistsFull = ['surveillance','intruder detection','intercoms','access control','electric fencing','gate automation','garage-door automation','advanced automation','power supplies','cabling','switches','tools','fire equipment'];


  constructor(
    private authService: AuthenticationService,
    private dbTransferService: DbTransferService
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
    const idx = this.pricelistsFull.indexOf(this.formUser.pricelist);
    this.formUser.pricelist = this.pricelists[idx];
    this.dbTransferService.transferDB(this.formUser)
      .then(products => { 
        this.products = products;
        this.dataTransferred = `${this.products.length} products downloaded.`;
        
      });
     
  }

  ngOnInit() {
  }

}
