import { Component, OnInit, Input } from '@angular/core';


import { User } from '../user';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-view-user-content',
  templateUrl: './view-user-content.component.html',
  styleUrls: ['./view-user-content.component.css']
})
export class ViewUserContentComponent implements OnInit {

  @Input() dbUser : User;

  public companyLogo : any;

  public displayForm : boolean = false;
  public formError = '';

  constructor(
    private authService : AuthenticationService,
    private userDataService : UserDataService
  ) { }

  public  users : User[];

  public currentUser : User[];

  public newUser : User = {
    _id: '',
    name: '',
    email: '',
    password: null,
    completedInvoices: null,
    completedQuotes: null,
    completedPOs: null,
    flagged: null,
    createdOn: ''
  };

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

  public formIsValid() : boolean {
    return true;
  }

  public getUsers(userName: string) : void {
    this.userDataService.getUsers()
      .then(response => this.users = response);
  }



  public onUserSubmit( userId : string){
    if(this.formIsValid()){
      console.log('in here', this.newUser);
      this.userDataService.updateUser(this.newUser)
       .then (dbUsr =>  {
        console.log('user saved', dbUsr);
        let users = this.users.slice(0);
        users.unshift(dbUsr);
        this.users = users;
        this.resetAndHideUserForm();
       })
    } else {
      	this.formError = 'Missing fields required, give it another go!'
    }
  }

  public resetAndHideUserForm() : void {
    this.formError = '';
    this.displayForm = false;
    this.newUser.name = '',
    this.newUser.password = '';
    this.newUser.email = null;
    this.newUser.completedInvoices = null;
    this.newUser.completedPOs = null;
    this.newUser.completedInvoices = null;
    this.newUser.flagged = false;
    this.getUsers(this.getUserName());
  }


  ngOnInit(): void {
    if(this.dbUser){
      console.log('not binding', this.dbUser.name);
    }
       //this.companyLogo = `/assets/images/${this.dbUser.name}.png`;
      console.log(this.companyLogo);
  
  }
}
