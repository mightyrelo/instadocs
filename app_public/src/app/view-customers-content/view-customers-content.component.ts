import { Component, OnInit } from '@angular/core';

import { Customer } from '../customer';
import { CustomerDataService } from '../customer-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-view-customers-content',
  templateUrl: './view-customers-content.component.html',
  styleUrls: ['./view-customers-content.component.css']
})
export class ViewCustomersContentComponent implements OnInit {

  //form processing
  public formError  = '';
  public displayForm : boolean = false;
  public formCustomer : Customer = {
    _id: '',
    name: '',
    address: '',
    rating: null,
    email: '',
    contact: null,
    gender: '',
    facilities: [],
    quotations: [],
    invoices: [],
    createdOn: '',
    flagged: false,
    userId: '',

  };

  public customers : Customer[];

  public counts = [];

  constructor(
    private customerDateService: CustomerDataService,
    private authService: AuthenticationService
  ) { }

  formIsValid(){
    if(!this.formCustomer.name || !this.formCustomer.address || !this.formCustomer.contact || !this.formCustomer.facilities){
      return false;
    }
    return true;
  }

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

  onCustomerSubmit(){
    if(this.formIsValid()){
      this.formCustomer.userId = this.getUserName();
      this.customerDateService.addCustomer(this.formCustomer)
       .then (dbCus =>  {
        console.log('customer saved', dbCus);
        let customers = this.customers.slice(0);
        customers.unshift(dbCus);
        this.customers = customers;
        this.resetAndHideCustomerForm();
       })
    } else {
      	this.formError = 'Missing fields required, give it another go!'
    }
  }

  public resetAndHideCustomerForm() : void {
    this.formError = '';
    this.displayForm = false;
    this.formCustomer.name = '',
    this.formCustomer.contact = null;
    this.formCustomer.address = '';
    this.formCustomer.rating = null;
    this.formCustomer.gender = '';
    this.formCustomer.facilities = [];
    this.formCustomer.quotations = [];
    this.formCustomer.invoices = [];
    this.formCustomer.email = '';
    this.formCustomer.flagged = false;
    this.getCustomers(this.getUserName());
  }

  //deleting quote
  public flagged(customerId: string) : boolean {
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i]._id == customerId){
        this.customers[i].flagged = true;
      }
    }
    return false;
  }

  public isFlagged(customerId: string) : boolean {
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i]._id == customerId){
        if(this.customers[i].flagged){
          return true;
        } else return false;

      }
    }
  }

  public setFlagOff(customerId: string) : void {
    for(let i = 0; i < this.customers.length; i++) {
      if(this.customers[i]._id === customerId) {
        this.customers[i].flagged = false;
      }
    }
  }

  public deleteCustomer(customerId: string) : void {
    this.customerDateService.deleteCustomer(customerId)
      .then(response => {if(!response){console.log('deleted');this.getCustomers(this.getUserName())}});
  }

  public getCustomers(userName: string) : void {
    this.customerDateService.getCustomers(userName)
      .then(response => this.customers = response);
  }

  ngOnInit() : void {
    this.getCustomers(this.getUserName());
    for(let i = 1; i <= 5;i++){
      this.counts[i] = i;
  }
  }

}
