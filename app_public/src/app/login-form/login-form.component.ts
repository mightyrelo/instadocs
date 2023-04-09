import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { HistoryService } from '../history.service';
import { User } from '../user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public formError = '';
  public credentials : User = {
    email: '',
    password: '',
    name: '',
    _id: '',
    createdOn: '',
    flagged: null
  };
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private history: HistoryService
  ) { }

  public onLoginSubmit() : void {
    if(!this.credentials.email || !this.credentials.password) {
      this.formError = 'email and password required';
      return;
    }
    this.authService.login(this.credentials)
      .then(() => this.router.navigateByUrl(this.history.getPreviousUrl()))
      .catch((message) => this.formError = message);
  }

  ngOnInit() {
  }

}
