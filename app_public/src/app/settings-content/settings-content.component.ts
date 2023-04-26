import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-settings-content',
  templateUrl: './settings-content.component.html',
  styleUrls: ['./settings-content.component.css']
})
export class SettingsContentComponent implements OnInit {

  public formError = '';
  public formSuccess = '';
  public formSuccess2 = '';

  public formError2 = '';
  public formSuccess3 = '';
  public formSuccess4 = '';

  public selectTemplate : boolean = false;


  public credentials : User = {
    email: '',
    password: '',
    name: '',
    _id: '',
    createdOn: '',
    flagged: null,
    completedQuotes: null,
    completedInvoices: null,
    completedPOs: null,
  };

  public credentials2 : User = {
    email: '',
    password: '',
    name: '',
    _id: '',
    createdOn: '',
    flagged: null,
    completedQuotes: null,
    completedInvoices: null,
    completedPOs: null,
  };

  public newCredentials : User = {
    email: '',
    password: '',
    name: '',
    _id: '',
    createdOn: '',
    flagged: null,
    completedQuotes: null,
    completedInvoices: null,
    completedPOs: null,
  };

  public newCredentials2 : User = {
    email: '',
    password: '',
    name: '',
    _id: '',
    createdOn: '',
    flagged: null,
    completedQuotes: null,
    completedInvoices: null,
    completedPOs: null,
  };

  public resetPassword : boolean = false;
  public passwordCorrect : boolean = false;
  public passwordCorrect2 : boolean = false;
  public closeForms : boolean = false;
  public closeForms2 : boolean = false;
  public changeEmail : boolean = false;

  constructor(
    private authService : AuthenticationService,
    private userDataService: UserDataService
  ) { }

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

  private getUserId() : void {
   this.userDataService.getUserByName(this.getUserName())
     .then(user => {
      this.newCredentials._id = user._id;
      this.newCredentials2._id = user._id;
    });
  }

  public onPassSubmit() : void {
    //attempt to login
    this.credentials.email = this.getUserEmail();
    this.authService.login(this.credentials)
      .then(() => {
        //provided password is valid
        this.passwordCorrect = true;
        this.formError = '';
        this.formSuccess2 = 'password correct';
      })
      .catch((message) => {
        this.formError = 'incorrect password'
        //invalid password
      });
    
  }

  public onPass2Submit() : void {
    //attempt to login
    this.credentials2.email = this.getUserEmail();
    this.authService.login(this.credentials2)
      .then(() => {
        //provided password is valid
        this.passwordCorrect2 = true;
        this.formError2 = '';
        this.formSuccess3 = 'password correct';
      })
      .catch((message) => {
        this.formError2 = 'incorrect password';
        //invalid password
      });
    
  }

  public onNewPassSubmit() : void {

    this.userDataService.updateUser(this.newCredentials)
      .then(() => {
        this.formSuccess = 'Password successfully reset!';
        this.closeAndResetForm();
      });

  };

  public onNewEmailSubmit() : void {

    this.userDataService.updateUser(this.newCredentials2)
      .then(() => {
        this.formSuccess4 = 'Email changed successfully!';
        this.closeAndResetForm2();
      });

  };

  public closeAndResetForm() : void {
    this.closeForms = true;

  }

  public closeAndResetForm2() : void {
    this.closeForms2 = true;

  }

  public useTemplate(tempId: string) : void {}


  private getUserEmail() : string {
    if(this.isLoggedIn())
    {
      const {email} = this.authService.getCurrentUser();
      return email ? email : 'Guest';
    }
    return 'Guest';
  }



  ngOnInit() : void{
    this.getUserId();
  }

}
