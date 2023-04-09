import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-view-users-content',
  templateUrl: './view-users-content.component.html',
  styleUrls: ['./view-users-content.component.css']
})
export class ViewUsersContentComponent implements OnInit {

  //variableName: variableType = variableValue
  public users: User[];




  constructor(
    private userDataService: UserDataService
  ) { }

  flagged(userId: string) {
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i]._id == userId){
        this.users[i].flagged = true;
      }
    }
  }

  isFlagged(userId: string) {
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i]._id == userId){
        if(this.users[i].flagged){
          return true;
        } else return false;

      }
    }
  }

  setFlagOff(prodId: string) {
    for(let i = 0; i < this.users.length; i++) {
      if(this.users[i]._id === prodId) {
        this.users[i].flagged = false;
      }
    }
  }

  deleteUser(userId: string) {
    this.userDataService.deleteUser(userId)
      .then(response => {if(!response){console.log('deleted');this.getUsers()}});
  }

  private getUsers() : void {
    this.userDataService
      .getUsers()
      .then(foundUsers => this.users = foundUsers);
  }


  ngOnInit() {
    this.getUsers();
  }

}
