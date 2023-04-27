import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { HistoryService } from '../history.service';

import { Company } from '../company';
import { User } from '../user';
import { UserDataService } from '../user-data.service';

import { CompanyDataService } from '../company-data.service';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @ViewChild('fileInput', {}) fileInput : ElementRef;

  public credentials : User = {
    name: '',
    email: '',
    password: '',
    _id: '',
    flagged: null,
    createdOn: '',
    completedQuotes: null,
    completedInvoices: null,
    completedPOs: null,
  };

  public formError = '';

  public userRegistered = false;

  //form processing
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
    userId: '',
    logo: null
  };

  public companies : Company[];

  public images;


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private historyService: HistoryService,
    private companyDataService: CompanyDataService,
    private http : HttpClient

  ) { }

  public onRegisterSubmit() : void {
    if(!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'all fields required, leka gape!';
      return;
    }
    this.authService.register(this.credentials)
      .then(() => {this.userRegistered = true;})
      .catch((message) => this.formError = message);
  }

  formIsValid(){
    if(!this.formCompany.name || !this.formCompany.address || !this.formCompany.tagline || !this.formCompany.email || !this.formCompany.contacts
      || !this.formCompany.accountName || !this.formCompany.bank || !this.formCompany.accountNumber || !this.formCompany.branch) {
          return false;
      }
    return true;
  }

  private getUserName() : string {
    return this.credentials.name;
  }

  onCompanySubmit(){
    if(this.formIsValid()){
      const imageBlob = this.fileInput.nativeElement.files[0];
      const file = new FormData();
      file.set('file', imageBlob);
      console.log('this is the file', imageBlob.name);
      this.formCompany.logo = imageBlob.name;
      console.log('source of upload logo');
      this.companyDataService.uploadLogo(file)
        .then(rsp => {
          this.formCompany.userId = this.getUserName();
          this.companyDataService.addCompany(this.formCompany)
           .then (dbCom =>  {
            console.log('company saved', dbCom); 
            let comps = this.companies.slice(0);
            comps.unshift(dbCom);
            this.companies = comps;
            this.resetAndHideCompanyForm();
            this.router.navigateByUrl(this.historyService.getPreviousUrl());
           })
        });
    } else {
      	this.formError = 'Missing fields required, give it another go!'
    }
  }

  selectImage(event) : void {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }



  resetAndHideCompanyForm(){
    this.formError = '';
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
    this.userRegistered = false;
    this.getCompanies();
  }

  getCompanies() : void {
    this.companyDataService.readCompanies()
      .then(response => {this.companies = response;});
  }


  ngOnInit() : void{
    this.getCompanies();
  }

}
