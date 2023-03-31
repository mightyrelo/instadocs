import { Component, OnInit } from '@angular/core';


import { Company } from '../company';

import { AuthenticationService } from '../authentication.service';
import { CompanyDataService } from '../company-data.service';

@Component({
  selector: 'app-view-companies-content',
  templateUrl: './view-companies-content.component.html',
  styleUrls: ['./view-companies-content.component.css']
})
export class ViewCompaniesContentComponent implements OnInit {

  //form processing
  public formError  = '';
  public displayForm : boolean = false;
  public formCompany : Company = {
    _id: '',
    name: '',
    tagline: '',
    address: '',
    contacts:[],
    email: '',
    website: '',
    accountName: '',
    bank: '',
    branch: null,
    accountNumber: null,
    flagged: false,
    userId: ''
  };

  public companies : Company[];

  constructor(
    private companyDataService: CompanyDataService,
    private authService: AuthenticationService

  ) { }

  formIsValid(){
    if(!this.formCompany.name || !this.formCompany.address || !this.formCompany.tagline || !this.formCompany.email || !this.formCompany.contacts
      || !this.formCompany.accountName || !this.formCompany.bank || !this.formCompany.accountNumber || !this.formCompany.branch) {
          return false;
      }
    return true;
  }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  private getUserName() : string {
    const {name} = this.authService.getCurrentUser();
    return name ? name : 'Guest'
  }

  onCompanySubmit(){
    if(this.formIsValid()){
      this.companyDataService.addCompany(this.formCompany)
       .then (dbCom =>  {
        console.log('company saved', dbCom);
        let comps = this.companies.slice(0);
        comps.unshift(dbCom);
        this.companies = comps;
        this.resetAndHideCompanyForm();
       })
    } else {
      	this.formError = 'Missing fields required, give it another go!'
    }
  }

  resetAndHideCompanyForm(){
    this.formError = '';
    this.displayForm = false;
    this.formCompany.name = '',
    this.formCompany.contacts = null;
    this.formCompany.address = '';
    this.formCompany.email = null;
    this.formCompany.tagline = '';
    this.formCompany.accountName = '';
    this.formCompany.accountNumber = null;
    this.formCompany.bank = '';
    this.formCompany.branch = null;
    this.formCompany.flagged = false;
    this.formCompany.userId = '';
    this.getCompanies();
  }

  //deleting quote
  flagged(companyId: string) {
    for(let i = 0; i < this.companies.length; i++){
      if(this.companies[i]._id == companyId){
        this.companies[i].flagged = true;
      }
    }
  }

  isFlagged(companyId: string) {
    for(let i = 0; i < this.companies.length; i++){
      if(this.companies[i]._id == companyId){
        if(this.companies[i].flagged){
          return true;
        } else return false;

      }
    }
  }

  setFlagOff(companyId: string) {
    for(let i = 0; i < this.companies.length; i++) {
      if(this.companies[i]._id === companyId) {
        this.companies[i].flagged = false;
      }
    }
  }

  deleteCustomer(companyId: string) {
    this.companyDataService.removeCompany(companyId)
      .then(response => {if(!response){console.log('deleted');this.getCompanies()}});
  }

  getCompanies() : void {
    this.companyDataService.readCompanies()
      .then(response => {this.companies = response;});
  }


  ngOnInit() : void {
    this.getCompanies();
  }

}
