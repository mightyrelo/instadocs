import { Component, OnInit, Input } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-po-details',
  templateUrl: './po-details.component.html',
  styleUrls: ['./po-details.component.css']
})
export class PoDetailsComponent implements OnInit {

  @Input() content: any;
  @Input() user: any;
  @Input() user2: User;

  public expDate : any;

  constructor() { }

  ngOnInit() {
    this.expDate = new Date(this.content.createdOn);
      this.expDate.setDate(this.expDate.getDate() + 2);
  }

}
