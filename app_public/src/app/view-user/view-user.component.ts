import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators';

import { User } from '../user';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  public newUser : User;

  constructor(
    private userDataService : UserDataService,
    private route: ActivatedRoute
  ) { }

  public pageContent = {
    header: {
      title:'',
      strapline: ''
    },
    viewBar: {
      main: ``,
      sub: ``  
    }
  };

  ngOnInit() : void {
    this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) => {
       let id = params.get('userId');
       return this.userDataService.getUser(id);
      })
    )
    .subscribe((newUser: User) => {
     this.newUser = newUser;
     this.pageContent.header.title = this.newUser.name.toString();
     this.pageContent.viewBar.main = `${this.newUser.name} is on Ngamla because they are serious about succeeding at business.`
     this.pageContent.viewBar.sub = `Nugget: The aim is to help ${this.newUser.name} succeed at their chosen line of work`
    });
  }

}
