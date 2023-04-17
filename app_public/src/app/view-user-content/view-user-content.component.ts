import { Component, OnInit, Input } from '@angular/core';


import { User } from '../user';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';
import { DbTransferService } from '../db-transfer.service';
import { ProductDataService } from '../product-data.service';
import { Product } from '../product';

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

  public isFlagged : boolean = false;

  public userProducts : Product[];

  constructor(
    private authService : AuthenticationService,
    private userDataService : UserDataService,
    private dbTransferService: DbTransferService,
    private productDataService: ProductDataService
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

  public formError2 = '';
  public formUser = {
    name: '',
    pricelist: ''
  }
  public dataTransferred : boolean = false;

  public productsDeleted : boolean = false;

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
      this.newUser._id = userId;
      console.log('user', this.newUser);
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

  public onUserNameSubmit() : void {
    this.formUser.name = this.dbUser.name;
    this.dbTransferService.transferDB(this.formUser)
      .then(rsp => {
        console.log('transferred');
        
      });
      this.dataTransferred = true;
  }

  public flagForDeletion() : void {
    this.isFlagged = true;
  }

  public setOffFlag() : void {
    this.isFlagged = false;
  }

  public deleteUserProducts() : void {
    this.productDataService.getProductsByUserName(this.dbUser.name)
      .then(products => {
        this.userProducts = products;
        for(let i = 0; i < this.userProducts.length; i++){
          this.productDataService.deleteProduct(this.userProducts[i]._id)
             .then(rsp => {});
        }
        this.productsDeleted = true;
      });
    
  }


  ngOnInit(): void {
    this.userDataService.getUsers()
      .then(users => this.users = users);
    
  }
}
