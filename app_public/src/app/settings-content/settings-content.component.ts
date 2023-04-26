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

  public resetPassword : boolean = false;
  public passwordCorrect : boolean = false;
  public closeForms : boolean = false;

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

  public onNewPassSubmit() : void {

    this.userDataService.updateUser(this.newCredentials)
      .then(() => {
        this.formSuccess = 'Password successfully reset!';
        this.closeAndResetForm();
      });

  };

  public closeAndResetForm() : void {
    this.closeForms = true;

  }


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
