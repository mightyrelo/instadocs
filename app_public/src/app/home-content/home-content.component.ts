import { Component, OnInit, Input } from '@angular/core';

import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  @Input() content: any;

  public users = {
    completedQuotes: 0,
    completedInvoices: 0,
    completedPOs: 0
  };

  constructor(
    private userDataService : UserDataService,
    private authService : AuthenticationService
  ) { }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  public getUserName() : string {
    if(this.isLoggedIn())
    {
      const {name} = this.authService.getCurrentUser();
      return name ? name : 'Guest';
    }

    return 'Guest';

  }

  ngOnInit() : void {
    this.userDataService.getUsers()
      .then(users => {
        
        for(let i = 0; i < users.length; i++)
        {
            this.users.completedQuotes += users[i].completedQuotes;
            this.users.completedInvoices += users[i].completedInvoices;
            this.users.completedPOs += users[i].completedPOs;
        }
      });
  }

}
