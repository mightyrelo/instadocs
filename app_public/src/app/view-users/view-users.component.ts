import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Users - ',
      strapline: 'Who Uses Ngamla?'

    },
    viewBar: {
      main: 'users are registered on Ngamla!',
      sub: ''
    }
  }

  constructor() { }


  ngOnInit() {
  }

}
